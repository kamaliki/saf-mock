import { CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    return {
      store: redisStore,
      host: configService.get('REDIS_HOST'),
      port: parseInt(configService.get<string>('REDIS_PORT')!, 10),
      password: configService.get('REDIS_PASSWORD'),
      ttl: 600, // time-to-live in seconds 
    };
  },
  inject: [ConfigService],
};