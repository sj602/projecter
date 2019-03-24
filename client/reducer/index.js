import { 
    SET_AUTHENTICATED, 
    GET_USERS 
} from '../actions';

const initialState = {
    isAuthenticated: false,
    users: [],
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                isAuthenticated: action.authenticated,
            }
            break;

        case GET_USERS:
            return {
                users: action.users
            }
            break;

        default:
            return state;
            break;
    }
}