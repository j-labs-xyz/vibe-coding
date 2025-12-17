import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private client: Redis;

    onModuleInit() {
        this.client = new Redis({
            host: 'localhost', // Or process.env.REDIS_HOST
            port: 6379,        // Or process.env.REDIS_PORT
        });
    }

    onModuleDestroy() {
        this.client.disconnect();
    }

    get(key: string) {
        return this.client.get(key);
    }

    set(key: string, value: string) {
        return this.client.set(key, value);
    }
}
