import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"
import { setIngredients } from "./burgerBuilder"

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const purchaseBurger = (orderData) => {
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart())
        axios
            .post("/orders", orderData)
            .then((res) => {
                const initialIngredients = { ...getState().burgerBuilder.ingredients }
                for (let ingKey in initialIngredients) {
                    initialIngredients[ingKey] = 0
                }
                dispatch(purchaseBurgerSuccess(res.data.id, orderData))
                dispatch(setIngredients(initialIngredients))
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart())
        axios
            .get("/orders")
            .then((res) => {
                dispatch(fetchOrdersSuccess(res.data))
            })
            .catch((error) => {
                dispatch(fetchOrdersFail(error))
            })
    }
}
