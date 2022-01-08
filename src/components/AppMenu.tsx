import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";

import Icon from "./Icon";

function AppMenu() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger aria-label="Open menu">
        <Icon type="menu" width={24} height={24} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        className="bg-white rounded-md shadow-md py-2 w-52"
        align="end"
        sideOffset={5}
      >
        <DropdownMenu.Item asChild>
          <Link to="/settings" className="py-2 px-4 block hover:bg-gray-100">
            Settings
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Arrow className="fill-white" offset={8} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default AppMenu;
