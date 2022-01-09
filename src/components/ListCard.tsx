import { useContext } from "react";
import cx from "classnames";
import { Link } from "react-router-dom";

import { GroceryContext } from "../contexts/GroceryContext";
import { GroceryList } from "../types";
import { getItemsByList } from "../utils/helpers";
import __ from "../utils/translate";

type ListCardProps = {
  list: GroceryList;
};

function ListCard({ list }: ListCardProps) {
  const { groceries, language } = useContext(GroceryContext);
  const items = getItemsByList(list.id, groceries);

  return (
    <Link
      className="bg-white h-[250px] text-left flex flex-col p-2 rounded-md shadow-md shadow-gray-200 overflow-hidden relative"
      to={`/list/${list.id}`}
    >
      <h2 className="font-semibold text-base mb-2 text-indigo-800">{list.name}</h2>
      {items.length > 0 ? (
        <ul className="after:h-12 after:absolute after:bottom-0 after:left-0 after:right-0 after:bg-gradient-to-b after:from-transparent after:to-white">
          {items.slice(0, 10).map((item) => (
            <li key={item.id} className={cx({ "line-through text-gray-400": item.checked })}>
              {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <span>{__("card.empty", language)}</span>
      )}
    </Link>
  );
}

export default ListCard;
