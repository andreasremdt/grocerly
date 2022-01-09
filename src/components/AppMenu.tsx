import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ClipboardIcon, CogIcon, MenuIcon, TrashIcon } from "@heroicons/react/outline";

import { GroceryContext } from "../GroceryContext";
import __ from "../utils/translate";
import { getListIdFromURL } from "../utils/helpers";

function AppMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { language, dispatch } = useContext(GroceryContext);
  const listId = getListIdFromURL(pathname);

  function handleClearList() {
    if (window.confirm(__("menu.confirmClearList", language))) {
      dispatch({ type: "CLEAR_LIST", payload: listId! });
    }
  }

  function handleDeleteList() {
    if (window.confirm(__("menu.confirmDeleteList", language))) {
      dispatch({ type: "DELETE_LIST", payload: listId! });
      navigate("/");
    }
  }

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        title="Open menu"
        className="w-10 h-10 -mr-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-purple-700 rounded-full focus:outline-none"
      >
        <MenuIcon className="w-6 h-6" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="bg-white rounded-md shadow-md py-2 w-64"
        align="end"
        sideOffset={5}
        alignOffset={8}
      >
        <DropdownMenu.Item asChild className="flex">
          <Link
            to="/settings"
            className="py-2 px-4 block hover:bg-gray-100 active:bg-gray-200 active:text-gray-900 outline-none"
          >
            <CogIcon className="w-5 h-5 mr-2" />
            {__("menu.settings", language)}
          </Link>
        </DropdownMenu.Item>
        {listId && (
          <>
            <DropdownMenu.Separator className="border-b border-gray-200 my-2" />
            <DropdownMenu.Item asChild className="flex">
              <button
                type="button"
                onClick={handleDeleteList}
                className="py-2 px-4 block w-full hover:bg-gray-100 active:bg-gray-200 active:text-gray-900 outline-none text-left"
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                {__("menu.deleteList", language)}
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild className="flex">
              <button
                type="button"
                onClick={handleClearList}
                className="py-2 px-4 block w-full hover:bg-gray-100 active:bg-gray-200 active:text-gray-900 outline-none text-left"
              >
                <ClipboardIcon className="w-5 h-5 mr-2" />
                {__("menu.clearList", language)}
              </button>
            </DropdownMenu.Item>
          </>
        )}
        <DropdownMenu.Arrow className="fill-white" offset={8} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default AppMenu;
