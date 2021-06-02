import { PersonModel } from "./data/person";
import express, { Request, Response } from "express";
import Status from 'http-status-codes';
import morgan from "morgan";

export const app = express()
  .use(morgan("tiny"))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .get("/", (req, res) => {
    res.status(Status.OK).send("API Okay!");
  })
  .get("/people", async (req: Request, res: Response) => {
    const people = await PersonModel.find({});
    res.status(Status.OK).send(people)
  })
  .post("/people", async (req: Request, res: Response) => {
    try {
      const { body } = req;
      await PersonModel.create(body);
      res.status(Status.CREATED).send("created successfully")
    } catch (err) {
      if (err.code == 11000 && err.name === 'MongoError') {
        res.status(Status.CONFLICT).send("A person with this email already esists")
      } else {
        console.error(err)
        throw err;
      }
    }
  })
  .use((_req, res, _next) => {
    res.status(404).send("route does not exist.");
  });