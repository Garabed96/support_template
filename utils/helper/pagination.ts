export const getPagination = (page, size, page_size) => {
  const limit = size ? +size : page_size;
  const from = page ? (page - 1) * limit : 0;
  const to = page ? from + limit : limit;

  return { from, to };
};
