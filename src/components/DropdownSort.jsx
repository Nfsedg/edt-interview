import { Dropdown } from "flowbite-react";
import { nameSort, ratingSort } from "../resources/sort";
import { useState } from "react";

export default function DropdownSort({ arr, setArr }) {
  const [sortData, setSortData] = useState({
    typeSelected: "",
    direction: "",
  });
  function alphaSortHandler() {
    const direction =
      sortData.direction === ""
        ? "desc"
        : sortData.direction === "desc"
        ? "asc"
        : "desc";
    const sortArr = nameSort(arr, direction);
    setSortData({
      typeSelected: "alphanumeric",
      direction: direction,
    });
    setArr(sortArr);
  }
  function ratingSortHandler() {
    const direction =
      sortData.direction === ""
        ? "desc"
        : sortData.direction === "desc"
        ? "asc"
        : "desc";
    const sortArr = ratingSort(arr, direction);
    setArr(sortArr);
    setSortData({
      typeSelected: "rating",
      direction: direction,
    });
  }
  return (
    <Dropdown
      dismissOnClick={true}
      renderTrigger={() => (
        <button className="flex gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          <p>Sort by</p>
          <SortIcon />
        </button>
      )}
    >
      <Dropdown.Item onClick={alphaSortHandler}>
        <div className="flex justify-between w-full">
          Alphabetically {
            sortData.typeSelected === 'alphanumeric' && (sortData.direction === 'desc' ? <ArrowUp /> : <ArrowDown /> )
          }
        </div>
      </Dropdown.Item>
      <Dropdown.Item onClick={ratingSortHandler}>
        <div className="flex justify-between w-full">
          Rating {
            sortData.typeSelected === 'rating' && (sortData.direction === 'desc' ? <ArrowDown /> : <ArrowUp />)
          }
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
}

//******* ICONS *********//
function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
      />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
      />
    </svg>
  );
}
