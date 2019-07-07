import generalStore from "../store/generalStore.js";
import zhalobyStore from "../store/zhalobyStore.js";
import anamnezStore from "../store/anamnezStore.js";
import sostoyanieStore from "../store/sostoyanieStore.js";
import affektStore from "../store/affektStore.js";
import rechStore from "../store/rechStore.js";
import kognitStore from "../store/kognitStore.js";
import ppStore from "../store/ppStore.js";
import diagnozStore from "../store/diagnozStore.js";
import rekomendaciiStore from "../store/rekomendaciiStore.js";
import lechenieStore from "../store/lechenieStore.js";

const serverState = {
  ...generalStore,
  ...zhalobyStore,
  ...anamnezStore,
  ...sostoyanieStore,
  ...affektStore,
  ...rechStore,
  ...kognitStore,
  ...ppStore,
  ...diagnozStore,
  ...rekomendaciiStore,
  ...lechenieStore
};

serverState.doctorId = 1;

export default serverState;
