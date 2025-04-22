export const ADD_ROOM = "ADD_ROOM";
export const ADD_ROOM_SUCCESS = "ADD_ROOM_SUCCESS";
export const ADD_ROOM_FAILED = "ADD_ROOM_FAILED";

export const addRoomAction = (payload) => ({
  type: ADD_ROOM,
  payload
});

export const addRoomSuccessAction = () => ({
  type: ADD_ROOM_SUCCESS,
});

export const addRoomFailedAction = (payload) => ({
  type: ADD_ROOM_FAILED,
  payload
});

