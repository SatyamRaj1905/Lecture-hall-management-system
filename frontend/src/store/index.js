import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import userReducer from './reducers/users';
import bookingReducer from './reducers/booking';
import roomReducer from './reducers/rooms';
import {
  addUserWatcher,
  deleteUserWatcher,
  loginWatcher,
  logoutWatcher,
} from './sagas/users';
import {
  approveBookingWatcher,
  bookingWatcher,
  deleteBookingWatcher,
  rejectBookingWatcher,
  updateBookingWatcher,
} from './sagas/booking';
import { addRoomWatcher } from './sagas/rooms';

// Combine all sagas into a root saga
function* rootSagas() {
  yield all([
    loginWatcher(),
    logoutWatcher(),
    bookingWatcher(),
    addUserWatcher(),
    deleteUserWatcher(),
    addRoomWatcher(),
    approveBookingWatcher(),
    rejectBookingWatcher(),
    updateBookingWatcher(),
    deleteBookingWatcher(),
  ]);
}

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure store using Redux Toolkit
const store = configureStore({
  reducer: {
    users: userReducer,
    booking: bookingReducer,
    rooms: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks if necessary
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production', // Redux DevTools enabled in non-production
});

// Run saga middleware
sagaMiddleware.run(rootSagas);

export default store;
