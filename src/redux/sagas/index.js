import { all } from "redux-saga/effects";
import * as loginSagas from "../../Pages/Login/stores/sagas"
import * as userSagas from "../../Pages/Users/stores/sagas"

// eslint-disable-next-line import/no-anonymous-default-export
export default function* () {
    yield all([
        loginSagas.requestLogin(),
        userSagas.listUserSaga()
    ])
}
