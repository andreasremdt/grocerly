import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import { getListIdFromURL, getPageTitle } from "../utils/helpers";
import __ from "../utils/translate";
import Icon from "./Icon";

function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { dispatch, language, lists, isFormVisible } = useContext(GroceryContext);

  const listId = getListIdFromURL(pathname);

  function handleDelete() {
    if (window.confirm(__("header.confirmDeleteAll", language))) {
      dispatch({ type: "DELETE_LIST", payload: listId! });
      navigate("/");
    }
  }

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md relative z-20">
      <div className="max-w-xl mx-auto px-2 flex h-12 items-center">
        {pathname !== "/" && (
          <Link to="/" className="mr-2 text-white h-8 w-8 flex items-center justify-center">
            <Icon type="back" />
          </Link>
        )}

        <h1 className="mr-auto uppercase tracking-wider font-semibold text-xs">
          {getPageTitle(lists, listId)}
        </h1>

        {pathname !== "/settings" && pathname.includes("/list") && (
          <>
            <button
              type="button"
              className="mr-2 text-white h-8 w-8 flex items-center justify-center"
              onClick={() => dispatch({ type: "TOGGLE_FORM" })}
              title={__("header.toggleForm", language)}
            >
              <Icon type={isFormVisible ? "hide" : "show"} />
            </button>
            {listId && (
              <button
                type="button"
                className="mr-2 text-white h-8 w-8 flex items-center justify-center"
                onClick={handleDelete}
                title={__("header.deleteAll", language)}
              >
                <Icon type="trash" />
              </button>
            )}
          </>
        )}
        <Link
          to="/settings"
          className="text-white h-8 w-8 flex items-center justify-center"
          title={__("header.toggleSettings", language)}
        >
          <Icon type="settings" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
