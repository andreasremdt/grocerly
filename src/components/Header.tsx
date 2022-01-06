import { useContext } from "react";

import { GroceryContext } from "../GroceryContext";
import { getPageTitle } from "../utils/helpers";
import __ from "../utils/translate";

function Header() {
  const { dispatch, language, activeList, lists, isFormVisible, isSettingsVisible } =
    useContext(GroceryContext);

  function handleDelete() {
    if (window.confirm(__("header.confirmDeleteAll", language))) {
      dispatch({ type: "DELETE_LIST", payload: activeList! });
    }
  }

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md relative z-20">
      <div className="max-w-xl mx-auto px-2 flex h-12 items-center">
        {activeList && (
          <button
            onClick={() => dispatch({ type: "SET_ACTIVE_LIST", payload: null })}
            className="mr-2 text-white h-8 w-8 flex items-center justify-center"
          >
            <svg className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        )}

        <h1 className="mr-auto uppercase tracking-wider font-semibold text-xs">
          {getPageTitle(lists, activeList)}
        </h1>

        {!isSettingsVisible && activeList && (
          <>
            <button
              type="button"
              className="mr-2 text-white h-8 w-8 flex items-center justify-center"
              onClick={() => dispatch({ type: "TOGGLE_FORM" })}
              title={__("header.toggleForm", language)}
            >
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
            {activeList && (
              <button
                type="button"
                className="mr-2 text-white h-8 w-8 flex items-center justify-center"
                onClick={handleDelete}
                title={__("header.deleteAll", language)}
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
            )}
          </>
        )}
        <button
          type="button"
          className="text-white h-8 w-8 flex items-center justify-center"
          onClick={() => dispatch({ type: "TOGGLE_SETTINGS" })}
          title={__("header.toggleSettings", language)}
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
            {isSettingsVisible ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </>
            ) : (
              <>
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </>
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
