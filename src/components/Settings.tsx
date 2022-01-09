import { useContext } from "react";

import { GroceryContext } from "../contexts/GroceryContext";
import Select from "./Select";
import __, { availableLanguages } from "../utils/translate";

function Settings() {
  const { dispatch, language } = useContext(GroceryContext);

  return (
    <main className="p-2 mx-auto max-w-xl w-full">
      <form>
        <label htmlFor="language" className="block mb-1">
          {__("settings.language", language)}
        </label>

        <Select
          id="language"
          data-testid="language-select"
          value={language}
          onChange={(event) => dispatch({ type: "CHANGE_LANGUAGE", payload: event.target.value })}
        >
          {availableLanguages.map((language) => (
            <option key={language} value={language}>
              {__(language, language)}
            </option>
          ))}
        </Select>
      </form>
    </main>
  );
}

export default Settings;
