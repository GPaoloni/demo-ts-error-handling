import * as userModule from './user';
import * as teamModule from './team';
import * as errorsModule from './errors';

const userId = '5';
const teamId = 'NOB';

const doSomething = async (): Promise<void> => {
  try {
    const user = await userModule.fetchUser(userId);
    const team = await teamModule.rateTeam(teamId);

    console.log(`User is: ${user}`);
    console.log(`Team is: ${team}`);
  } catch (err) {
    if (err instanceof errorsModule.NotExistsError) {
      console.error('Reached NotExistsError. But what is missing?');
      // handle error

      /** Above does not contains the information on what's the entity that is missing.
       *  The way to sort this is by adding one more instance of NotExistsError and then check the possible branches
       * 
       *  if (err instanceof UserNotExistsError) { ... }
       *  if (err instanceof TeamNotExistsError) { ... }
       */
    }

    if (err instanceof userModule.InvalidUserIdError) {
      console.error('Reached InvalidUserIdError. But what is missing?');
      // handle error
    }

    if (err instanceof teamModule.BadTeamError) {
      console.error('Reached BadTeamError. But what is missing?');
      // handle error
    }
  }
}

/**
 * In my opinion, this approach loses valuable information when something goes wrong, 
 * unless we dedicate more of boilerplate code around instanciating the possible errors.
 * And then, even if we do, we need to import the all the possible errors that we care about and handle them.
 * It's also a disrupting flow to think about, as it's branching the logic of the program.
 */