import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const GITHUB_LOGIN = 'GITHUB_LOGIN';


const RESOURCES =  '/api/resources';
const PROJECTS =   '/api/projects';

export function fetchProjects() {
  const request = axios.get(`${PROJECTS}`)//more
  return {
    type: FETCH_PROJECTS,
    payload: request
  };
}

export function createProject(props) {
  const request = axios.post(`${PROJECTS}`)//more
  return {
    type: CREATE_PROJECT,
    payload: request
  };
}

export function fetchResources() {
  const request = axios.get(`${RESOURCES}`)//more
  return {
    type: FETCH_RESOURCES,
    payload: request
  };
}
  

export function createResource(props) {
  const request = axios.post(`${RESOURCES}`)//more
  return {
    type: CREATE_RESOURCE,
    payload: request
  };
}
  
