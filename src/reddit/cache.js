import { forEachObjIndexed, flip } from 'ramda';

export const save = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const load = key =>
  window.localStorage.getItem(key);

export const saveAuth = (data) => {
  forEachObjIndexed(flip(save), data);
  return data;
};

export const saveUser = (user) => {
  if (user.name) {
    save('name', user.name);
  }
  return user;
};

export const loadAuthAndUser = () => {
  const keys = ['access_token', 'refresh_token', 'expires_at', 'name'];
  const data = {};
  keys.forEach((key) => {
    data[key] = load(key);
  });
  return data;
};

const cache = {
  save,
  load,
  saveAuth,
  saveUser,
  loadAuthAndUser,
};

export default cache;
