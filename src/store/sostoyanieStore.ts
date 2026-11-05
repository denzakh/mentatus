import type { StatusSection } from "../types/status";

import { todayIso } from "../lib/text/date";

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
    text: todayIso()
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
} satisfies StatusSection;

export default store;
