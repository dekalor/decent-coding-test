export const books = [{
  id: "1",
  title: "Sample Book",
  author: "Deka",
  year: 2024
}
];
export let currentId = 2;

export function getNextId() {
  return currentId++;
}