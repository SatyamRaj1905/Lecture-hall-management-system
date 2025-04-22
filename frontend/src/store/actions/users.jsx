export const LOGIN = "LOGIN";
export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";
export const LOGIN_UNSUCCESSFUL = "LOGIN_UNSUCCESSFUL";
export const LOGOUT = "LOGOUT";
export const LOGOUT_SUCCESSFUL = "LOGOUT_SUCCESSFUL";
export const ADD_USER = "ADD_USER";
export const USER_ADDED_SUCCESSFULLY = "USER_ADDED_SUCCESSFULLY";
export const USER_ADD_FAILED = "USER_ADD_FAILED";
export const DELETE_USER = "DELETE_USER";
export const DELETE_USER_FAILED = "DELETE_USER_FAILED";
export const DELETE_USER_SUCCESSFUL = "DELETE_USER_SUCCESSFUL";

export const loginAction = (userName, password) => {
  return {
    type: LOGIN,
    payload: {
      userName,
      password,
    },
  };
};

export const loginSuccessfulAction = (token, isAdmin1, isAdmin2, isAdmin3, isSuperAdmin, userId) => {
  return {
    type: LOGIN_SUCCESSFUL,
    payload: {
      token,
      isAdmin1,
      isAdmin2,
      isAdmin3,
      isSuperAdmin,
      userId,
    },
  };
};

export const loginFailedAction = (errors) => {
  return {
    type: LOGIN_UNSUCCESSFUL,
    payload: {
      errors,
    },
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT,
  };
};

export const logoutSuccessfulAction = () => {
  return {
    type: LOGOUT_SUCCESSFUL,
  };
};

export const addUserAction = (payload) => {
  return {
    type: ADD_USER,
    payload,
  };
};

export const userAddedSuccessfullyAction = () => {
  return {
    type: USER_ADDED_SUCCESSFULLY,
  };
};

export const userAddFailedAction = (payload) => {
  return {
    type: USER_ADD_FAILED,
    payload,
  };
};

export const deleteUserAction = (payload) => ({
  type: DELETE_USER,
  payload,
});

export const deleteUserSuccessfulAction = () => ({
  type: DELETE_USER_SUCCESSFUL,
});

export const deleteUserFailedAction = (payload) => ({
  type: DELETE_USER_FAILED,
  payload,
});
