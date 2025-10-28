import { Injectable, Logger } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name)
  private redis: Redis

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    })

    this.redis.on('connect', () => {
      this.logger.log('Connected to Redis')
    })

    this.redis.on('error', (error) => {
      this.logger.error('Redis connection error:', error)
    })
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.redis.setex(key, ttlSeconds, value)
    } else {
      await this.redis.set(key, value)
    }
  }

  async get(key: string): Promise<string | null> {
    return await this.redis.get(key)
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.redis.exists(key)
    return result === 1
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key)
  }

  async expire(key: string, ttlSeconds: number): Promise<void> {
    await this.redis.expire(key, ttlSeconds)
  }

  async disconnect(): Promise<void> {
    await this.redis.disconnect()
  }
}
