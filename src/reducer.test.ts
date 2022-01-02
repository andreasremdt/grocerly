import reducer from "./reducer";
import { Grocery, GroceryList } from "./types";

type StateProps = {
  lists?: GroceryList[];
  groceries?: Grocery[];
  activeList?: number | null;
  editing?: Grocery | null;
  color?: string;
  language?: string;
  isFormVisible?: boolean;
  isSettingsVisible?: boolean;
};

function getItems(amount: number = 2): Grocery[] {
  return [
    {
      id: Date.now(),
      name: "milk",
      amount: "1",
      unit: "l",
      checked: false,
      listId: 1,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: "",
      unit: "",
      checked: true,
      listId: 1,
    },
  ].slice(0, amount);
}

function getLists(amount: number = 2): GroceryList[] {
  return [
    {
      id: Date.now(),
      name: "List #1",
    },
    {
      id: Date.now() + 1,
      name: "List #2",
    },
  ].slice(0, amount);
}

function getState({
  groceries = [],
  editing = null,
  color = "gray",
  language = "en",
  isFormVisible = false,
  isSettingsVisible = false,
  activeList = null,
  lists = [],
}: StateProps = {}) {
  return {
    editing,
    groceries,
    color,
    language,
    isFormVisible,
    isSettingsVisible,
    activeList,
    lists,
  };
}

test("adds a new item", () => {
  const [item] = getItems(1);
  const state = reducer(getState(), { type: "ADD_ITEM", payload: item });

  expect(state.groceries).toMatchObject([item]);
});

test("sums up the same item's amount", () => {
  const [item] = getItems(1);
  const state = reducer(getState({ groceries: getItems() }), { type: "ADD_ITEM", payload: item });

  expect(state.groceries[0].amount).toEqual("2");
});

test("removes an item and clears the currently editing", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items, editing: items[0] }), {
    type: "DELETE_ITEM",
    payload: items[0],
  });

  expect(state.groceries).toMatchObject([items[1]]);
  expect(state.editing).toEqual(null);
});

it("clears all items", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items }), { type: "DELETE_ALL" });

  expect(state.groceries.length).toEqual(0);
});

test("toggles an item's checked state", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items }), {
    type: "TOGGLE_CHECK_ITEM",
    payload: items[0],
  });

  expect(state.groceries[0].checked).toEqual(true);
  expect(state.groceries[1].checked).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_CHECK_ITEM", payload: items[0] });

  expect(newState.groceries[0].checked).toEqual(false);
  expect(newState.groceries[1].checked).toEqual(true);
});

test("selects an item", () => {
  const items = getItems();
  const state = reducer(getState({ groceries: items }), { type: "SELECT_ITEM", payload: items[0] });

  expect(state.editing).toMatchObject(items[0]);
});

test("updates an existing item", () => {
  const items = getItems();
  const updated = { ...items[0], name: "water", unit: "ml" };
  const state = reducer(getState({ groceries: items, editing: items[0] }), {
    type: "UPDATE_ITEM",
    payload: updated,
  });

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

test("toggles the form", () => {
  const state = reducer(getState(), { type: "TOGGLE_FORM" });

  expect(state.isFormVisible).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_FORM" });

  expect(newState.isFormVisible).toEqual(false);
});

test("toggles the settings page", () => {
  const state = reducer(getState(), { type: "TOGGLE_SETTINGS" });

  expect(state.isSettingsVisible).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_SETTINGS" });

  expect(newState.isSettingsVisible).toEqual(false);
});

test("adds a new list", () => {
  const state = reducer(getState(), {
    type: "ADD_LIST",
    payload: {
      id: 123,
      name: "List #1",
    },
  });

  expect(state.lists).toHaveLength(1);
  expect(state.lists[0].name).toEqual("List #1");
  expect(state.isFormVisible).toEqual(true);
  expect(state.activeList).toEqual(123);

  const newState = reducer(state, {
    type: "ADD_LIST",
    payload: {
      id: 456,
      name: "List #2",
    },
  });

  expect(newState.lists.length).toEqual(2);
});

test("removes a list", () => {
  const lists = getLists();

  const state = reducer(getState({ lists, activeList: lists[0].id }), {
    type: "DELETE_LIST",
    payload: lists[0].id,
  });

  expect(state.lists).toHaveLength(1);
  expect(state.activeList).toEqual(null);
});

test("sets a list as active", () => {
  const lists = getLists();

  const state = reducer(getState({ lists }), {
    type: "SET_ACTIVE_LIST",
    payload: lists[0].id,
  });

  expect(state.activeList).toEqual(lists[0].id);
});
