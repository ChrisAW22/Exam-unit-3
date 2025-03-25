import fetch from 'node-fetch';

const BASE_URL = 'https://alchemy-kd0l.onrender.com';
const player = 'christoffw@uia.no';

async function startGame() {
  try {
    const response = await fetch(
      `${BASE_URL}/start?player=${encodeURIComponent(player)}`
    );
    if (!response.ok) {
      throw new Error(`Failed to start game (HTTP ${response.status}).`);
    }
    const data = await response.json();
    console.log('Game started:', data);
  } catch (err) {
    console.error('Error starting game:', err);
  }
}

async function submitAnswer(answer) {
  try {
    const response = await fetch(`${BASE_URL}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        player: player,
        answer: answer
      })
    });
    if (!response.ok) {
      throw new Error(`Answer submission failed (HTTP ${response.status}).`);
    }
    const data = await response.json();
    console.log('Answer response:', data);
  } catch (err) {
    console.error('Incorrect or error:', err);
  }
}

function getClue() {
  const clueUrl = `${BASE_URL}/clue?player=${encodeURIComponent(player)}`;
  console.log(`Open this clue in your browser: ${clueUrl}`);
}


(async function main() {

await startGame();

  // Then try submitting your guess:
    
  // Puzzle 1 Answer
  // await submitAnswer("GoldQuicksilverSilverIronGold");
    // Puzzle 2 Answer
  // await submitAnswer("Silver");
    // Puzzle 3 Answer
  // await submitAnswer("☿♀🜍🜂🜔🜄☉🜁");
    // Puzzle 4 Answer
  //await submitAnswer("Argon");

  
  // Or, to just see the clue URL:
getClue();
})();

