const client = require('prom-client');

const counterMet = new client.Counter({
    name: 'http_request_count',
    help: 'http request and error counts',
    labelNames: ["status", "route"],
});

const requestTimeMet = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ["status", "route"],
    // buckets for response time from 0.1ms to 500ms
    buckets: [0.01, 0.02, 0.03, 0.04, 0.05, 10, 100, 500]
})

// const gaugeMet = new client.Gauge({
//     name: "metric_gauge",
//     help: 'metric_help',
//     labelNames: ['route'],
// })

module.exports = { counterMet, requestTimeMet }
// module.exports = {counterMet, requestTimeMet, gaugeMet}