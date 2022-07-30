import { SET_LOADING, GET_ALL_USER, SAVE_ALL_USER, CREATE_USER, GET_ALL_ROLES, SAVE_ALL_ROLES, GET_ALL_ROOM, SAVE_ALL_ROOM, DELETE_USER } from "./constants"

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload
    }
}

export const getAllUser = (payload) => {
    return {
        type: GET_ALL_USER,
        payload
    }
}

export const saveAllUser = (payload) => {
    return {
        type: SAVE_ALL_USER,
        payload
    }
}

export const createUser = (payload, resolve) => {
    return {
        type: CREATE_USER,
        payload,
        resolve
    }
}

export function asyncCreateUser(dispatch) {
    return function returnAsync(payload) {
        return new Promise((resolve) => dispatch(createUser(payload, resolve)))
    }
}

export const getAllRoles = (payload) => {
    return {
        type: GET_ALL_ROLES,
        payload
    }
}

export function asyncGetDetailRoles(dispatch) {
    return function returnAsync(payload) {
        return new Promise((resolve) =>
            dispatch(getAllRoles(payload, resolve))
        );
    };
}

export const saveAllRoles = (payload) => {
    return {
        type: SAVE_ALL_ROLES,
        payload,
    };
};

export const getAllRoom = (payload) => {
    return {
        type: GET_ALL_ROOM,
        payload
    }
}
export function asyncGetDetailRoom(dispatch) {
    return function returnAsync(payload) {
        return new Promise((resolve) =>
            dispatch(getAllRoom(payload, resolve))
        );
    };
}

export const saveAllRooms = (payload) => {
    return {
        type: SAVE_ALL_ROOM,
        payload,
    };
};

export const deleteUser = (payload, resolve) => {
    return {
        type: DELETE_USER,
        payload,
        resolve,
    }
}
export function asyncDeleteUser(dispatch) {
    return function returnAsync(payload) {
        return new Promise((resolve) => dispatch(deleteUser(payload, resolve)))
    }
}