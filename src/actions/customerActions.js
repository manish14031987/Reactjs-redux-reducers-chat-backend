import * as types from "./actionsTypes";
import { agent } from "../utils/agent";
import * as API from "../utils/apiPath";
import submittingRequestStatus from "./submittingRequestStatusAction";
import toggleNetworkRequestStatus from "./toggleNetworkRequestStatus";
import { loadToasterData, preLoaderHide, preLoaderShow } from "./baseActions";

export function loadDataSuccess(customerData) {
  return { type: types.LOADED_CUSTOMER_DATA_SUCCESS, customerData };
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
    const response = await agent.get(API.LOAD_CUSTOMER, {
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

export const submitCustomerData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_CUSTOMER, params);
      goToPreviousPath();
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };

export const updatePasswordData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.put(API.LOAD_CUSTOMER_PASSWORD, params);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      goToPreviousPath();
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };

export const createCustomerData =
  (params, goToPreviousPath) => async (dispatch) => {
    try {
      dispatch(submittingRequestStatus(true));
      const response = await agent.post(API.LOAD_CUSTOMER, params);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      goToPreviousPath();
    } catch (error) {
      dispatch(loadToasterData(error.message, "error", true));
      dispatch(submittingRequestStatus(false));
    }
  };

export const updateCustomerData = (params) => async (dispatch) => {
  try {
    const status = params.status === true ? 1 : 0;
    const response = await agent.patch(
      API.LOAD_CUSTOMER + "?id=" + params._id + "&status=" + status,
      params
    );
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteCustomerData = (params) => async (dispatch) => {
  try {
    var response = await agent.delete(API.LOAD_CUSTOMER + "?id=" + params);
    loadData({})(dispatch);
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const getUserProfile = (request, setEditData) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(API.LOAD_CUSTOMER_PUBLIC_PROFILE, {
      params: request,
    });
    setEditData(response.data.data);
    dispatch(toggleNetworkRequestStatus(false));
  } catch (error) {
    dispatch(toggleNetworkRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const getWalletData = (request, setWalletData) => async (dispatch) => {
  try {
    dispatch(toggleNetworkRequestStatus(true));
    const response = await agent.get(`${API.LOAD_CUSTOMER}/wallet`, {
      params: request,
    });
    setWalletData(response.data.data);
    dispatch(toggleNetworkRequestStatus(false));
  } catch (error) {
    dispatch(toggleNetworkRequestStatus(false));
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const security = (params) => async (dispatch) => {
  try {
    var response = await agent.get(
      API.SEND_SECURITY_ALERT_USER + "?id=" + params
    );
    loadData({})(dispatch);
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const addNotes = (params, returnSuccess) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.ADD_NOTES, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    returnSuccess(response.data.message);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(submittingRequestStatus(false));
  }
};

export const loadNotesData = (params, returnNotes) => async (dispatch) => {
  try {
    var response = await agent.get(API.GET_NOTES + "?id=" + params.id);
    dispatch(submittingRequestStatus(false));
    returnNotes(response.data.data);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};

export const deleteNotes =
  (params, returnSuccessDelete) => async (dispatch) => {
    try {
      var response = await agent.get(API.DELETE_NOTES + "?id=" + params.id);
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(response.data.message, "success", true));
      returnSuccessDelete(response.data.message);
    } catch (error) {
      dispatch(submittingRequestStatus(false));
      dispatch(loadToasterData(error.message, "error", true));
    }
  };
export const getCustomerData = () => async (dispatch) => {
  try {
    const response = await agent.get(`${API.LOAD_CUSTOMER}/list`);
    if (response.data.data) {
      dispatch(loadDataSuccess(response.data.data));
    }
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export function loadConditionalDataSuccess(conditionalData) {
  return { type: types.LOADED_CONDITIONAL_DATA_SUCCESS, conditionalData };
}

export const getConditionalData = () => async (dispatch) => {
  try {
    const response = await agent.get(`${API.LOAD_CONDITIONAL}`);
    dispatch(loadConditionalDataSuccess(response.data.data));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(loadNotFoundDataSuccess(false));
  }
};

export const addWalletBalance = (params, returnSuccess) => async (dispatch) => {
  try {
    dispatch(submittingRequestStatus(true));
    const response = await agent.post(API.ADD_WALLET, params);
    dispatch(submittingRequestStatus(false));
    dispatch(loadToasterData(response.data.message, "success", true));
    returnSuccess(response.data.message);
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
    dispatch(submittingRequestStatus(false));
  }
};

export const updateUserStatus = (params) => async (dispatch) => {
  try {
    const response = await agent.post(API.USER_STATUS_UPDATE, params);
    dispatch(loadToasterData(response.data.message, "success", true));
  } catch (error) {
    dispatch(loadToasterData(error.message, "error", true));
  }
};
