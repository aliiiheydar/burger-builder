import * as actionTypes from "../actions/actionTypes"

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    tryingAutoSignup: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.authData.token,
                userId: action.authData.userId,
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
        case actionTypes.AUTO_SIGNUP_FINISHED:
            return {
                ...state,
                tryingAutoSignup: false
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer
