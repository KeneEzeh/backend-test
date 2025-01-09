import fs from 'fs';


// 1. Announce: "The King has entered the court"
console.log("The King has entered the court");

// 2. Schedule a bard (file reader) to sing a song asynchronously (fs.promises.readFile)
fs.promises.readFile('song.txt', 'utf8')
  .then(() => console.log('The bard sings a song'))
  .catch(() => console.log('The bard failed to sing a song'));

// 3. Schedule a jester's act (setTimeout callback for 0 ms)
setTimeout(() => {
  console.log('The jester performs his act');
}, 0);

// 4. Let the king's advisor (process.nextTick) whisper: "Your Majesty, there’s an urgent matter."
process.nextTick(() => {
  console.log("The King's advisor whispers: 'Your Majesty, there's an urgent matter.'");
});

// 5. Announce: "The court session has ended."
console.log("The court session has ended.");