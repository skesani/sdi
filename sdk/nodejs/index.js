"""
SDI Node.js SDK - Language-agnostic client for Synthetic Digital Immunity

Install: npm install sdi-nodejs-sdk

Usage:
    const { SDIClient } = require('sdi-nodejs-sdk');
    
    const sdi = new SDIClient('http://localhost:8080');
    const result = await sdi.analyzeRequest({
        serviceId: 'my-service',
        path: '/api/endpoint',
        method: 'POST',
        body: requestData
    });
    
    if (result.anomalyDetected) {
        console.log(`Anomaly detected! Score: ${result.anomalyScore}`);
    }
"""

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

class SDIClient {
    /**
     * SDI Client for Node.js applications
     * 
     * @example
     * // Basic usage
     * const sdi = new SDIClient('http://localhost:8080');
     * const result = await sdi.analyzeRequest({
     *     serviceId: 'my-service',
     *     path: '/api/users',
     *     method: 'POST',
     *     body: JSON.stringify({ user: 'data' })
     * });
     * 
     * @example
     * // With Express
     * const sdiMiddleware = async (req, res, next) => {
     *     const result = await sdi.analyzeRequest({
     *         serviceId: 'express-app',
     *         path: req.path,
     *         method: req.method,
     *         headers: req.headers,
     *         body: JSON.stringify(req.body)
     *     });
     *     
     *     if (result.anomalyDetected && result.severity === 'critical') {
     *         return res.status(403).json({ error: 'Request blocked' });
     *     }
     *     next();
     * };
     * app.use(sdiMiddleware);
     */
    
    constructor(baseUrl = null, timeout = 5000) {
        this.baseUrl = baseUrl || process.env.SDI_URL || 'http://localhost:8080';
        this.timeout = timeout;
        this.apiVersion = 'v1';
        this.client = axios.create({
            baseURL: this.baseUrl,
            timeout: this.timeout
        });
    }
    
    /**
     * Analyze a request for anomalies
     * 
     * @param {Object} options - Analysis options
     * @param {string} options.serviceId - Your service identifier
     * @param {string} options.path - Request path
     * @param {string} options.method - HTTP method
     * @param {Object} [options.headers] - Request headers
     * @param {string} [options.body] - Request body
     * @param {Object} [options.metadata] - Additional metadata
     * @returns {Promise<AnalysisResult>}
     */
    async analyzeRequest({
        serviceId,
        path,
        method,
        headers = {},
        body = '',
        metadata = {}
    }) {
        try {
            const response = await this.client.post(`/api/${this.apiVersion}/analyze`, {
                serviceId,
                path,
                method,
                headers,
                body,
                metadata
            });
            
            return new AnalysisResult(response.data);
        } catch (error) {
            // Fail open - don't block requests if SDI is down
            console.error('SDI analysis failed:', error.message);
            return new AnalysisResult({ anomalyDetected: false });
        }
    }
    
    /**
     * Quick anomaly detection (lightweight)
     * 
     * @param {Object} options - Detection options
     * @returns {Promise<boolean>} True if anomaly detected
     */
    async detectAnomaly({ serviceId, path, method, body = '' }) {
        try {
            const response = await this.client.post(`/api/${this.apiVersion}/detect`, {
                serviceId,
                path,
                method,
                body
            });
            
            return response.data.anomalyDetected || false;
        } catch (error) {
            console.error('SDI detection failed:', error.message);
            return false;
        }
    }
    
    /**
     * Check if SDI service is healthy
     * 
     * @returns {Promise<boolean>}
     */
    async healthCheck() {
        try {
            const response = await this.client.get(`/api/${this.apiVersion}/health`);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}

/**
 * Express middleware for SDI
 * 
 * @example
 * const { createExpressMiddleware } = require('sdi-nodejs-sdk');
 * 
 * app.use(createExpressMiddleware({
 *     serviceId: 'my-express-app',
 *     sdiUrl: 'http://localhost:8080',
 *     blockOnCritical: true
 * }));
 */
function createExpressMiddleware({
    serviceId,
    sdiUrl = null,
    blockOnCritical = false
}) {
    const client = new SDIClient(sdiUrl);
    
    return async (req, res, next) => {
        try {
            const result = await client.analyzeRequest({
                serviceId,
                path: req.path,
                method: req.method,
                headers: req.headers,
                body: JSON.stringify(req.body)
            });
            
            // Attach result to request for logging
            req.sdiResult = result;
            
            // Optionally block critical anomalies
            if (blockOnCritical && result.anomalyDetected && result.severity === 'critical') {
                return res.status(403).json({
                    error: 'Request blocked by SDI',
                    anomalyScore: result.anomalyScore
                });
            }
            
            next();
        } catch (error) {
            // Fail open
            console.error('SDI middleware error:', error);
            next();
        }
    };
}

/**
 * Fastify plugin for SDI
 * 
 * @example
 * const { fastifySDI } = require('sdi-nodejs-sdk');
 * 
 * fastify.register(fastifySDI, {
 *     serviceId: 'my-fastify-app',
 *     sdiUrl: 'http://localhost:8080'
 * });
 */
async function fastifySDI(fastify, options) {
    const client = new SDIClient(options.sdiUrl);
    const serviceId = options.serviceId || 'fastify-app';
    
    fastify.addHook('onRequest', async (request, reply) => {
        const result = await client.analyzeRequest({
            serviceId,
            path: request.url,
            method: request.method,
            headers: request.headers,
            body: JSON.stringify(request.body)
        });
        
        request.sdiResult = result;
        
        if (options.blockOnCritical && result.anomalyDetected && result.severity === 'critical') {
            reply.code(403).send({ error: 'Request blocked by SDI' });
        }
    });
}

module.exports = {
    SDIClient,
    AnalysisResult,
    createExpressMiddleware,
    fastifySDI
};

