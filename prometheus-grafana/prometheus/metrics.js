const client = require('prom-client');

const counter = new client.Counter({
    name: 'metric_name',
    help: 'metric_help',
    labelNames: ["code", "endpoint"],
});

const requestTime = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['route'],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
})

let gau = new client.Gauge({
    name: "metric_gauge",
    help: 'metric_help',
    labelNames: ['route'],
})

