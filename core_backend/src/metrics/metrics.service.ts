import { Injectable } from '@nestjs/common';
import { Counter, collectDefaultMetrics, register } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly requestCounter: Counter<string>;

  constructor() {
    collectDefaultMetrics(); // Collect default metrics (CPU, memory, etc.)

    // Create a custom counter for your app
    this.requestCounter = new Counter({
      name: 'nestjs_app_requests_total',
      help: 'Total number of requests received by the app',
    });
  }

  incrementRequestCounter() {
    this.requestCounter.inc(); // Increment counter on each request
  }

  async getMetrics() {
    return register.metrics();
  }
}
