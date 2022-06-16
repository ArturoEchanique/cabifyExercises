const client = require('prom-client');

const counterMet = new client.Counter({
    name: 'http_request_count',
    help: 'http request and error counts',
    labelNames: ["status", "route"],
});

const queueCounterMet = new client.Counter({
    name: 'Enqueueing_messages',
    help: 'Enqueueing messages succes-error counts',
    labelNames: ["result", "queue"],
});

const requestTimeMet = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ["status", "route"],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.01, 0.02, 0.03, 0.04, 0.05, 10, 100, 500]
})

module.exports = { counterMet, queueCounterMet, requestTimeMet }