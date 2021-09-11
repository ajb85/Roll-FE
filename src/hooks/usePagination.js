import { useState, useCallback, useEffect } from "react";

export default function usePagination(max, limit = 5) {
  const [pagination, setPagination] = useState({
    limit, // Number of items per page
    offset: 0, // Starting index for the page
    max: max || limit, // Total number of items
  });

  useEffect(() => {
    const current = { ...pagination };
    current.max = max || 5;
    current.limit = limit;

    while (current.offset >= current.max) {
      // If offset is over the number of items, back by a page until it's back within limits
      current.offset -= current.limit;
    }

    if (
      current.offset !== pagination.offset ||
      current.limit !== pagination.limit ||
      current.max !== pagination.max
    ) {
      setPagination(current);
    }
  }, [max, limit, pagination, setPagination]);

  const prevPage = useCallback(
    () =>
      pagination.offset > 0 &&
      setPagination({ ...pagination, offset: pagination.offset - pagination.limit }),
    [pagination, setPagination]
  );

  const nextPage = useCallback(
    () =>
      pagination.offset + pagination.limit <= pagination.max &&
      setPagination({ ...pagination, offset: pagination.offset + pagination.limit }),
    [pagination, setPagination]
  );

  return { pagination, prevPage, nextPage };
}
