type HeaderProps = {
  onDeleteAll: () => void;
};

function Header({ onDeleteAll }: HeaderProps) {
  return (
    <header>
      <h1>Grocery List</h1>
      <button type="button" onClick={onDeleteAll}>
        &times;
      </button>
    </header>
  );
}

export default Header;
