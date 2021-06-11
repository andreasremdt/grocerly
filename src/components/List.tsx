import GroceryItem from "./GroceryItem";

type ListProps = {
  groceries: {
    name: string;
    unit: string;
    amount: number;
  }[];
};

function List({ groceries }: ListProps) {
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
