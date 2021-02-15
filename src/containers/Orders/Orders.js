import React, { Component } from "react"

import Spinner from "../../components/UI/Spinner/Spinner"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

class Orders extends Component {
    state = { orders: [], loading: true }

    componentDidMount() {
        axios
            .get("/orders")
            .then((res) => {
                this.setState({ orders: res.data, loading: false })
            })
            .catch((err) => {
                this.setState({ loading: false })
            })
    }

    render() {
        let orders = <Spinner />
        if (!this.state.loading) {
            orders = this.state.orders.map((order) => {
                return (
                    <Order
                        key={Math.random()}
                        ingredients={order.ingredients}
                        price={parseFloat(order.price).toFixed(2)}
                    />
                )
            })
        }
        return <div>{orders}</div>
    }
}

export default withErrorHandler(Orders, axios)
