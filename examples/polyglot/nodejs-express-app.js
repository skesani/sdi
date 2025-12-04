// Node.js Express app using SDI sidecar
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

// SDI sidecar URL
const SDI_URL = process.env.SDI_URL || 'http://localhost:8080';
const SDI_ENABLED = process.env.SDI_ENABLED !== 'false';

// SDI middleware
app.use(async (req, res, next) => {
    if (!SDI_ENABLED) {
        return next();
    }
    
    try {
        // Send request to SDI sidecar for analysis
        const response = await axios.post(
            `${SDI_URL}/api/v1/analyze`,
            {
                serviceId: 'nodejs-express-app',
                path: req.path,
                method: req.method,
                headers: req.headers,
                body: JSON.stringify(req.body)
            },
            { timeout: 1000 } // 1 second timeout
        );
        
        const result = response.data;
        
        if (result.anomalyDetected) {
            console.warn(`⚠️  Anomaly detected! Severity: ${result.severity}, Score: ${result.anomalyScore}`);
            
            // Optionally block critical anomalies
            if (result.severity === 'critical') {
                return res.status(403).json({ error: 'Request blocked by SDI' });
            }
        }
    } catch (error) {
        // Fail open - don't block if SDI is unavailable
        console.error(`SDI check failed: ${error.message}`);
    }
    
    next();
});

// Your routes
app.get('/api/users', (req, res) => {
    res.json({ users: ['alice', 'bob'] });
});

app.post('/api/users', (req, res) => {
    res.json({ message: 'User created' });
});

app.get('/api/data', (req, res) => {
    res.json({ data: 'some data' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`SDI sidecar: ${SDI_URL}`);
});

