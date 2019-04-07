import { parseDiceCode } from './parser';
import roll from './roller';

export const rollDiceCode = (code) => roll(parseDiceCode(code));

export default rollDiceCode; 
