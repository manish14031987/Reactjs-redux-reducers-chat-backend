import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadDataSuccess(boostRequest) {
  return { type: types.LOADED_BOOST_DATA_SUCCESS, boostRequest };
}

export function loadNotFoundDataSuccess(isData) {
  return { type: types.LOADED_DATA_SUCCESS, isData };
}
export function loadPaginationDataSuccess(pagination) {
  return { type: types.LOAD_PAGINATION_DATA_SUCCESS, pagination };
}
export function loadOrderDataCount(orderCount) {
  return { type: types.LOAD_ORDER_COUNT_DATA, orderCount };
}

export const loadData = (request) => async (dispatch) => {
  try {
    dispatch(preLoaderHide());
    const response = await agent.get(API.LOAD_BOOST_REQUEST, {
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
      dispatch(loadDataSuccess(response.data.data.data.data));
      dispatch(loadPaginationDataSuccess(response.data.data.pagination));
    }
    dispatch(loadOrderDataCount(response.data.data.profitCount));
    dispatch(preLoaderShow());
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
    dispatch(preLoaderShow());
  }
};
