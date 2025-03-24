export function getClue(challengeNumber) {
    const clues = {
        1: 'Remember to look at the first letters of each line.',
        2: 'Try converting from hex to ASCII.',
        3: 'The pattern might repeat every 13 characters.'
    };

    return clues[challengeNumber] ?? 'No clue available for this challenge number.';
}
if (import.meta.url === process.argv[1]) {
    console.log('Clue for challenge #1:');
    console.log(getClue(1));
}