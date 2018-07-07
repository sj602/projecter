import { SET_AUTHENTICATED } from '../actions';

const initialState = {
    isAuthenticated: false,
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: action.authenticated,
            }
            break;

        default:
            return state;
            break;
    }
}