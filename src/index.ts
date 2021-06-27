import dotenv from 'dotenv';
import { app } from "./app";
import DB from './db';

dotenv.config();

const port = process.env.PORT;

const start = async () => {
  try {
    await DB.connect();
    app.listen(port);
    console.log(`app running on ${port}`);
  } catch (err) {
    console.error({ err });
    await DB.disconnect();
  }
}

start();