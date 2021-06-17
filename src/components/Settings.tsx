import { CSSProperties, useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import styles from "./Settings.module.css";

const COLORS = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "cyan",
  "blue",
  "purple",
  "pink",
];

function Settings() {
  const { dispatch, color: themeColor } = useContext(GroceryContext);

  return (
    <div className={styles.wrapper}>
      <form>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Theme color</legend>

          <div className={styles.colors}>
            {COLORS.map((color) => (
              <label key={color}>
                <input
                  type="radio"
                  value={color}
                  name="theme-color"
                  className={styles.radio}
                  onChange={() => dispatch({ type: "CHANGE_COLOR", payload: color })}
                  checked={color === themeColor}
                />
                <span
                  className={styles.label}
                  style={{ "--color": `var(--${color})` } as CSSProperties}
                >
                  {color}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Settings;
