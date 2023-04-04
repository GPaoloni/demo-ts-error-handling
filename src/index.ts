import * as userModule from './user';
import * as teamModule from './team';
import * as errorsModule from './errors';

const userId = '5';
const teamId = 'NOB';

const doSomething = async (): Promise<void> => {
  let user;
  try {
    user = await userModule.fetchUser(userId);
   } catch(err) {
    if (err instanceof errorsModule.NotExistsError) {
      console.error('Reached NotExistsError. We know it must be a user error');
      // handle error
    }

    if (err instanceof userModule.InvalidUserIdError) {
      console.error('Reached InvalidUserIdError. But what is missing?');
      // handle error
    }
  }

  let team;
  try {
    team = await teamModule.rateTeam(teamId);
  } catch (err) {
    if (err instanceof errorsModule.NotExistsError) {
      console.error('Reached NotExistsError. We know it must be a team error');
      // handle error
    }

    if (err instanceof teamModule.BadTeamError) {
      console.error('Reached BadTeamError. But what is missing?');
      // handle error
    }
  }

  // We are safe here
  console.log(`User is: ${user}`);
  console.log(`Team is: ${team}`);
}

/**
 * By handling the exceptions in this way we can use the contextual information without the need
 * for a specialized instanciation of every error that might be repeated, like NotExistsError.
 * It's still a lot of boilerplate IMO, and we still need to import every all the errors we might care about
 * to check if "err instanceof". In this example this is doable, but the more instances we care about
 * the more we need to track what errors each function might throw.
 * On top of that, you don't even know if a function throws or not!
 * 
 * Next example will introduce a nested propagation of errors.
 */