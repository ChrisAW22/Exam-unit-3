import fetch from 'node-fetch';

const BASE_URL = 'https://alchemy-kd0l.onrender.com';
const player = 'christoffw1@uia.no';

//Task 1
async function startGame() {
    const response = await fetch(`${BASE_URL}/start?player=${encodeURIComponent(player)}`);
    if (!response.ok) {
      throw new Error(`Failed to start game (HTTP ${response.status}).`);
    }
    return response.json();
  }
  
  async function submitAnswer(answer) {
    const response = await fetch(`${BASE_URL}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, answer })
    });
    if (!response.ok) {
      throw new Error(`Answer submission failed (HTTP ${response.status}).`);
    }
    return response.json();
  }
  
  function extractSymbols(challengeText) {
    const match = challengeText.match(/[☉☿☽♂]+/);
    if (!match) {
      throw new Error("Could not find alchemical symbols in the text.");
    }
    return match[0]; 
  }
  
  function decodeAlchemicalSymbols(symbolsString) {
    const symbolMap = {
      '☉': 'Gold',
      '☿': 'Quicksilver',
      '☽': 'Silver',
      '♂': 'Iron'
    };
    return symbolsString
      .split('')
      .map(s => symbolMap[s] || 'UNKNOWN')
      .join('');
  }
  
  (async function main() {
    try {
      const puzzleData = await startGame();
      console.log('Puzzle data:', puzzleData);
  
      const puzzleText = puzzleData.challenge;
      console.log("Raw puzzle text:", puzzleText);
  
      const foundSymbols = extractSymbols(puzzleText);
      console.log("Found symbols:", foundSymbols);

      const guess = decodeAlchemicalSymbols(foundSymbols);
      console.log("Decoded guess:", guess);

      const result = await submitAnswer(guess);
      console.log("Answer result:", result);
    } catch (err) {
      console.error("Error in Task 1 script:", err);
    }
  })();


  