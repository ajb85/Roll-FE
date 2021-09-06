import { useCallback } from "react";

// import styles from "./GameList.module.scss";

export default function GameFilters(props) {
  const { filters, setFilters } = props;

  const updateFilters = useCallback(
    (e) => {
      const { name, value } = e.target;
      const newFilters = { ...filters };
      const isCheckbox = name !== "name";

      if (isCheckbox) {
        newFilters[name] = !(value === "false" || value === false);
      } else {
        newFilters[name] = value;
      }

      setFilters(newFilters);
    },
    [filters, setFilters]
  );

  return (
    <div>
      <h2>Filter Games</h2>
      <input
        type="text"
        placeholder="Game Name"
        name="name"
        value={filters.name}
        onChange={updateFilters}
      />
      <label>
        Active Games
        <input
          type="checkbox"
          name="isActive"
          value={!filters.isActive}
          checked={filters.isActive}
          onChange={updateFilters}
        />
      </label>
      <label>
        Your Turn
        <input
          type="checkbox"
          name="isUsersTurn"
          value={!filters.isUsersTurn}
          checked={filters.isUsersTurn}
          onChange={updateFilters}
        />
      </label>
    </div>
  );
}
