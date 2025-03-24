import fetch from 'node-fetch';

// Remove the trailing slash in BASE_URL:
const BASE_URL = 'https://alchemy-kd0l.onrender.com/';
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
  // This just logs the clue URL in the terminal, 
  // but you can open it in a browser to see the clue.
  const clueUrl = `${BASE_URL}/clue?player=${encodeURIComponent(player)}`;
  console.log(`Open this clue in your browser: ${clueUrl}`);
}

// Self-invoking async function to run your script
(async function main() {
  // If the puzzle requires you to start the game first, uncomment:
  // await startGame();

  // Then try submitting your guess:
  await submitAnswer("GoldQuicksilverSilverIron");

  // Or, to just see the clue URL:
  // getClue();
})();
