import axios from 'axios';
import cookie from '../cookieFunction';

export const DELETE_STORY = 'DELETE_STORY';
export const CREATE_STORY = 'CREATE_STORY';
export const FETCH_STORIES = 'FETCH_STORIES';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';


const STORIES = '/api/stories';
const GITHUB =   '/auth/github';

let username = cookie.getCookie('gh_name');
let company = cookie.getCookie('company');


export function createUserStory(props) {
  const request = axios.post(STORIES,
  {
    title: props.title,
    proj_id: props.proj_id,
    description: props.description,
    date_completed: props.date_completed
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
  const request = axios.delete(`${STORIES}/config/${story_id}`)
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

export function updateDescription(story_id, description) {
  const request = axios.patch(`${STORIES}/description/${story_id}`,
    {
      description: description
    })
  return {
    type: UPDATE_DESCRIPTION,
    payload: request
  };
}
