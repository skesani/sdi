# SDI Node.js SDK

Synthetic Digital Immunity SDK for Node.js - AI-powered cybersecurity for microservices.

## Installation

```bash
npm install sdi-nodejs
```

## Quick Start

```javascript
const { SdiClient } = require('sdi-nodejs');

const client = new SdiClient(process.env.SDI_API_KEY);

const analysis = client.analyze({
  method: 'GET',
  path: '/api/users/123',
  headers: {},
  serviceId: 'my-service'
});

if (analysis.anomalyDetected) {
  console.log('Anomaly detected:', analysis.anomalyScore);
}
```

## Documentation

Full documentation: https://github.com/skesani/sdi

## License

Apache-2.0

