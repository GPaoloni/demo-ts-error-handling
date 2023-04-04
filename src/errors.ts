export type NotExistsError = {
    name: 'NotExistsError';
    cause: Error,
}

export const notExistsError = (description: string): NotExistsError => ({
  name: 'NotExistsError',
  cause: new Error(description),
})
