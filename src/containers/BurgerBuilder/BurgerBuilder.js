import React, { Component } from "react"
import { connect } from "react-redux"

import Aux from "../../hoc/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import axios from "../../axios-orders"
import * as actionTypes from "../../store/action"

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios
            .get("/ingredients")
            .then((res) => {
                this.props.onIngredientsLoaded(res.data)
                this.setState({ error: false })
            })
            .catch((err) => {
                this.setState({ error: true })
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinuelHandler = () => {
        this.props.history.push("/checkout")
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let burger = this.state.error ? (
            <p>Ingredients can't be loaded!</p>
        ) : (
            <Spinner />
        )
        let orderSummary = null

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(
                            this.props.ings
                        )}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    canceled={this.purchaseCancelHandler}
                    continued={this.purchaseContinuelHandler}
                    price={this.props.price.toFixed(2)}
                />
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (name) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: name
            }),
        onIngredientRemoved: (name) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: name
            }),
        onIngredientsLoaded: (ingredients) => {
            dispatch({
                type: actionTypes.LOAD_INGREDIENTS,
                ingredients: ingredients
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
