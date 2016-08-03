import axios from 'axios';
import cookie from '../cookieFunction';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const GITHUB_LOGIN = 'GITHUB_LOGIN';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const DELETE_PROJECT = 'DELETE_PROJECT';


const RESOURCES =  '/api/resources';

const PROJECTS =   '/api/projects';
const GITHUB =   '/auth/github';

let username = cookie.getCookie('gh_name');
let company = cookie.getCookie('company');

export function fetchProjects() {
  const request = axios.get(`${PROJECTS}/${username}`)
  return {
    type: FETCH_PROJECTS,
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

export function fetchResources() {
  const request = axios.get(`${RESOURCES}/${company}`)
  console.log('company ', company);
  return {
    type: FETCH_RESOURCES,
    payload: request
  };
}
  

export function createResource(props) {
  const request = axios.post( RESOURCES, 
    {
      res_name: props.name,
      proj_id: null,
      company: company
    })
  return {
    type: CREATE_RESOURCE,
    payload: request
  };
}

export function githubLogin() {
  const request = axios.get(GITHUB);
  return {
    type: GITHUB_LOGIN,
    payload: request
  };
}  

export function deleteResource(res_id) {
  console.log('deleting resource:', res_id);
  const request = axios.delete(`${RESOURCES}/${res_id}`)
    return {
      type: DELETE_RESOURCE,
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


