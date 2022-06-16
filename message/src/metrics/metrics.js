const client = require('prom-client');

const counterMet = new client.Counter({
    name: 'metric_name',
    help: 'metric_help',
    labelNames: ["status", "endpoint"],
});

// const requestTimeMet = new client.Histogram({
//     name: 'http_request_duration_ms',
//     help: 'Duration of HTTP requests in ms',
//     labelNames: ['route'],
//     // buckets for response time from 0.1ms to 500ms
//     buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
// })

// const gaugeMet = new client.Gauge({
//     name: "metric_gauge",
//     help: 'metric_help',
//     labelNames: ['route'],
// })

module.exports = { counterMet}
// module.exports = {counterMet, requestTimeMet, gaugeMet}