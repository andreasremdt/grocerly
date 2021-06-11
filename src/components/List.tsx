import GroceryItem from "./GroceryItem";
import { Grocery } from "../types";

type ListProps = {
  groceries: Grocery[];
  onDelete: (payload: Grocery) => void;
  onToggle: (payload: Grocery) => void;
};

function List({ groceries, onDelete, onToggle }: ListProps) {
  return (
    <main>
      <ul>
        {groceries.map((grocery) => (
          <GroceryItem key={grocery.name} onDelete={onDelete} onToggle={onToggle} item={grocery} />
        ))}
      </ul>
    </main>
  );
}

export default List;
