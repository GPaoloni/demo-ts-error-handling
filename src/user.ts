import { NotExistsError } from "./errors";

type User = {
  id: string;
  name: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Bob",
  },
  {
    id: "2",
    name: "Patrick",
  },
  {
    id: "3",
    name: "Sandy",
  }
]

export class InvalidUserIdError extends Error {
  cause: Error;

  constructor(id: string) {
    super(id);
    this.cause = new Error(`Invalid id provided ${id}`);
    this.name = 'InvalidUserIdError';
    Object.setPrototypeOf(this, InvalidUserIdError.prototype);
  }
}

export const fetchUser = async (id: string): Promise<User> => {
  if (!id) {
    throw new InvalidUserIdError(id);
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    throw new NotExistsError(new Error(`User with id ${id} does not exists`));
  }

  return user;
}