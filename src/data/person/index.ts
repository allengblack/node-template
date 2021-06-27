import { model, Schema } from 'mongoose';

export interface Person {
  name: string;
  address: string;
  age: number;
  email: string;
}

const PersonSchema = new Schema<Person>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true }
}, {
  versionKey: false,
  strict: false
});

export const PersonModel = model<Person>('Person', PersonSchema);
