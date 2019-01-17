import { FETCH_ORGANIZATIONS, FETCH_CAUSES, UPDATE_SEARCH_TERMS } from './types';
import axios from 'axios';
import { createAction } from '../utilities/action-helpers';

// tslint:disable-next-line:no-any
export const fetchOrganizations = (body: any) => (dispatch: any) => {
  // tslint:disable-next-line:no-console
  console.log('action');

  axios
    .post('http://localhost:8000/api/externalApi', { data: body, token: sessionStorage.getItem('UserObj') })
    // tslint:disable-next-line:no-any
    .then((res: { data: any; }) => dispatch({
      type: FETCH_ORGANIZATIONS,
      payload: res.data
    }));
};
// redux1: cut the api call function from home.tsx, added it here, and exported it
// I don't really understand the dispatch, it comes from thunk and is middleware
// tslint:disable-next-line:no-any
export const fetchCauses = (test: string) => (dispatch: any) => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8000/api/causes')
    // tslint:disable-next-line:no-any
    .then((causes: any) => dispatch({
      type: FETCH_CAUSES,
      payload: causes.data
    }));
  });
};

export const updateSearchTerms = (terms: string) => {
  createAction(UPDATE_SEARCH_TERMS, terms);
};