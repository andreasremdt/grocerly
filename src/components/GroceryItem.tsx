type GroceryProps = {
  grocery: {
    name: string;
    unit: string;
    amount: number;
  };
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
