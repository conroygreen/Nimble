import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', {
  maxRetriesPerRequest: null,
});

export const preflightQueue = new Queue('preflight', { connection });

// Simple worker that simulates preflight checks
new Worker(
  'preflight',
  async (job) => {
    const { fileKey, contentType } = job.data as { fileKey: string; contentType: string };
    // pretend to check mime and dimensions
    await new Promise((res) => setTimeout(res, 250));
    return { ok: true, fileKey, contentType };
  },
  { connection },
);

console.log('Worker started. Listening for preflight jobs...');
