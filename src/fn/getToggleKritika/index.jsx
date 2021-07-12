// снижение критики при наличие бреда, галлюц и тп
let getToggleKritika = (psystatus, toggleRadio, toggleSymptom, number) => {
  let toggleKritika = e => {
    let kritika = psystatus.kritika.number;
    let kritikaE = { target: {} };

    if (kritika === 0) {
      kritikaE.target.name = "kritika";
      kritikaE.target.value = number;
      toggleRadio(kritikaE);
    }

    toggleSymptom(e);
  };
  return toggleKritika;
};

export default getToggleKritika;
