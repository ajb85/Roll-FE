import styles from "./GameList.module.scss";

export default function NoGames() {
  return (
    <tr className={styles.noGames}>
      <td colSpan="4">
        <p>No games to display</p>
      </td>
    </tr>
  );
}
