import { fetchUser } from './user';
import { rateTeam } from './team';

const userId = '5';
const teamId = 'NOB';

const doSomething = async (): Promise<void> => {
  const user = await fetchUser(userId);

  // Can't use unchecked user payload here, you can't accidentally reach invalid state
  // console.log(`User is: ${user.payload}`); // Compile error!

  if (user.status === 'error') {
    switch (user.error.name) {
      case 'NotExistsError': {
        console.error('Reached NotExistsError. We know it must be a user error');
        // handle error
      }
      case 'InvalidUserIdError': {
        console.error('Reached InvalidUserIdError. But what is missing?');
        // handle error
      }
      // You can't do something that does not makes sense!
      // case 'AnythingElse': { ... }
    }
    
    // Just end program here, but we can handle in different ways to ensure we are moving forward only if user is safe
    return;
  }

  const team = await rateTeam(teamId);

  // Can't use unchecked team payload here, you can't accidentally reach invalid state
  // console.log(`Team is: ${team.payload}`);

  if (team.status === 'error') {
    switch (team.error.name) {
      case 'NotExistsError': {
        console.error('Reached NotExistsError. We know it must be a team error');
        // handle error
      }
      case 'BadTeamError': {
        console.error('Reached BadTeamError. But what is missing?');
        // handle error
      }
      // You can't do something that does not makes sense!
      // case 'AnythingElse': { ... }
    }

    // Just end program here, but we can handle in different ways to ensure we are moving forward only if team is safe
    return;
  }

  // We are safe here
  console.log(`User is: ${user.payload}`);
  console.log(`Team is: ${team.payload}`);
}

/**
 * By modeling errors as part of the domain, we give TS more information about
 * the possible states our program can encounter, and TS will help us back.
 * Some of the benefits I see by modeling errors this way are:
 * - No need to import anything, you can only compare errors against valid returns from the functions
 *   or get compile error. If working on any modern IDE, you also get autocomplete.
 * - No branching logic, the function executes from top to bottom.
 * - The two previous items means you don't need to track possible errors, TS will let you know them.
 * - You can't make use of unchecked results. TS makes evident if a function can reach an invalid/unsafe state.
 * 
 * This approach only woks for the code that's under our control, but if we wrap the usages of third party
 * libraries and/or potentially unsafe code (like fetch or DB calls) in functions of the form
 *   
 *   function safeFetch(args: Parameters<typeof fetch>) {
 *     try {
 *       const result = await fetch(...args);
 *        return { status: 'success', payload: result };
 *     } catch (err) {
 *        return { status: 'error', error: err }; // We can actually distinguish kinds of errors here
 *     }
 *   }
 * 
 * then, any code calling this wrapper will be performing safe calls and will never reach an exception.
 * Writing code in this style takes as much discipline as the exceptions tbf, but it pays off in the form
 * of type-system-hints (and probably reduced boilerplate).
 */