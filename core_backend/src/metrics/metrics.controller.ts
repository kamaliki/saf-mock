import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Request, Response, NextFunction } from 'express';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics() {
    return this.metricsService.getMetrics();
  }

  @Get('collect')
  async collectMetrics(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    const start = Date.now(); // Record start time

    // Proceed with the request
    res.on('finish', () => {
      const duration = (Date.now() - start) / 1000; // Calculate request duration in seconds
      this.metricsService.trackRequestDuration(
        req.method, 
        req.originalUrl, 
        res.statusCode, 
        duration
      );
    });

    next(); // Continue to next middleware/controller
  }
}
