import fetch from 'node-fetch';

/**
 * Call GET /start?player=PLAYER_NAME
 * Returns the initial puzzle text (or HTML/JSON).
 */
export async function startGame(playerName) {
  const url = `https://alchemy-kd0l.onrender.com/start?player=${encodeURIComponent(playerName)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`startGame: received status ${response.status}`);
    }
    // The puzzle might return text or JSON. Adjust as needed:
    return await response.text(); 
  } catch (err) {
    console.error('Error in startGame:', err);
    return null;
  }
}

/**
 * Call POST /answer to submit an answer.
 * The puzzle instructions specify a JSON body like:
 *   { "player": "PLAYER_NAME", "answer": "USER_ANSWER" }
 * If correct, you get the next challenge; if not, you might get an error.
 */
export async function submitAnswer(playerName, answer) {
  const url = 'https://alchemy-kd0l.onrender.com/answer';
  const payload = {
    player: playerName,
    answer: answer
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) {
      // The puzzle might send an error with some message in the response body
      let errorText = await response.text();
      throw new Error(`submitAnswer: ${response.status} - ${errorText}`);
    }
    return await response.text(); 
    // or .json() if the puzzle returns JSON
  } catch (err) {
    console.error('Error in submitAnswer:', err);
    return null;
  }
}

/**
 * Call GET /clue?player=PLAYER_NAME to get a clue for the current challenge.
 */
export async function getClue(playerName) {
  const url = `https://alchemy-kd0l.onrender.com/clue?player=${encodeURIComponent(playerName)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`getClue: received status ${response.status}`);
    }
    return await response.text(); 
  } catch (err) {
    console.error('Error in getClue:', err);
    return null;
  }
}

// Optional: quick manual test if you run this file directly:
if (import.meta.url === process.argv[1]) {
  (async () => {
    const player = 'your.uia@email.no';
    const startData = await startGame(player);
    console.log('Start Game Response:\n', startData);
  })();
}