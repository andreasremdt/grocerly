import { Grocery, GroceryList } from "../types";

export function getItemsByList(listId: number, items: Grocery[]) {
  return items.filter((item) => item.listId === listId);
}

export function getPageTitle(lists: GroceryList[], activeList: number | null) {
  if (!activeList) {
    return "Grocerly";
  }

  return lists.find((list) => list.id === activeList)?.name || "Untitled List";
}
