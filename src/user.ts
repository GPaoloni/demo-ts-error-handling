import { notExistsError, NotExistsError } from "./errors";

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

type InvalidUserIdError = {
  name: 'InvalidUserIdError';
  cause: Error;
}

const invalidUserIdError = (id: string): InvalidUserIdError => ({
  name: 'InvalidUserIdError',
  cause: new Error(`Invalid id provided ${id}`),
})

type UserPayload = {
  status: 'success';
  payload: User;
} | {
  status: 'error';
  error: NotExistsError | InvalidUserIdError;
}

export const fetchUser = async (id: string): Promise<UserPayload> => {
  if (!id) {
    return {
      status: 'error',
      error: invalidUserIdError(id),
    };
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    return {
      status: 'error',
      error: notExistsError(`User with id ${id}`),
    };
  }

  return {
    status: 'success',
    payload: user,
  };
}