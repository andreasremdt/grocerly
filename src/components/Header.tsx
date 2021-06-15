import styles from "./Header.module.css";

type HeaderProps = {
  onDeleteAll: () => void;
  onToggleForm: () => void;
  isFormVisible: boolean;
};

function Header({ onDeleteAll, onToggleForm, isFormVisible }: HeaderProps) {
  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>Grocery List</h1>
      <button type="button" onClick={onToggleForm} className={styles.button} title="Toggle form">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isFormVisible ? (
            <polyline points="18 15 12 9 6 15"></polyline>
          ) : (
            <polyline points="6 9 12 15 18 9"></polyline>
          )}
        </svg>
      </button>
      <button
        type="button"
        onClick={onDeleteAll}
        className={styles.button}
        title="Delete all items"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      </button>
    </header>
  );
}

export default Header;
