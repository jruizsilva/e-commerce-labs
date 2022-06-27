const getRatingPromedio = (reviews) => {
  const suma = reviews.reduce((acc, curr) => {
    return acc + curr.score;
  }, 0);
  return suma / reviews.length;
};

module.exports = { getRatingPromedio };
