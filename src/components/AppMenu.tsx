import { useContext } from "react";
import { Link } from "react-router-dom";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MenuIcon } from "@heroicons/react/outline";

import { GroceryContext } from "../GroceryContext";
import __ from "../utils/translate";

function AppMenu() {
  const { language } = useContext(GroceryContext);

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label="Open menu"
        className="w-10 h-10 -mr-2 text-white flex items-center justify-center hover:bg-white/10 active:bg-white/30 active:text-purple-700 rounded-full focus:outline-none"
      >
        <MenuIcon className="w-6 h-6" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="bg-white rounded-md shadow-md py-2 w-52"
        align="end"
        sideOffset={5}
        alignOffset={8}
      >
        <DropdownMenu.Item asChild>
          <Link to="/settings" className="py-2 px-4 block hover:bg-gray-100">
            {__("menu.settings", language)}
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Arrow className="fill-white" offset={8} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default AppMenu;
