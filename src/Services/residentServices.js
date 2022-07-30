import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net";

export function loginRequestService(payload) {
  return request(`${BASE_API}/api/users/authenticate`, {
    method: "POST",
    data: payload,
  });
}

export function getAllUserServices(payload) {
  return request(`${BASE_API}/api/Users/get-all/All`, {
    method: "POST",
    data: payload,
  });
}

export function getAllUserApi(payload) {
  return request(`${BASE_API}/api/Users/get-all/${payload.url}`, {
    method: "POST",
    data: payload.params,
  });
}

export function createUserApi(payload) {
  return request(`${BASE_API}/api/Users/create`, {
    method: "POST",
    data: payload,
  });
}

export function updateUserApi(payload) {
  return request(`${BASE_API}/api/Users/update`, {
    method: "POST",
    data: payload,
  });
}

export function getAllRoomApi(payload) {
  return request(`${BASE_API}/api/Room/get-all`, {
    method: "POST",
    data: payload,
  });
}

export function getAllRolesApi(payload) {
  return request(`${BASE_API}/api/users/get-all-roles`, {
    method: "POST",
    data: payload,
  });
}

export function deleteUserApi(username, payload) {
  return request(`${BASE_API}/api/Users/delete/${username}`, {
    method: "POST",
    data: payload,
  });
}
