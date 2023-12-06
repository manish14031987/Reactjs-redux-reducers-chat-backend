import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadDataSuccess(brandData) {
  return { type: types.LOADED_BRAND_DATA_SUCCESS, brandData };
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
    const response = await agent.get(API.LOAD_BRAND, {
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

export const submitBrand = (params, goToPreviousPath) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.put(API.LOAD_BRAND, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    goToPreviousPath();
  } catch (error) {
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const createBrand = (params, goToPreviousPath) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.LOAD_BRAND, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    goToPreviousPath();
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(submittingRequestStatus(false));
  }
};

export const updateBrand = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_BRAND + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteBrand = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_BRAND + "?id=" + params);
    dispatch(loadToasterData(response.data.message, "success", true));
    loadData({})(dispatch);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export function loadBrandData(brandList) {
  return { type: types.LOADED_BRAND_LISTING_DATA_SUCCESS, brandList };
}

export const loadBrandListing = () => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_BRAND_LISTING);
    dispatch(loadBrandData(response.data.data));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

/* Get Brand Edit Data*/
export const getBrandData = (item, setEditData) => async (dispatch) => {
  try {
    const response = await agent.get(`${API.GET_EDIT_BRAND}?id=${item._id}`);
    setEditData(response.data.data);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};
/* Get Brand Edit Data */
