# demo-ts-error-handling

This repo is a quick demo for somethihng that was discussed recently in the Aselo engineering team at Tech Matters.

The idea is to show why modeling the errors as part of the domain, rather than throwing exceptions makes sense and takes advantage of the TS typesystem.

This repo contains 3 branches:
- `exceptions-1`: here I do a dirty usage of try/catch blocks in functions that may throw exceptions, just to show how the complexity grows for callers of potentially-failling code.
- `exceptions-2`: Same as the previous branch, but in what may be considered a better error handling, making usage of the context of the exceptions (catching them separately and not in just one big catch).
- `errors-as-domain`: The same logic as above is expressed in a different way. The potentially-failling code returns "error objects" instead than throwing exceptions. This allows the callers to benefit from the signatures of the functions, reducing complexity, bolierplate and the need for "tracking error instances".

The idea is for you to navigate the branches, specially `src/index.ts` file. At the bottom of this file I'm leaving some comments-opinions (emphasize opinion here).

None of the three branches aims to do the smartest error handling. I'm sure there are better ways to handle the exceptions, but exceptions are "branches in the execution flow", and there's no way around that. We can add one try/catch block per potential error being arise, and that does not removes the need to keep track of the error instances, neither does that helps signaling which parts of the code might throw an exception. Yes, we can use the @throws JSDoc annotations, but that's documentation and still does not benefit from the compiler. In contrast, error objects must be checked and we'll only be able to use them once we let the compiler know that it is safe to do so.

I tried to stay away from any kind of fancy or functional approach to this idea, and just showing the difference between `throw`ing errors vs `return`ing objects with the same semantic meaning.

For the third branch, you might say that it still requires some degree of boilerplate, and that's true, but the benefits from this boilerplate code are still worth. We could also do some more fancy type-level-coding to help reducing this boilerplate:

```
type SafePayload<TPayload, TError> = {
  status: 'success';
  payload: TPayload;
} | {
  status: 'error';
  error: TError;
}
```
and then 
```
type UserError = NotExistsError | InvalidUserIdError;
type UserPayload = SafePayload<User, UserError>
```
