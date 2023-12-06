import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";
import submittingRequestStatus from "./submittingRequestStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";

export function loadDataSuccess(cashOutData) {
  return { type: types.LOADED_CASH_OUT_DATA_SUCCESS, cashOutData };
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
    const response = await agent.get(API.LOAD_CASH_OUT_REQUEST, {
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
      dispatch(loadPaginationDataSuccess(response.data.data.data.pagination));
    }
    dispatch(loadOrderDataCount(response.data.data.cashRequest));
    dispatch(preLoaderShow());
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
    dispatch(preLoaderShow());
  }
};

export const addNoteData =
  (params, handleModalNoteClick) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.ADD_CASH_OUT_NOTE, params);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      handleModalNoteClick();
      loadData({})(dispatch);
    } catch (error) {
      dispatch(loadToasterData(error.message, "error", true));
      dispatch(submittingRequestStatus(false));
    }
  };

export const ImportData = (request) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.EXPORT_CASH_OUT_REQUEST, {
      params: request,
    });

    var fileUrl = response.data.data;
    var filename = fileUrl.split("/").pop();
    fetch(fileUrl, {
      method: "GET",
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", filename); //or any other extension
          document.body.appendChild(link);
          link.click();
          dispatch(toggleNetworkRequestStatus(false));
          dispatch(loadToasterData(response.data.message, "success", true));
        });
      })
      .catch((err) => {
        dispatch(toggleNetworkRequestStatus(false));
        dispatch(loadToasterData(response.data.message, "error", true));
      });
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(toggleNetworkRequestStatus(false));
  }
};

export const uploadImportData =
  (params, handleModalImportClick) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(
        API.IMPORT_CASH_OUT_DATA_REQUEST,
        params
      );
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      handleModalImportClick();
      loadData({})(dispatch);
    } catch (error) {
      dispatch(loadToasterData(error.message, "error", true));
      dispatch(submittingRequestStatus(false));
    }
  };

export const updateStatus = (data) => async (dispatch) => {
  try {
    dispatch(loadDataSuccess(data));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const updateCashOutStatus = (params) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.post(API.STATUS_CASH_OUT_DATA_REQUEST, params);
    dispatch(toggleNetworkRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    loadData({})(dispatch);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(toggleNetworkRequestStatus(false));
  }
};
