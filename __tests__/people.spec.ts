import faker from "faker";
import Status from "http-status-codes";
import supertest, { SuperTest, Test } from "supertest";
import { PersonModel } from '../src/data/person';
import DB from "../src/db";
import { app } from "../src/app";

let request: SuperTest<Test>;

beforeAll(async () => {
  return DB.connect().then(() => {
    return new Promise((resolve, reject) => {
      request = supertest(app.listen(resolve));
    });
  });
});

afterAll(async () => {
  await DB.disconnect();
  await new Promise(resolve => setTimeout(resolve, 1000));
});

afterEach(async () => {
  await PersonModel.deleteMany({});
});

describe("People", () => {
  it("should create a Person", async () => {
    const person = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.datatype.number(100)
    };

    await request.post("/people")
      .send(person)
      .expect(Status.CREATED);

    expect(await PersonModel.find({})).toHaveLength(1);
  });

  it("should get people", async () => {
    await PersonModel.create({
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.datatype.number(100)
    })
    const res = await request.get("/people").expect(Status.OK);
    expect(res.body).toHaveLength(1);
  });
})