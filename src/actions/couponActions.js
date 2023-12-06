import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadDataSuccess(couponData) {
  return { type: types.LOADED_COUPON_DATA_SUCCESS, couponData };
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
    const response = await agent.get(API.LOAD_COUPON, {
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
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
    dispatch(preLoaderShow());
  }
};

export const submitCoupon = (params, goToPreviousPath) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.put(API.LOAD_COUPON, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    goToPreviousPath();
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const createCoupon = (params, goToPreviousPath) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_COUPON, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    goToPreviousPath();
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(submittingRequestStatus(false));
  }
};

export const updateCoupon = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_COUPON + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteCoupon = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_COUPON + "?id=" + params);
    dispatch(loadToasterData(response.data.message, "success", true));
    loadData({})(dispatch);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

/* Get Coupon Edit Data*/
export const getCouponData = (item, setEditData) => async (dispatch) => {
  try {
    const response = await agent.get(`${API.LOAD_COUPON_EDIT}?id=${item._id}`);
    setEditData(response.data.data);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};
/* Get Coupon Edit Data */
