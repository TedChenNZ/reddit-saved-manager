import { clone, forEachObjIndexed, flip } from 'ramda';

export const save = (key, value) => {
  window.localStorage.setItem(key, value);
};

export const load = key =>
  window.localStorage.getItem(key);

export const saveAuth = (resp) => {
  const data = clone(resp);
  const secToMilli = 1000;
  data.expires_at = Date.now() + (resp.expires_in * secToMilli);
  delete data.expires_in;
  forEachObjIndexed(flip(save), data);
  return data;
};

export const saveUser = (user) => {
  save('name', user.name);
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
