import * as types from "./actionsTypes";

// action creator
const dialogStatusAction = (dialogOpen) => ({
  type: types.LOADED_DIALOG_OPEN_SUCCESS,
  dialogOpen,
});

export default dialogStatusAction;
