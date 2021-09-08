import { CSSProperties, useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import __, { availableLanguages } from "../utils/translate";
import styles from "./Settings.module.css";

export const COLORS = [
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
  const { dispatch, color: themeColor, language } = useContext(GroceryContext);

  return (
    <div className={styles.wrapper}>
      <form>
        <fieldset className={styles.fieldset}>
          <legend>{__("settings.themeColor", language)}</legend>

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

        <fieldset className={styles.fieldset}>
          <legend>{__("settings.language", language)}</legend>

          <select
            className={styles.select}
            data-testid="language-select"
            value={language}
            onChange={(event) => dispatch({ type: "CHANGE_LANGUAGE", payload: event.target.value })}
          >
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {__(language, language)}
              </option>
            ))}
          </select>
        </fieldset>
      </form>
    </div>
  );
}

export default Settings;
