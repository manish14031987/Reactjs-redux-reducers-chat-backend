import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";
import submittingRequestStatus from "./submittingRequestStatusAction";

export function loadPageDataSuccess(commissionData) {
  return { type: types.LOADED_COMMISSION_DATA, commissionData };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export function loadNotDataSuccess(isLoad) {
  return { type: types.LOAD_REQUEST_STATUS, isLoad };
}

export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}

export const loadData = (request) => async (dispatch) => {
  try {
    dispatch(preLoaderHide());
    const response = await agent.get(API.LOAD_COMMISSION, {
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
      dispatch(loadPageDataSuccess(response.data.data.data));
      dispatch(loadPaginationDataSuccess(response.data.data.pagination));
    }
    dispatch(preLoaderShow());
  } catch (error) {
    dispatch(preLoaderShow());
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const submitCommissionData = (params, push) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.put(API.LOAD_COMMISSION, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    push("/subscription");
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const createCommissionData = (params, push) => async (dispatch) => {
  //console.log(params);
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_COMMISSION, params);
    dispatch(submittingRequestStatus(false));
    loadData({ type: true })(dispatch);
    dispatch(loadToasterData(response.data.message, "success", true));
    push("/subscription");
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(submittingRequestStatus(false));
  }
};
export const updateSubscriptionData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_COMMISSION + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteCommissionData = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_COMMISSION + "?id=" + params);
    dispatch(loadToasterData(response.data.message, "success", true));
    loadData({})(dispatch);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};
