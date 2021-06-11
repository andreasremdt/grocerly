import { Grocery } from "../types";

type GroceryProps = {
  grocery: Grocery;
};

function GroceryItem({ grocery }: GroceryProps) {
  return (
    <li>
      {grocery.amount}
      {grocery.unit}
      {grocery.name}
      <button type="button">&times;</button>
    </li>
  );
}

export default GroceryItem;
