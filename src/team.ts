import { notExistsError, NotExistsError } from "./errors";

type Team = {
  id: string;
  score: number;
}

const teams: Team[] = [
  {
    id: 'CARC',
    score: 10, 
  },
  {
    id: 'NOB',
    score: 1, 
  }
];

type BadTeamError = {
  name: 'BadTeamError';
  cause: Error;
}

const badTeamError = (id: string): BadTeamError => ({
  name: 'BadTeamError',
  cause: new Error(`No that team :( ${id}`),
})

type TeamPayload = {
  status: 'success';
  payload: Team;
} | {
  status: 'error';
  error: NotExistsError | BadTeamError;
}

export const rateTeam = async (id: string): Promise<TeamPayload> => {
  const team = teams.find(t => t.id === id);
  if (!team) {
    return {
      status: 'error',
      error: notExistsError(`Team with id ${id}`),
    };
  }

  if (team.score < 3) {
    return {
      status: 'error',
      error: badTeamError(id),
    };
  }

  return {
    status: 'success',
    payload: team,
  };
}