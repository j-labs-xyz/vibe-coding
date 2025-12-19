import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private publisher: Redis;
    private subscriber: Redis;
    private readonly logger = new Logger(RedisService.name);

    onModuleInit() {
        // Separate clients for pub and sub
        const host = process.env.REDIS_HOST || 'localhost';
        const port = parseInt(process.env.REDIS_PORT || '6379', 10);

        this.publisher = new Redis({
            host,
            port,
        });

        this.subscriber = new Redis({
            host,
            port,
        });

        this.subscriber.on('message', (channel, message) => {
            this.handleMessage(channel, message);
        });
    }

    onModuleDestroy() {
        this.publisher.disconnect();
        this.subscriber.disconnect();
    }

    // Key-Value Ops
    async get(key: string) {
        return this.publisher.get(key);
    }

    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
            return this.publisher.set(key, value, 'EX', ttl);
        }
        return this.publisher.set(key, value);
    }

    // Pub/Sub Ops
    async publish(channel: string, message: any) {
        const payload = JSON.stringify(message);
        this.logger.log(`Publishing to [${channel}]: ${payload}`);
        return this.publisher.publish(channel, payload);
    }

    async subscribe(channel: string, callback: (message: any) => void) {
        this.logger.log(`Subscribing to [${channel}]`);
        // Simple callback storage usage would be complex here, 
        // normally we'd use an event emitter. For simplicity, we just sub.
        await this.subscriber.subscribe(channel);
        // We need a way to route messages to callbacks. 
        // This is a naive implementation; strictly for the "event bus" requirement.
        this.messageHandlers.set(channel, callback);
    }

    private messageHandlers = new Map<string, (msg: any) => void>();

    private handleMessage(channel: string, message: string) {
        const handler = this.messageHandlers.get(channel);
        if (handler) {
            try {
                handler(JSON.parse(message));
            } catch (e) {
                this.logger.error(`Error parsing message on ${channel}`, e);
            }
        }
    }
}
