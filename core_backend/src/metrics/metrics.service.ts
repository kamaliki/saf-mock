import { Injectable } from '@nestjs/common';
import { Counter, Histogram, collectDefaultMetrics, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly requestCounter: Counter<string>;
  private readonly requestDurationHistogram: Histogram<string>;

  constructor() {
    collectDefaultMetrics(); // Collect default metrics like CPU, memory usage, etc.

    // Create a counter for total number of requests
    this.requestCounter = new Counter({
      name: 'nestjs_app_requests_total',
      help: 'Total number of requests received by the app',
    });

    // Create a histogram for request duration
    this.requestDurationHistogram = new Histogram({
      name: 'nestjs_app_request_duration_seconds',
      help: 'Histogram of request durations',
      labelNames: ['method', 'route', 'status_code'], // Labels for method, route, and status code
      buckets: [0.1, 0.2, 0.5, 1, 2, 5, 10], // Custom duration buckets (in seconds)
    });
  }

  // Increment the total request counter
  incrementRequestCounter() {
    this.requestCounter.inc();
  }

  // Track request duration for histograms
  trackRequestDuration(method: string, route: string, statusCode: number, duration: number) {
    this.requestDurationHistogram.observe({ method, route, status_code: statusCode }, duration); // Track the duration for the request
  }

  // Expose the metrics for Prometheus to scrape
  async getMetrics() {
    return register.metrics();
  }
}
