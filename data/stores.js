export const books = [];
export let currentId = 1;

export function getNextId() {
  return currentId++;
}