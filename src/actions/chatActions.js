import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadDataSuccess(chatUser) {
  return { type: types.LOADED_USER_CHAT_DATA_SUCCESS, chatUser };
}

export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const getChatUserData = () => async (dispatch) => {
  try {
    dispatch(preLoaderHide());
    const response = await agent.get(`${API.CHAT_USER_ALL}`);
    if (response.data.data.length <= 0) {
      dispatch(loadNotFoundDataSuccess(false));
    } else {
      dispatch(loadNotFoundDataSuccess(true));
    }

    if (response.data.data) {
      dispatch(loadDataSuccess(response.data.data));
      //dispatch(loadPaginationDataSuccess(response.data.pagination));
    }
    dispatch(preLoaderShow());
  } catch (error) {
    dispatch(preLoaderShow());
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const getChatData = () => async (dispatch) => {
  try {
    dispatch(preLoaderShow());
    const response = await agent.get(`${API.CHAT_USER_ALL}`);
    if (response.data.data) {
      dispatch(loadDataSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(preLoaderShow());
  }
};

export function loadChatDataSuccess(chat) {
  return { type: types.LOADED_CHAT_DATA_SUCCESS, chat };
}

export const getChatDetailsData = (room) => async (dispatch) => {
  try {
    const response = await agent.get(`${API.CHAT_USER_DATA}${room}`);
    dispatch(loadChatDataSuccess(response.data.data));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(preLoaderShow());
  }
};

export function loadChatRoomDataSuccess(chatRoom) {
  return { type: types.LOADED_ROOM_CHAT_DATA_SUCCESS, chatRoom };
}

export const getChatRoomDetails = (data) => async (dispatch) => {
  dispatch(loadChatRoomDataSuccess(data));
};

export const getExportChatData = (item, downloadFile) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(`${API.EXPORT_CHAT_DATA}/${item}`);
    if (response.data.data) {
      downloadFile(response.data.data);
    }
    dispatch(toggleNetworkRequestStatus(false));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(toggleNetworkRequestStatus(false));
  }
};
