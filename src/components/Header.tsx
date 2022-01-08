import { ArrowLeftIcon, EyeIcon, EyeOffIcon, TrashIcon } from "@heroicons/react/outline";
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { GroceryContext } from "../GroceryContext";
import { getListIdFromURL, getPageTitle } from "../utils/helpers";
import __ from "../utils/translate";
import AppMenu from "./AppMenu";

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
            <ArrowLeftIcon className="w-6 h-6" />
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
              {isFormVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
            {listId && (
              <button
                type="button"
                className="mr-2 text-white h-8 w-8 flex items-center justify-center"
                onClick={handleDelete}
                title={__("header.deleteAll", language)}
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            )}
          </>
        )}
        <AppMenu />
      </div>
    </header>
  );
}

export default Header;
