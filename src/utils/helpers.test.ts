import { Grocery, GroceryList } from "../types";
import { getItemsByList, getListIdFromURL, getPageTitle } from "./helpers";

test("returns all items for a list", () => {
  const items: Grocery[] = [
    { listId: 1, id: 1, amount: "", checked: false, name: "Item #1", unit: "" },
    { listId: 1, id: 2, amount: "", checked: false, name: "Item #1", unit: "" },
    { listId: 2, id: 3, amount: "", checked: false, name: "Item #1", unit: "" },
  ];

  expect(getItemsByList(1, items)).toEqual(items.slice(0, 2));
  expect(getItemsByList(3, items)).toEqual([]);
});

test("returns the correct page title", () => {
  const lists: GroceryList[] = [
    { id: 1, name: "List #1" },
    { id: 2, name: "" },
  ];

  expect(getPageTitle(lists, null)).toEqual("Grocerly");
  expect(getPageTitle(lists, 1)).toEqual("List #1");
  expect(getPageTitle(lists, 2)).toEqual("Untitled List");
  expect(getPageTitle(null, 2)).toEqual("Untitled List");
});

test("returns the list ID from the pathname", () => {
  expect(getListIdFromURL("/list/123")).toEqual(123);
  expect(getListIdFromURL("/list")).toBeUndefined();
  expect(getListIdFromURL("/")).toBeUndefined();
});
