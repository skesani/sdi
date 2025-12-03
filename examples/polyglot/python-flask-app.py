# Flask app using SDI sidecar
from flask import Flask, request
import requests
import os

app = Flask(__name__)

# SDI sidecar URL (from environment or default to localhost)
SDI_URL = os.environ.get('SDI_URL', 'http://localhost:8080')

@app.before_request
def check_sdi():
    """Check every request with SDI sidecar"""
    if not os.environ.get('SDI_ENABLED', 'true') == 'true':
        return
    
    try:
        # Send request to SDI sidecar for analysis
        response = requests.post(
            f'{SDI_URL}/api/v1/analyze',
            json={
                'serviceId': 'python-flask-app',
                'path': request.path,
                'method': request.method,
                'headers': dict(request.headers),
                'body': request.get_data(as_text=True)
            },
            timeout=1  # Fast timeout to not slow down requests
        )
        
        result = response.json()
        
        if result.get('anomalyDetected'):
            severity = result.get('severity', 'unknown')
            print(f"⚠️  Anomaly detected! Severity: {severity}, Score: {result.get('anomalyScore')}")
            
            # Optionally block critical anomalies
            if severity == 'critical':
                return {'error': 'Request blocked by SDI'}, 403
    
    except Exception as e:
        # Fail open - don't block if SDI is unavailable
        print(f"SDI check failed: {e}")

@app.route('/health')
def health():
    return {'status': 'healthy', 'service': 'python-flask-app'}

@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    return {'user_id': user_id, 'name': f'User {user_id}'}

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'POST':
        return {'message': 'User created'}
    return {'users': ['alice', 'bob']}

@app.route('/api/data')
def data():
    return {'data': 'some data'}

if __name__ == '__main__':
    # Use port 5000 for consistency
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

