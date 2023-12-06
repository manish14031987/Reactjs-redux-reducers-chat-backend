import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadDataSuccess(bannerList) {
  return { type: types.LOADED_BANNER_DATA_SUCCESS, bannerList };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    dispatch(preLoaderHide());
    const response = await agent.get(API.LOAD_BANNER, {
      params: request,
    });
    if (response.data.data.data.length <= 0) {
      dispatch(loadNotFoundDataSuccess(false));
    } else {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (Object.keys(request).length !== 0) {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (response.data.data.data) {
      dispatch(loadDataSuccess(response.data.data.data));
      dispatch(loadPaginationDataSuccess(response.data.data.pagination));
    }
    dispatch(preLoaderShow());
  } catch (error) {
    dispatch(preLoaderShow());
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const submitBannerData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_BANNER, params);
      goToPreviousPath();
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };

export const createBannerData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.LOAD_BANNER, params);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      goToPreviousPath();
    } catch (error) {
      dispatch(loadToasterData(error.message, "error", true));
      dispatch(submittingRequestStatus(false));
    }
  };

export const updateBannerData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_BANNER + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteBannerData = (params) => async (dispatch) => {
  try {
    var response = await agent.delete(API.LOAD_BANNER + "?id=" + params);
    loadData({})(dispatch);
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};
