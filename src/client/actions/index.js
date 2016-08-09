import axios from 'axios';
import cookie from '../cookieFunction';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const EDIT_PROJECT = 'EDIT_PROJECT'
export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const GITHUB_LOGIN = 'GITHUB_LOGIN';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const DELETE_PROJECT = 'DELETE_PROJECT';
export const ASSIGN_RESOURCE = 'ASSIGN_RESOURCE';
export const DELETE_STORY = 'DELETE_STORY';
export const CREATE_STORY = 'CREATE_STORY';
export const FETCH_STORIES = 'FETCH_STORIES';
export const UPDATE_STATUS = 'UPDATE_STATUS';

const RESOURCES =  '/api/resources';
const STORIES = '/api/stories';
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

export function assignResource(res_id, project_id) {
  const request = axios.patch(`${RESOURCES}/project/${res_id}`,
    {
      proj_id: project_id
    })
  return {
    type: ASSIGN_RESOURCE,
    payload: request
  };
}

export function createUserStory(props) {
  const request = axios.post(STORIES, 
  {
    title: props.title,
    proj_id: props.proj_id,
    description: props.description,
    status: props.status
    })
  console.log('story props: ', props)
  return {
    type: CREATE_STORY,
    payload: request
  };
}

export function fetchUserStories(proj_id) {
  const request = axios.get(`${STORIES}/${proj_id}`)
  return {
    type: FETCH_STORIES,
    payload: request
  };
}

export function deleteStory(story_id) {
  const request = axios.delete(`${STORIES}/${story_id}`)
  return {
    type: DELETE_STORY,
    payload: request
  };
}

export function updateStatus(story_id) {
  const request = axios.patch(`${STORIES}/${story_id}`,
  {
    status: status
  })
  return {
    type: UPDATE_STATUS,
    payload: request
  };
}




