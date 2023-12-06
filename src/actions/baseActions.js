import * as types from "./actionsTypes";
import toasterStatusAction from "./toasterStatusAction";
import dialogStatusAction from "./dialogStatusAction";
import preLoaderAction from "./preLoaderAction";

export function loadHeadSuccess(isHead) {
  return { type: types.TABLE_HEAD_REQUEST_STATUS, isHead };
}

export function loadPathSuccess(pathName) {
  return { type: types.LOAD_PATH_NAME, pathName };
}

export const loadTableHeader = (params) => async (dispatch) => {
  try {
    dispatch(loadHeadSuccess(params));
  } catch (error) {
    throw error;
  }
};

export const loadPathName = (name) => async (dispatch) => {
  try {
    dispatch(loadPathSuccess(name));
  } catch (error) {
    throw error;
  }
};

export const loadToasterData = (title, error, show) => async (dispatch) => {
  try {
    dispatch(
      toasterStatusAction({
        open: show,
        message: title,
        severity: error,
      })
    );
  } catch (error) {
    throw error;
  }
};

export const loadToasterClose = (toaster) => async (dispatch) => {
  try {
    dispatch(
      toasterStatusAction({
        open: false,
        message: toaster.message,
        severity: toaster.severity,
      })
    );
  } catch (error) {
    throw error;
  }
};

export const loadDialogData = (data) => async (dispatch) => {
  try {
    dispatch(dialogStatusAction(data));
  } catch (error) {
    throw error;
  }
};

export function loadRequestDataSuccess(requestParams) {
  return { type: types.LOADED_REQUEST_DATA_SUCCESS, requestParams };
}

export const loadRequestData = (name) => async (dispatch) => {
  try {
    dispatch(loadRequestDataSuccess(name));
  } catch (error) {
    throw error;
  }
};

export const preLoaderHide = () => async (dispatch) => {
  try {
    dispatch(preLoaderAction(false));
  } catch (error) {
    throw error;
  }
};

export const preLoaderShow = () => async (dispatch) => {
  try {
    setTimeout(function () {
      dispatch(preLoaderAction(true));
    }, 300);
  } catch (error) {
    throw error;
  }
};
export function loadpopSuccess(formPop) {
  return { type: types.LOAD_FORM_POP, formPop };
}

export const loadFormPop = (params) => async (dispatch) => {
  try {
    dispatch(loadpopSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function LoadRtlSuccess(isRtl) {
  return { type: types.LOADED_RTL_SUCCESS, isRtl };
}

export const setRtl = (params) => async (dispatch) => {
  try {
    dispatch(LoadRtlSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function LoadLanguageSuccess(language) {
  return { type: types.LOADED_LANGUAGE_SUCCESS, language };
}

export const setLanguage = (params) => async (dispatch) => {
  try {
    dispatch(LoadLanguageSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadSelectDataSuccess(userSelectData) {
  return { type: types.LOADED_USER_SELECT_SUCCESS, userSelectData };
}

export const loadSelectData = (params) => async (dispatch) => {
  try {
    dispatch(loadSelectDataSuccess(params));
  } catch (error) {
    throw error;
  }
};

export function loadDataSuccess(responseData) {
  return { type: types.LOADED_RESPONSE_DATA_SUCCESS, responseData };
}

export const loadDataResponse = (name) => async (dispatch) => {
  try {
    dispatch(loadDataSuccess(name));
  } catch (error) {
    throw error;
  }
};
