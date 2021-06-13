import reducer from "./reducer";

const getItems = (amount: number = 2) => {
  return [
    {
      id: Date.now(),
      name: "milk",
      amount: 1,
      unit: "l",
      checked: false,
    },
    {
      id: Date.now() + 1,
      name: "bread",
      amount: NaN,
      unit: "",
      checked: true,
    },
  ].slice(0, amount);
};

test("adds a new item", () => {
  const [item] = getItems(1);
  const state = reducer([], { type: "ADD_ITEM", payload: item });

  expect(state).toMatchObject([item]);
});

test("sums up the same item's amount", () => {
  const [item] = getItems(1);
  const state = reducer(getItems(), { type: "ADD_ITEM", payload: item });

  expect(state[0].amount).toEqual(2);
});

test("removes an item", () => {
  const items = getItems();
  const state = reducer(items, { type: "DELETE_ITEM", payload: items[0] });

  expect(state).toMatchObject([items[1]]);
});

it("clears all items", () => {
  const items = getItems();
  const state = reducer(items, { type: "DELETE_ALL" });

  expect(state.length).toEqual(0);
});

test("toggles an item's checked state", () => {
  const items = getItems();
  const state = reducer(items, { type: "TOGGLE_CHECK_ITEM", payload: items[0] });

  expect(state[0].checked).toEqual(true);
  expect(state[1].checked).toEqual(true);

  const newState = reducer(state, { type: "TOGGLE_CHECK_ITEM", payload: items[0] });

  expect(newState[0].checked).toEqual(false);
  expect(newState[1].checked).toEqual(true);
});
