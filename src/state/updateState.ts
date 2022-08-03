import { GlobalState } from 'little-state-machine';

export function updateJSONData(state: GlobalState, payload: any): GlobalState {
  return {
    ...state,
    JSONData: payload,
  };
}
