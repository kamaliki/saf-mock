import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    const start = Date.now();
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000; // duration in seconds
      this.metricsService.trackRequestDuration(
        req.method,
        req.originalUrl,
        res.statusCode,
        duration
      );
    });
    next();
  }
}
