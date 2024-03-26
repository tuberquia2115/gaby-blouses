export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
  // si el numero total de páginas es 7 o menos
  // vamos a mostrar todas las páginas sin puntos suspensivos

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // si la página actual está entre las primas 3 paǵinas
  // mostrar las primera 3, puntos suspensivos, y las ultimas dos;

  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // si la página actual está entre las últimas 3 páginas
  // mostrar las primeras 2, puntos suspensivos, las últimas 3 paginas

  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // si la página actual está en otro lugar medio
  // mostrar la primera página, puntos suspensivos, la página actual y vecinos
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
