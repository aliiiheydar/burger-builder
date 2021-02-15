import * as actoinTypes from "./action"

const initialState = {
    ingredients: null,
    totalPrice: 4
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actoinTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] + 1
                },
                totalPrice:
                    state.totalPrice +
                    INGREDIENT_PRICES[action.ingredientName]
            }
        case actoinTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:
                        state.ingredients[action.ingredientName] - 1
                },
                totalPrice:
                    state.totalPrice -
                    INGREDIENT_PRICES[action.ingredientName]
            }
        case actoinTypes.LOAD_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients
            }
        default:
            return state
    }
}

export default reducer
