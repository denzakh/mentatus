// дата осмотра по умолчанию — сегодня, в формате input[type="date"]
const getToday = () => {
  const now = new Date();
  return (
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2)
  );
};

const store = {
  patientId: {
    number: 0
  },
  vozrast: {
    text: ""
  },
  pol: {
    isChecked: false
  },
  dataOsmotra: {
    text: getToday()
  },
  mestoOsmotra: {
    number: 1
  },
  mestoText: {
    text: ""
  },
  poNapravleniu: {
    isChecked: false
  },
  sIstorieiOznakomlen: {
    isChecked: false
  },
  nedobrovolno: {
    isChecked: false
  },
  nedobrovolnoPrichiny: {
    number: 1
  },
  nedobrovolnoPunkt: {
    number: 1
  },
  nedobrovolnoText: {
    text: ""
  },
  soznanie: {
    number: 0
  },
  kontakt: {
    number: 0
  },
  kontaktZatrudnen: {
    isChecked: false
  },
  kontaktSluh: {
    isChecked: false
  },
  kontaktKognit: {
    isChecked: false
  },
  kontaktSostoyanie: {
    isChecked: false
  },
  kontaktSoznanie: {
    isChecked: false
  },
  vpechatleniePodozrit: {
    isChecked: false
  },
  vpechatlenieDistancia: {
    isChecked: false
  },
  vpechatlenieNavyazchiv: {
    isChecked: false
  },
  vpechatlenieDurash: {
    isChecked: false
  },
  vpechatlenieProtivorechia: {
    isChecked: false
  },
  vpechatlenieNeraskryvaet: {
    isChecked: false
  },
  vpechatlenieLucshe: {
    isChecked: false
  },
  vpechatlenieGordost: {
    isChecked: false
  },
  vpechatlenieKoketstvo: {
    isChecked: false
  },
  vpechatlenieDissimulacia: {
    isChecked: false
  },
  sostoyanieText: {
    text: ""
  },
  kritika: {
    number: 0
  },
  kritikaText: {
    text: ""
  }
};

export default store;
