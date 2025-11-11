import { Worker, Queue } from 'bullmq';
import Redis from 'ioredis';
import { logger } from '@nimble/utils';
import { preflightWorker } from './workers/preflight';
import { thumbnailWorker } from './workers/thumbnail';
import { emailWorker } from './workers/email';

const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  maxRetriesPerRequest: null,
});

// Preflight Worker
const preflightQueue = new Worker('preflight', preflightWorker, {
  connection,
  concurrency: 5,
});

preflightQueue.on('completed', (job) => {
  logger.info(`Preflight job ${job.id} completed`);
});

preflightQueue.on('failed', (job, err) => {
  logger.error(`Preflight job ${job?.id} failed: ${err.message}`);
});

// Thumbnail Worker
const thumbnailQueue = new Worker('thumbnail', thumbnailWorker, {
  connection,
  concurrency: 10,
});

thumbnailQueue.on('completed', (job) => {
  logger.info(`Thumbnail job ${job.id} completed`);
});

thumbnailQueue.on('failed', (job, err) => {
  logger.error(`Thumbnail job ${job?.id} failed: ${err.message}`);
});

// Email Worker
const emailQueue = new Worker('email', emailWorker, {
  connection,
  concurrency: 10,
});

emailQueue.on('completed', (job) => {
  logger.info(`Email job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
  logger.error(`Email job ${job?.id} failed: ${err.message}`);
});

logger.info('🚀 Worker service started');
logger.info('Listening for preflight, thumbnail, and email jobs');

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down workers...');
  await preflightQueue.close();
  await thumbnailQueue.close();
  await emailQueue.close();
  await connection.quit();
  process.exit(0);
});
