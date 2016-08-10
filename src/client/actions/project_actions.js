import axios from 'axios';
import cookie from '../cookieFunction';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const EDIT_PROJECT = 'EDIT_PROJECT';
export const DELETE_PROJECT = 'DELETE_PROJECT';

const PROJECTS =   '/api/projects';
const GITHUB =   '/auth/github';

let username = cookie.getCookie('gh_name');
let company = cookie.getCookie('company');

export function fetchProjects() {
  const request = axios.get(`${PROJECTS}/meta/${username}`)
  return {
    type: FETCH_PROJECTS,
    payload: request
  };
}

export function fetchProject(project_id) {
  const request = axios.get(`${PROJECTS}/${project_id}`)
  return {
    type: FETCH_PROJECT,
    payload: request
  };
}

export function createProject(props) {
  const request = axios.post( PROJECTS,
    { proj_name: props.projectName,
      user_name: username,
      start: props.stdate,
      due: props.ddate
    })
  console.log('props ', props);
  return {
    type: CREATE_PROJECT,
    payload: request
  };
}

export function editProject(props) {
  const request = axios.post( PROJECTS,
    { proj_name: props.projectName,
      user_name: username,
      start: props.stdate,
      due: props.ddate,
      status: props.status
    })
  console.log('props ', props);
  return {
    type: CREATE_PROJECT,
    payload: request
  };
}

export function deleteProject(project_id) {
  console.log('deleting:', project_id);
  const request = axios.delete(`${PROJECTS}/${project_id}`)
    return {
      type: DELETE_PROJECT,
      payload: request
    };
}
