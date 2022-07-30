import produce from "immer"
import { SAVE_ALL_USER, SET_LOADING, SAVE_ALL_ROLES, SAVE_ALL_ROOM } from "./constants"
import { INIT_STATE_USER } from "./state"

export default function userReducers(state = INIT_STATE_USER, action) {
    return produce(state, draf => {
        switch (action.type) {
            case SET_LOADING:
                draf.isLoading = action.payload
                break
            case SAVE_ALL_USER:
                draf.listUser.data = action.payload
                break
            case SAVE_ALL_ROLES:
                draf.dataRoles = action.payload
                break
            case SAVE_ALL_ROOM:
                draf.dataRooms = action.payload
                break
            default:
                break;
        }
    })
}