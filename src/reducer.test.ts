import reducer from "./reducer";
import { Grocery } from "./types";

const getItems = (amount: number = 2) => {
  return [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: true,
    },
  ].slice(0, amount);
};

const getState = (
  groceries: Grocery[] = [],
  editing: Grocery | null = null,
  color: string = "gray",
  language: string = "en"
) => {
  return { editing, groceries, color, language };
};

test("adds a new item", () => {
  const [item] = getItems(1);
  const state = reducer(getState(), { type: "ADD_ITEM", payload: item });

  expect(state.groceries).toMatchObject([item]);
});

test("sums up the same item's amount", () => {
  const [item] = getItems(1);
  const state = reducer(getState(getItems()), { type: "ADD_ITEM", payload: item });

  expect(state.groceries[0].amount).toEqual("2");
});

test("removes an item and clears the currently editing", () => {
  const items = getItems();
  const state = reducer(getState(items, items[0]), { type: "DELETE_ITEM", payload: items[0] });

  expect(state.groceries).toMatchObject([items[1]]);
  expect(state.editing).toEqual(null);
});

it("clears all items", () => {
  const items = getItems();
  const state = reducer(getState(items), { type: "DELETE_ALL" });

  expect(state.groceries.length).toEqual(0);
});

test("toggles an item's checked state", () => {
  const items = getItems();
  const state = reducer(getState(items), { type: "TOGGLE_CHECK_ITEM", payload: items[0] });

  expect(state.groceries[0].checked).toEqual(true);
  expect(state.groceries[1].checked).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_CHECK_ITEM", payload: items[0] });

  expect(newState.groceries[0].checked).toEqual(false);
  expect(newState.groceries[1].checked).toEqual(true);
});

test("selects an item", () => {
  const items = getItems();
  const state = reducer(getState(items), { type: "SELECT_ITEM", payload: items[0] });

  expect(state.editing).toMatchObject(items[0]);
});

test("updates an existing item", () => {
  const items = getItems();
  const updated = { ...items[0], name: "water", unit: "ml" };
  const state = reducer(getState(items, items[0]), { type: "UPDATE_ITEM", payload: updated });

  expect(state.editing).toEqual(null);
  expect(state.groceries[0]).toMatchObject({
    id: items[0].id,
    name: "water",
    amount: "1",
    unit: "ml",
    checked: false,
  });
});

test("changes the theme color", () => {
  const state = reducer(getState(), { type: "CHANGE_COLOR", payload: "orange" });

  expect(state.color).toEqual("orange");
});

test("changes the language", () => {
  const state = reducer(getState(), { type: "CHANGE_LANGUAGE", payload: "de" });

  expect(state.language).toEqual("de");
});
