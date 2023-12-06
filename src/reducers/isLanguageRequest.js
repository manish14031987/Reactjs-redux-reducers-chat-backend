import * as types from "../actions/actionsTypes";
import initialState from "./initialState";

export default function isLanguageRequest(
  state = initialState.language,
  action
) {
  switch (action.type) {
    case types.LOADED_LANGUAGE_SUCCESS:
      return action.language;
    default:
      return state;
  }
}
