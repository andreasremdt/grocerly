import __, { availableLanguages } from "./translate";

test("re-exports all languages", () => {
  expect(availableLanguages.length).toEqual(3);
});

test("returns the proper translation", () => {
  expect(__("emptyState.title", "en")).toEqual("Nothing here, yet.");
  expect(__("emptyState.title", "de")).toEqual("Diese Liste ist noch leer.");
  expect(__("emptyState.title", "es")).toEqual("Nada aquí, todavía.");
  expect(__("does.not.exist", "en")).toEqual(null);
});
