import { ADD_ROOM, ADD_ROOM_FAILED, ADD_ROOM_SUCCESS } from "../actions/rooms";

const initialState = {
  added: false,
  addErrors: {},
};

const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROOM:
      return {
        ...state,
        addErrors: false,
      };
    case ADD_ROOM_FAILED:
      return {
        ...state,
        added: false,
        addErrors: {
          ...action.payload
        }
      };
    case ADD_ROOM_SUCCESS:
      return {
        ...state,
        added: true,
        addErrors: {}
      };
    default:
      return state;
  }
};

export default RoomReducer;