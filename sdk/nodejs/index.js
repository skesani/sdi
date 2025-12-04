const axios = require('axios');

class AnalysisResult {
    constructor(data) {
        this.anomalyDetected = data.anomalyDetected || false;
        this.anomalyScore = data.anomalyScore || 0.0;
        this.severity = data.severity || 'none';
        this.serviceId = data.serviceId;
        this.timestamp = data.timestamp;
        this.pipelineTriggered = data.pipelineTriggered || false;
    }
}

class SdiClient {
    constructor(apiKey = null, baseUrl = null) {
        this.apiKey = apiKey || process.env.SDI_API_KEY || 'your-api-key';
        this.baseUrl = baseUrl || process.env.SDI_URL || 'http://localhost:8080';
        this.client = axios.create({
            baseURL: this.baseUrl,
            timeout: 5000,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json'
            }
        });
    }
    
    analyze(options) {
        return this.client.post('/api/sdi/analyze', {
            method: options.method,
            path: options.path,
            headers: options.headers || {},
            body: options.body || null,
            serviceId: options.serviceId || 'default-service'
        })
        .then(response => new AnalysisResult(response.data))
        .catch(error => {
            console.error('SDI analysis failed:', error.message);
            return new AnalysisResult({ anomalyDetected: false });
        });
    }
    
    detect(options) {
        return this.client.post('/api/sdi/detect', {
            method: options.method,
            path: options.path,
            body: options.body || null
        })
        .then(response => ({
            anomalyDetected: response.data.anomalyDetected || false,
            score: response.data.score || 0.0,
            severity: response.data.severity || 'none'
        }))
        .catch(() => ({ anomalyDetected: false, score: 0.0, severity: 'none' }));
    }
}

module.exports = { SdiClient, AnalysisResult };
