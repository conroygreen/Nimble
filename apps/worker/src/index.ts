import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');

// Queues
const preflightQueue = new Queue('preflight', { connection });
const thumbQueue = new Queue('thumbnail', { connection });
const emailQueue = new Queue('email', { connection });

// QueueSchedulers removed (BullMQ v5 auto-manages scheduling in most cases)

// Workers
new Worker('preflight', async job => {
  // TODO: implement PDF/image inspection
  return { status: 'OK', jobId: job.id };
}, { connection });

new Worker('thumbnail', async job => {
  // TODO: generate thumbnail from artwork
  return { thumb: 's3://key/to/thumb', jobId: job.id };
}, { connection });

new Worker('email', async job => {
  // TODO: send email
  return { sent: true, jobId: job.id };
}, { connection });

async function demo() {
  if (process.env.NODE_ENV === 'development') {
    await preflightQueue.add('check-art', { artworkId: 'demo-art' });
    await thumbQueue.add('make-thumb', { artworkId: 'demo-art' });
    await emailQueue.add('order-update', { orderId: 'demo-order' });
  }
}

demo().catch(err => console.error('Worker init error', err));

console.log('Worker service started');
