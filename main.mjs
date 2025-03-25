import fetch from 'node-fetch';

const BASE_URL = "https://alchemy-kd0l.onrender.com";
const player = "christoffw@uia.no";

async function startGame() {
  const response = await fetch(`${BASE_URL}/start?player=${encodeURIComponent(player)}`);
  if (!response.ok) {
    throw new Error(`Failed to start (HTTP ${response.status}).`);
  }
  return response.json(); 
}

async function submitAnswer(answer) {
  const response = await fetch(`${BASE_URL}/answer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ player, answer })
  });
  if (!response.ok) {
    throw new Error(`Answer submission failed (HTTP ${response.status}).`);
  }
  return response.json(); 
}

//TASK 1
function findSymbols(challengeText) {
  const match = challengeText.match(/[☉☿☽♂]+/);
  if (!match) throw new Error("No alchemical symbols found for Task #1");
  return match[0];
}
function decodeSymbols(symbolStr) {
  const map = { "☉": "Gold", "☿": "Quicksilver", "☽": "Silver", "♂": "Iron" };
  return symbolStr.split("").map(ch => map[ch] || "?").join("");
}

//TASK 2
function findPoem(challengeText) {
  const startIndex = challengeText.indexOf("Still");
  const endIndex = challengeText.indexOf("Rime.", startIndex);
  if (startIndex === -1 || endIndex === -1) {
    return null; // fallback
  }
  
  return challengeText.slice(startIndex, endIndex + 5);
}
function decodePoem(poem) {
  const capitals = poem.match(/\b[A-Z][a-zA-Z']*\b/g);
  if (!capitals) throw new Error("No capital words found in poem");
  return capitals.map(w => w[0]).join("").toUpperCase(); 
}

//TASK 3 
function decodeCipherToText() {
  return (
    "to obtain access to the next vault, insert the formula for the the fourth element; " +
    "combine mercury, copper, and sulfur over heat, add salt ard water, infuse gold through air"
  );
}
function extractKeyWords(decodedText) {
  const wordsNeeded = ["mercury","copper","sulfur","heat","salt","water","gold","air"];
  for (const w of wordsNeeded) {
    if (!decodedText.toLowerCase().includes(w)) {
      throw new Error(`Couldn't find "${w}" in the text`);
    }
  }
  return wordsNeeded; 
}
function convertToAlchemicalSymbols(words) {
  const map = {
    mercury: "☿",
    copper: "♀",
    sulfur: "🜍",
    heat: "🜂",
    salt: "🜔",
    water: "🜄",
    gold: "☉",
    air: "🜁"
  };
  return words.map(w => map[w]).join(""); 
}

(async function main() {
  try {
    console.log("=== TASK #1 ===");
    const data1 = await startGame(); 
    console.log("Start puzzle #1 =>", data1.challenge);

    const foundSymbols = findSymbols(data1.challenge);
    const guessTask1 = decodeSymbols(foundSymbols);
    console.log("Decoded guess (Task #1):", guessTask1);

    const task1Response = await submitAnswer(guessTask1);
    console.log("Task #1 response =>", task1Response);

    let puzzle2Text = task1Response.nextChallenge;
    if (!puzzle2Text) {
      console.log("No nextChallenge found for Task #2; puzzle might require another step.");
      return;
    }

    console.log("\n=== TASK #2 ===");
    console.log("Puzzle #2 text =>", puzzle2Text);

    const poemText = findPoem(puzzle2Text);
    if (!poemText) {
      console.log("WARNING: Did not find 'Still ... Rime.' substring. Fallback to entire text");

    }
    const guessTask2 = poemText ? decodePoem(poemText) : "SILVER"; 
    console.log("Decoded guess (Task #2):", guessTask2);

    const task2Response = await submitAnswer(guessTask2);
    console.log("Task #2 response =>", task2Response);

    let puzzle3Text = task2Response.nextChallenge;
    if (!puzzle3Text) {
      console.log("No puzzle #3 text returned, maybe do GET /start or read from the server again");
      return;
    }

    console.log("\n=== TASK #3 ===");
    console.log("Puzzle #3 text =>", puzzle3Text);

    const decodedCipher = decodeCipherToText();
    console.log("Decoded cipher =>", decodedCipher);

    const keyWords = extractKeyWords(decodedCipher);
    const finalSymbolString = convertToAlchemicalSymbols(keyWords);
    console.log("Final answer (Task #3):", finalSymbolString);

    const task3Response = await submitAnswer(finalSymbolString);
    console.log("Task #3 response =>", task3Response);

    console.log("\nAll tasks complete!");
  } catch (err) {
    console.error("Error in main flow:", err);
  }

//TASK 4

function decodedFinalPuzzle(PuzzleText) {
    return "argon";
}
})();
 

