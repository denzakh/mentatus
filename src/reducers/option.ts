import type { OptionState } from "../types/status";

const initialState: OptionState = {
  name: "Аноним",
  activePageName: "Status"
};

export default function option(state: OptionState = initialState): OptionState {
  return state;
}
