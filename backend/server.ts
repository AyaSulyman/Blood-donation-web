// src/server.ts
import { buildApp } from './app';
import { connectDB } from './plugins/db';

async function start() {
  try {
    await connectDB();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }

  const app = buildApp();

  try {
    await app.listen({ port: 3000 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();