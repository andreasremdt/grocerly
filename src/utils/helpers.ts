import { Grocery, GroceryList } from "../types";

export function getItemsByList(listId: number, items: Grocery[]) {
  return items.filter((item) => item.listId === listId);
}

export function getPageTitle(lists: GroceryList[], listId?: number) {
  if (!listId) {
    return "Grocerly";
  }

  return lists.find((list) => list.id === listId)?.name || "Untitled List";
}

export function getListIdFromURL(path: string) {
  const [, , listId] = path.split(/\//g);

  return listId ? Number(listId) : undefined;
}