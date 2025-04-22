import { takeEvery, call, put, select } from "redux-saga/effects";
import {
  approveBookingFailed,
  approveBookingSuccessAction,
  APPROVE_BOOKING,
  UPDATE_BOOKING,
  BOOKING,
  bookingFailedAction,
  bookingSuccessfulAction,
  rejectBookingFailedAction,
  rejectBookingSuccessfulAction,
  REJECT_BOOKING,
  DELETE_BOOKING,
  deleteBookingFailedAction,
  deleteBookingSuccessfulAction,
} from "../actions/booking";

const processBookingRequest = async (data, navigate, endPoint) => {
  return fetch(`https://lt-management-backend.onrender.com/api/bookings/${endPoint}`, {
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
          navigate("/sessionExpired");
        } else if (res.status === 401) {
          navigate("/notAuthorized");
        } else {
          navigate("/error");
        }

        return { errors: res.status };
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    })
    .catch(console.log);
};

const processBookingApprove = async (data, navigate) => {
  return fetch(`https://lt-management-backend.onrender.com/api/bookings/accept`, {
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
          navigate("/sessionExpired");
        } else if (res.status === 401) {
          navigate("/notAuthorized");
        } else {
          navigate("/error");
        }

        return { errors: res.status };
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    });
};

const processBookingReject = async (data, navigate) => {
  return fetch("https://lt-management-backend.onrender.com/api/bookings/reject", {
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
          navigate("/sessionExpired");
        } else if (res.status === 401) {
          navigate("/notAuthorized");
        } else {
          navigate("/error");
        }

        return { errors: res.status };
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    });
};

const processBookingUpdate = async (data, navigate) => {
  return fetch("https://lt-management-backend.onrender.com/api/bookings/update", {
    method: "PUT",
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
          navigate("/sessionExpired");
        } else if (res.status === 401) {
          navigate("/notAuthorized");
        } else {
          navigate("/error");
        }

        return { errors: res.status };
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    });
};

const processBookingDelete = async (data, navigate, endPoint) => {
  return fetch(`https://lt-management-backend.onrender.com/api/bookings/${endPoint}`, {
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
          navigate("/sessionExpired");
        } else if (res.status === 401) {
          navigate("/notAuthorized");
        } else {
          navigate("/error");
        }

        return { errors: res.status };
      }
    })
    .then((res) => {
      if (res.errors) {
        return res.errors;
      } else {
        return res;
      }
    });
};

function* bookingWorker({ payload }) {
  const isSuperAdmin = yield select(state => state.users.isSuperAdmin);
  const res = yield call(processBookingRequest, payload.data, payload.navigate, isSuperAdmin ? 'bookI' : 'book');

  if (res.message === "success") {
    yield put(bookingSuccessfulAction(res.data.id));
  } else {
    yield put(bookingFailedAction(res));
  }
}

export function* bookingWatcher() {
  yield takeEvery(BOOKING, bookingWorker);
}

function* approveBookingWorker({ payload }) {
  const result = yield call(
    processBookingApprove,
    { bookId: payload.data },
    payload.navigate
  );

  if (result.message === "success") {
    yield put(approveBookingSuccessAction());
  } else {
    yield put(approveBookingFailed(result));
  }
}

export function* approveBookingWatcher() {
  yield takeEvery(APPROVE_BOOKING, approveBookingWorker);
}

function* rejectBookingWorker({ payload }) {
  const result = yield call(
    processBookingReject,
    { bookId: payload.data },
    payload.navigate
  );

  if (result.message === "success") {
    yield put(rejectBookingSuccessfulAction());
  } else {
    yield put(rejectBookingFailedAction(result));
  }
}

export function* rejectBookingWatcher() {
  yield takeEvery(REJECT_BOOKING, rejectBookingWorker);
}

function* updateBookingWorker({ payload }) {
  const result = yield call(
    processBookingUpdate,
    payload.data,
    payload.navigate
  );

  if (result.message === "success") {
    yield put(rejectBookingSuccessfulAction());
  } else {
    yield put(rejectBookingFailedAction(result));
  }
}

export function* updateBookingWatcher() {
  yield takeEvery(UPDATE_BOOKING, updateBookingWorker);
}

function* deleteBookingWorker({ payload }) {
  const sAdmin = yield select(state => state.users.isSuperAdmin);
  const result = yield call(
    processBookingDelete,
    payload.data,
    payload.navigate,
    sAdmin ? 'del' : 'delU'
  );

  if (result.message === "success") {
    yield put(deleteBookingSuccessfulAction());
  } else {
    yield put(deleteBookingFailedAction(result));
  }
}

export function* deleteBookingWatcher() {
  yield takeEvery(DELETE_BOOKING, deleteBookingWorker);
}