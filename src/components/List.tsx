import GroceryItem from "./GroceryItem";
import { Grocery } from "../types";

type ListProps = {
  onDelete: (payload: Grocery) => void;
  groceries: Grocery[];
};

function List({ groceries, onDelete }: ListProps) {
  return (
    <main>
      <ul>
        {groceries.map((grocery) => (
          <GroceryItem key={grocery.name} grocery={grocery} />
        ))}
      </ul>
    </main>
  );
}

export default List;
