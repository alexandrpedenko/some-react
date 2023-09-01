import { User } from "../user";

export interface CreatePostInput {
  author: string;
  title: string;
  description: string;
}

export interface UpdatePostInput extends Partial<CreatePostInput> {}


export interface Post {
  _id: string;
  author: string | Partial<User>;
  title: string;
  description: string;
  createdDate?: Date;
  editedDate?: Date;
}
