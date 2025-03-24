import { startGame, submitAnswer, getClue } from './puzzleClient.mjs';

(async function main() {
  const player = 'christoffw@uia.no';

  // 1) Start the game
  const puzzle = await startGame(player);
  console.log('Puzzle Start:\n', puzzle);

  // 2) If you want a clue (assuming you’re stuck)
const clue = await getClue(player);
console.log('Retrieved Clue:\n', clue);

  // 3) Once you have an answer, you’d do:
const nextPuzzle = await submitAnswer(player, "My_Proposed_Solution");
console.log('Next Puzzle (after correct answer):\n', nextPuzzle);
})();
