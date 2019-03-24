export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
export const GET_USERS = 'GET_USERS';

export const setAuthenticated = (authenticated) => (dispatch) => {
    return dispatch({type: SET_AUTHENTICATED, authenticated});
}

export const getUsers = () => (dispatch) => {
    fetch('/api/getAllUsers', {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(res => res.json())
        .then(json => dispatch({type: GET_USERS, users: json['users']}))
        .catch(err => console.log(err))
}