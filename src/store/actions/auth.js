import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart())
        let url = "signup"
        const user = {
            email,
            password
        }
        if (!isSignup) {
            url = "signin"
        }
        axios
            .post(url, user)
            .then((res) => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userId", res.data.userId)
                dispatch(authSuccess(res.data))
            })
            .catch((err) => {
                dispatch(authFail(err.response.data))
            })
    }
}

const autoSignupFinished = () => {
    return {
        type: actionTypes.AUTO_SIGNUP_FINISHED
    }
}

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token")
        if (!token) {
            dispatch(autoSignupFinished())
        } else {
            const userId = localStorage.getItem("userId")
            dispatch(authSuccess({ token, userId }))
            dispatch(autoSignupFinished())

            // axios
            //     .get("/auth/" + token)
            //     .then((res) => {
            //         if (res.data.isAuth) {
            //             const userId = localStorage.getItem("userId")
            //             dispatch(authSuccess({ token, userId }))
            //             dispatch(autoSignupFinished())
            //         } else {
            //             dispatch(logout())
            //             dispatch(autoSignupFinished())
            //         }
            //     })
            //     .catch((error) => {
            //         dispatch(logout())
            //         dispatch(autoSignupFinished())
            //     })
        }
    }
}
