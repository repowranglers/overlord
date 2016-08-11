import axios from 'axios';
import cookie from '../cookieFunction';

export const FETCH_RESOURCES = 'FETCH_RESOURCES';
export const CREATE_RESOURCE = 'CREATE_RESOURCE';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const ASSIGN_RESOURCE = 'ASSIGN_RESOURCE';

const RESOURCES =  '/api/resources';
const GITHUB =   '/auth/github';

let username = cookie.getCookie('gh_name');
let company = cookie.getCookie('company');

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
      proj_id: 0,
      company: company
    })
  return {
    type: CREATE_RESOURCE,
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
