import { takeLatest, put, call, all } from "redux-saga/effects"
import { GET_ALL_USER, CREATE_USER, GET_ALL_ROLES, GET_ALL_ROOM, DELETE_USER } from "./constants"
import { saveAllUser, setLoading, saveAllRoles, saveAllRooms } from "./actions"
import { getAllUserApi, createUserApi, getAllRolesApi, getAllRoomApi, deleteUserApi } from "../../../Services/residentServices"

function* getAllUserSaga({ payload }) {
  try {
    yield put(setLoading(true))
    const response = yield call(getAllUserApi, payload)
    yield all([put(setLoading(false)), put(saveAllUser(response.data.result.data))]);

  } catch (error) {
    console.log(error)
    yield put(setLoading(false))
  }

}

function* createUserSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const response = yield call(createUserApi, payload)
    resolve(response)
    yield all([put(setLoading(false))])
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

function* getRolesSaga({ payload }) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAllRolesApi, payload);
    yield put(saveAllRoles(response.data.result.data));
    //   console.log(response.data.result.data);
  } catch (error) {
    // resolve(false);
    yield put(setLoading(false));
  }

}
function* getRoomSaga({ payload }) {
  try {
    yield put(setLoading(true));
    const response = yield call(getAllRoomApi, payload);
    yield put(saveAllRooms(response.data.result.data));
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* deleteUserSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true))
    const response = yield call(deleteUserApi, payload)
    resolve(response)
    yield put(setLoading(false))
  } catch (error) {
    resolve(false)
    yield put(setLoading(false))
  }
}

export function* listUserSaga() {
  yield takeLatest(GET_ALL_USER, getAllUserSaga)
  yield takeLatest(CREATE_USER, createUserSaga)
  yield takeLatest(GET_ALL_ROLES, getRolesSaga)
  yield takeLatest(GET_ALL_ROOM, getRoomSaga)
  yield takeLatest(DELETE_USER, deleteUserSaga)
}

