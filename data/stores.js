export const books = [{
  id: "1",
  title: "Sample Book",
  author: "Deka"
}
];
export let currentId = 1;

export function getNextId() {
  return currentId++;
}