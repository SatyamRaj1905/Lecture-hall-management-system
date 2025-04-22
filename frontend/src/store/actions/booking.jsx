export const BOOKING_SUCCESSFUL = "BOOKING_SUCCESSFUL";
export const BOOKING = "BOOKING";
export const BOOKING_UNSUCCESSFUL = "BOOKING_UNSUCCESSFUL";
export const BOOKING_RESET = "BOOKING_RESET";
export const APPROVE_BOOKING = "APPROVE_BOOKING";
export const APPROVE_BOOKING_FAILED = "APPROVE_BOOKING_FAILED";
export const APPROVE_BOOKING_SUCCESSFUL = "APPROVE_BOOKING_SUCCESSFUL";
export const REJECT_BOOKING = "REJECT_BOOOKING";
export const REJECT_BOOKING_FAILED = "REJECT_BOOKING_FAILED";
export const REJECT_BOOKING_SUCCESSFUL = "REJECT_BOOKING_SUCCESSFUL";
export const UPDATE_BOOKING = "UPDATE_BOOKING";
export const UPDATE_BOOKING_FAILED = "UPDATE_BOOKING_FAILED";
export const UPDATE_BOOKING_SUCCESSFUL = "UPDATE_BOOKING_SUCCESSFUL";
export const DELETE_BOOKING = "DELETE_BOOKING";
export const DELETE_BOOKING_FAILED = "DELETE_BOOKING_FAILED";
export const DELETE_BOOKING_SUCCESSFUL = "DELETE_BOOKING_SUCCESSFUL";

export const bookingAction = (payload) => {
  return {
    type: BOOKING,
    payload,
  };
};

export const bookingSuccessfulAction = (payload) => {
  return {
    type: BOOKING_SUCCESSFUL,
    payload: {
      data: payload
    }
  };
};

export const bookingFailedAction = (errors) => {
  return {
    type: BOOKING_UNSUCCESSFUL,
    payload: {
      errors,
    },
  };
};

export const bookingResetAction = () => {
  return {
    type: BOOKING_RESET,
  };
};

export const approveBookingAction = (payload) => {
  return {
    type: APPROVE_BOOKING,
    payload: {
      data: payload.data,
      navigate: payload.navigate
    }
  };
};

export const approveBookingFailed = (payload) => {
  return {
    type: APPROVE_BOOKING_FAILED,
    payload,
  };
};

export const approveBookingSuccessAction = () => {
  return {
    type: APPROVE_BOOKING_SUCCESSFUL,
  };
};

export const rejectBookingAction = (payload) => {
  return {
    type: REJECT_BOOKING,
    payload,
  };
};

export const rejectBookingFailedAction = (payload) => ({
  type: REJECT_BOOKING_FAILED,
  payload,
});

export const rejectBookingSuccessfulAction = () => ({
  type: REJECT_BOOKING_SUCCESSFUL,
});

export const updateBookingAction = (payload) => {
  return {
    type: UPDATE_BOOKING,
    payload,
  };
};

export const updateBookingFailedAction = (payload) => ({
  type: UPDATE_BOOKING_FAILED,
  payload,
});

export const updateBookingSuccessfulAction = () => ({
  type: UPDATE_BOOKING_SUCCESSFUL,
});

export const deleteBookingAction = (payload) => {
  return {
    type: DELETE_BOOKING,
    payload,
  };
};

export const deleteBookingFailedAction = (payload) => ({
  type: DELETE_BOOKING_FAILED,
  payload,
});

export const deleteBookingSuccessfulAction = () => ({
  type: DELETE_BOOKING_SUCCESSFUL,
});
