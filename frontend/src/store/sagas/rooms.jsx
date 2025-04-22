import { takeEvery, call, put } from "redux-saga/effects";
import { addRoomFailedAction, addRoomSuccessAction, ADD_ROOM } from "../actions/rooms";

const processAddRoomReq = async (data, navigate) => {
  return fetch('https://lt-management-backend.onrender.com/api/rooms/addRoom', {
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
        } else if (res.status === 401) {
          navigate('/notAuthorized');
        } else {
          navigate('/error');
        }

        return {errors: res.status};
      }
    })
    .then(res => {
      if (res.errors) {
        return res;
      } else {
        return res.message;
      }
    })
    .catch((e) => {
      console.log(e);
      return {
        errors: "Something went wrong",
      };
    });
};

function* addRoomWorker({ payload }) {
  const res = yield call(processAddRoomReq, payload.data, payload.navigate);

  if (res.errors) {
    yield put(addRoomFailedAction(res));
  } else {
    yield put(addRoomSuccessAction());
  }
}

export function* addRoomWatcher() {
  yield takeEvery(ADD_ROOM, addRoomWorker);
}