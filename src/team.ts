import { NotExistsError } from "./errors";

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

export class BadTeamError extends Error {
  cause: Error;

  constructor(id: string) {
    super(id);
    this.cause = new Error(`No that team :( ${id}`);
    this.name = 'BadTeamError';
    Object.setPrototypeOf(this, BadTeamError.prototype);
  }
}

export const rateTeam = async (id: string): Promise<Team> => {
  const team = teams.find(t => t.id === id);

  if (!team) {
    throw new NotExistsError(new Error(`Team with id ${id} does not exists`));
  }
  
  if (team.score < 3) {
    throw new BadTeamError(id);
  }

  return team;
}