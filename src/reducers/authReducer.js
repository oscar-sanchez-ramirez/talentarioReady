import { types } from '../types/types';
/*
    {
        uid: '8clM370coqM4mwXTi8uLiwc2RWF3',
        name: 'Oscar'
    }

*/
export const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email
            }

        case types.logout:
                return { }
    
        default:
            return state;
    }

}