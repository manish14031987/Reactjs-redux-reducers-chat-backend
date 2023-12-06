import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadDataSuccess(categoryList) {
  return { type: types.LOADED_CATEGORY_DATA_SUCCESS, categoryList };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}

export const loadData = (request) => async (dispatch) => {
  try {
    dispatch(preLoaderHide());
    const response = await agent.get(API.LOAD_CATEGORY, {
      params: request,
    });

    if (response.data.data.length <= 0) {
      dispatch(loadNotFoundDataSuccess(false));
    } else {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (Object.keys(request).length !== 0) {
      dispatch(loadNotFoundDataSuccess(true));
    }
    if (response.data.data) {
      dispatch(loadDataSuccess(response.data.data));
    }
    dispatch(preLoaderShow());
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
    dispatch(preLoaderShow());
  }
};

export const submitCategory =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_CATEGORY, params);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      goToPreviousPath();
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };

export const createCategory =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.LOAD_CATEGORY, params);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      goToPreviousPath();
    } catch (error) {
      dispatch(loadToasterData(error.message, "error", true));
      dispatch(submittingRequestStatus(false));
    }
  };

export const updateCategory = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_CATEGORY + "?id=" + params._id + "&status=" + status,
      params
    );
    if (params.children.length > 0) {
      loadData({ type: 1 })(dispatch);
    }
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteCategory = (params) => async (dispatch) => {
  try {
    const response = await agent.delete(API.LOAD_CATEGORY + "?id=" + params);
    dispatch(loadToasterData(response.data.message, "success", true));
    loadData({})(dispatch);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const loadSelectCategory = () => async (dispatch) => {
  try {
    const request = {};
    request.depth = 1;
    const response = await agent.get(API.LOAD_CATEGORY, {
      params: request,
    });
    dispatch(loadDataSuccess(response.data.data));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export function loadSubCategoryData(subCategoryList) {
  return { type: types.LOADED_SUBCATEGORY_DATA_SUCCESS, subCategoryList };
}

export const loadSubCategory = () => async (dispatch) => {
  try {
    const response = await agent.get(API.LOAD_CATEGORY_SUBCATEGORY);
    dispatch(loadSubCategoryData(response.data.data));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};
