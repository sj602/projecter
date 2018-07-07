export const SET_AUTHENTICATED = 'SET_AUTHENTICATED';

export const setAuthenticated = (authenticated) => (dispatch) => {
    return dispatch({type: SET_AUTHENTICATED, authenticated});
}