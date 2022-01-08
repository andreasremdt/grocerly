import { ArrowLeftIcon, EyeIcon, EyeOffIcon, PlusIcon, TrashIcon } from "@heroicons/react/outline";
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
          <Link
            to="/"
            className="w-10 h-10 mr-2 -ml-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-purple-700 rounded-full focus:outline-none"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </Link>
        )}

        <h1 className="mr-auto uppercase tracking-wider font-semibold text-xs">
          {getPageTitle(lists, listId)}
        </h1>

        {pathname === "/" && (
          <button
            type="button"
            className="w-10 h-10 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-purple-700 rounded-full focus:outline-none"
            onClick={() => dispatch({ type: "TOGGLE_NEW_LIST_DIALOG" })}
            title={__("header.createList", language)}
          >
            <PlusIcon className="w-6 h-6" />
          </button>
        )}

        {pathname.includes("/list") && (
          <>
            <button
              type="button"
              className="w-10 h-10 mr-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-purple-700 rounded-full focus:outline-none"
              onClick={() => dispatch({ type: "TOGGLE_FORM" })}
              title={__("header.toggleForm", language)}
            >
              {isFormVisible ? <EyeOffIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
            </button>
            {listId && (
              <button
                type="button"
                className="w-10 h-10 mr-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-purple-700 rounded-full focus:outline-none"
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
