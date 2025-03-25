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

//Task 2

async function getSecondChallenge() {

    const response = await fetch(
      `${BASE_URL}/start?player=${encodeURIComponent(player)}`
    );
  
    if (!response.ok) {
      throw new Error(`Could not get second challenge (HTTP ${response.status}).`);
    }
  
    return response.json(); 
  }

  async function submitAnswer2(answer) {
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

  function extractPoem(challengeText) {

    const start = challengeText.indexOf("Still");
    const end = challengeText.indexOf("Rime.", start);
    
    if (start === -1 || end === -1) {
      return challengeText;
    }
    return challengeText.slice(start, end + 5);
  }
  function decodePoem(poemText) {
    const capitalWords = poemText.match(/\b[A-Z][a-zA-Z']*\b/g);
    if (!capitalWords) {
      throw new Error("No capitalized words found to decode.");
    }
    const letters = capitalWords.map(word => word[0]);
    return letters.join('').toUpperCase(); 
  }
  
  (async function main() {
    try {
      const puzzleData = await getSecondChallenge();
      console.log("Puzzle Data:", puzzleData);

      const poemText = extractPoem(puzzleData.challenge);
      console.log("Extracted poem:", poemText);

      const codeWord = decodePoem(poemText);
      console.log("Decoded poem =>", codeWord);

      const result = await submitAnswer2(codeWord);
      console.log("Submission response:", result);
    } catch (err) {
      console.error("Error decoding the poem puzzle:", err);
    }
  })();
  
//Task 3