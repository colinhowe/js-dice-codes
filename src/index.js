import { parseDiceCode } from './parser';
import roll from './roller';

const rollDiceCode = (code) => roll(parseDiceCode(code));

export default rollDiceCode; 
