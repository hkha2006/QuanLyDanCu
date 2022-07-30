import { createSelector } from "reselect"
import { INIT_STATE_USER } from "./state"

const selectMyUserService = (state) => state.userReducers || INIT_STATE_USER

const selectLoading = createSelector(selectMyUserService, (state) => state.isLoading)

const selectUser = createSelector(selectMyUserService, (state) => state.listUser.data)

const selectRole = createSelector(selectMyUserService,(state)=>state.dataRoles)

const selectRoom = createSelector(selectMyUserService,(state)=>state.dataRooms)

export { selectLoading, selectUser, selectRole, selectRoom }