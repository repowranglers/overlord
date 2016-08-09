import axios from 'axios';
import cookie from '../cookieFunction';

export const GITHUB_LOGIN = 'GITHUB_LOGIN';

const GITHUB =   '/auth/github';

let username = cookie.getCookie('gh_name');
let company = cookie.getCookie('company');

export function githubLogin() {
  const request = axios.get(GITHUB);
  return {
    type: GITHUB_LOGIN,
    payload: request
  };
}
