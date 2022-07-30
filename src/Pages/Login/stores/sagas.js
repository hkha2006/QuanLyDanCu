import { takeLatest, put, call, all } from "redux-saga/effects";
import { LOGIN_REQUEST } from "./constants";
import { loginRequestService } from "../../../Services/residentServices"
import { saveInfoLoginAction, setLoading } from "./actions";

function* loginRequestSaga({ payload }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(loginRequestService, payload.values);
    yield all([
      put(setLoading(false)),
      put(saveInfoLoginAction(respone.data.result)),
    ]);
    if (respone) {
      payload.navigate("/administrator/users");
    }
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* requestLogin() {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
}