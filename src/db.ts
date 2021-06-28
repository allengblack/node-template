import dotenv from "dotenv";
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection } from 'mongoose';

dotenv.config();

export class DB {
  connection: Connection;
  private mongod: MongoMemoryServer;

  async connect() {
    const testEnvironment = 'test' === process.env.NODE_ENV
    if (testEnvironment) {
      this.mongod = new MongoMemoryServer();
      process.env.MONGO_URL = await this.mongod.getUri();
    }

    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log("🛢 Database connected successfully.");
  }

  async disconnect() {
    for (const conn of mongoose.connections) {
      await conn.close();
    }

    if (this.mongod) {
      await this.mongod.stop();
    }
    console.log("🔌 DB disconnected.")
  }
}

export default new DB();