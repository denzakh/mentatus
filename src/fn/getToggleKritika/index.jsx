// снижение критики при наличии бреда, галлюцинаций и т.п.
// возвращает true, если критика ещё не выставлена (0)
let getToggleKritika = psystatus => {
  return +psystatus.kritika.number === 0;
};

export default getToggleKritika;
