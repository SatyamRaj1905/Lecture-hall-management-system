import {
  APPROVE_BOOKING_FAILED,
  APPROVE_BOOKING_SUCCESSFUL,
  BOOKING_RESET,
  BOOKING_SUCCESSFUL,
  BOOKING_UNSUCCESSFUL,
  REJECT_BOOKING_FAILED,
  REJECT_BOOKING_SUCCESSFUL,
  UPDATE_BOOKING_FAILED,
  UPDATE_BOOKING_SUCCESSFUL,
  DELETE_BOOKING_FAILED,
  DELETE_BOOKING_SUCCESSFUL,
} from "../actions/booking";

const initialState = {
  booked: null,
  approved: null,
  rejected: null,
  updated: null,
  deleted: null,
  errors: {},
  rejectErrors: {},
  approveErrors: {},
  updateErrors: {},
  deleteErrors: {},
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_SUCCESSFUL:
      return {
        ...state,
        booked: action.payload.data,
        errors: {},
      };
    case BOOKING_UNSUCCESSFUL:
      return {
        ...state,
        booked: false,
        errors: {
          ...action.payload.errors,
        },
      };
    case BOOKING_RESET:
      return initialState;
    case APPROVE_BOOKING_FAILED:
      return {
        ...state,
        approved: false,
        approveErrors: action.payload,
      };
    case APPROVE_BOOKING_SUCCESSFUL:
      return {
        ...state,
        approved: true,
        approveErrors: {},
      };
    case REJECT_BOOKING_SUCCESSFUL:
      return {
        ...state,
        rejected: true,
        rejectErrors: {},
      };
    case REJECT_BOOKING_FAILED:
      return {
        ...state,
        rejected: false,
        rejectErrors: action.payload,
      };
    case UPDATE_BOOKING_SUCCESSFUL:
      return {
        ...state,
        updated: true,
        updateErrors: {},
      };
    case UPDATE_BOOKING_FAILED:
      return {
        ...state,
        updated: false,
        updateErrors: action.payload,
      };
    case DELETE_BOOKING_SUCCESSFUL:
      return {
        ...state,
        deleted: true,
        deleteErrors: {},
      };
    case DELETE_BOOKING_FAILED:
      return {
        ...state,
        deleted: false,
        deleteErrors: action.payload,
      };
    default:
      return state;
  }
};

export default BookingReducer;
