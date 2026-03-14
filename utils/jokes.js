export const cannabisJokes = [
  'What do you call a potato that smokes cannabis? A baked potato.....',
  "To be blunt... I think we're going to be best buds.....",
  "Why is a roach clip called a roach clip? Because 'pot holder' was taken.....",
  'What do you call a cannabis plant with ambition? A high achiever.....',
  "Why don't joints last long at work? They always get burned out.....",
  "What is a cannabis plant's favorite drink? Root beer.",
  'Why did the plant go to therapy? To get to the root of its problems.....',
];

export const getRandomJoke = () => {
  return cannabisJokes[Math.floor(Math.random() * cannabisJokes.length)];
};