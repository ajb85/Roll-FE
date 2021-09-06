import styles from "./Pagination.module.scss";

export default function Pagination(props) {
  const { pagination, prevPage, nextPage } = props;

  const isNotFirstPage = pagination.offset === 0;
  const isNotLastPage = pagination.offset + pagination.limit > pagination.max;

  return (
    <div className={styles.pagination}>
      <p className={isNotFirstPage ? styles.inactive : styles.active} onClick={prevPage}>
        {pagination.max > 5 ? "< Prev Page" : ""}
      </p>
      <p className={isNotLastPage ? styles.inactive : styles.active} onClick={nextPage}>
        {pagination.max > 5 ? "Next Page >" : ""}
      </p>
    </div>
  );
}
