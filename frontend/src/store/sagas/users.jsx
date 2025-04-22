import { takeEvery, call, put } from "redux-saga/effects";
import {
  ADD_USER,
  deleteUserFailedAction,
  deleteUserSuccessfulAction,
  DELETE_USER,
  LOGIN,
  loginFailedAction,
  loginSuccessfulAction,
  LOGOUT,
  logoutSuccessfulAction,
  userAddedSuccessfullyAction,
  userAddFailedAction,
} from "../actions/users";

const processLoginRequest = async (data) => {
  return fetch("https://lt-management-backend.onrender.com/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res.data;
      }
    })
    .catch(console.log);
};

const processAddUserRequest = async (data, navigate) => {
  return fetch("https://lt-management-backend.onrender.com/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 440) {
          navigate('/sessionExpired');
        } else if (res.status === 401){
          navigate('/notAuthorized');
        } else {
          navigate('/error');
        }
        return {errors: res.status};
      }
    })
    .then((res) => {
      if (res.errors) {
        return res;
      } else {
        return res.message;
      }
    })
    .catch((er) => {
      console.log(er);
      return "Forbidden";
    });
};

const processDelUserRequest = async (data, navigate) => {
  return fetch("https://lt-management-backend.onrender.com/api/users/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        if (res.status === 440) {
          navigate('/sessionExpired');
        } else if (res.status === 401) {
          navigate('/notAuthorized');
        } else {
          navigate('/error');
        }

        return {errors: res.status};
      }
    })
    .then((res) => {
      if (res.errors) {
        return res;
      } else {
        return res.message;
      }
    })
    .catch((err) => {
      console.log(err);
      return "Error Occured";
    });
};

function* loginWorker({ payload }) {
  const res = yield call(processLoginRequest, payload);

  if (res.token) {
    localStorage.setItem("JWT_TOKEN", res.token);
    localStorage.setItem("isAdmin1", res.admin1);
    localStorage.setItem("isAdmin2", res.admin2);
    localStorage.setItem("isAdmin3", res.admin3);  
    localStorage.setItem("isSuperAdmin", res.superAdmin);
    localStorage.setItem("USER_ID", res.userId);
    yield put(
      loginSuccessfulAction(
        res.token,
        res.admin1,
        res.admin2,
        res.admin3,
        res.superAdmin,
        res.userId
      )
    );
  } else {
    yield put(loginFailedAction({ ...res }));
  }
}

export function* loginWatcher() {
  yield takeEvery(LOGIN, loginWorker);
}

function* logoutWorker() {
  localStorage.setItem("JWT_TOKEN", "");
  yield put(logoutSuccessfulAction());
}

export function* logoutWatcher() {
  yield takeEvery(LOGOUT, logoutWorker);
}

export function* addUserWorker({ payload }) {
  const res = yield call(processAddUserRequest, payload.data, payload.navigate);

  if (res.errors) {
    yield put(userAddFailedAction({ user: res }));
  } else {
    yield put(userAddedSuccessfullyAction());
  }
}

export function* addUserWatcher() {
  yield takeEvery(ADD_USER, addUserWorker);
}

function* deleteUserWorker({ payload }) {
  const res = yield call(processDelUserRequest, payload.data, payload.navigate);

  if (res.errors) {
    yield put(deleteUserFailedAction(res));
  } else {
    yield put(deleteUserSuccessfulAction());
  }
}

export function* deleteUserWatcher() {
  yield takeEvery(DELETE_USER, deleteUserWorker);
}
