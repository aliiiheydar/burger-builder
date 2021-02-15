import React, { Component } from "react"
import { connect } from "react-redux"

import Button from "../../../components/UI/Button/Button"
import Input from "../../../components/UI/Input/input"
import Spinner from "../../../components/UI/Spinner/Spinner"
import axios from "../../../axios-orders"
import classes from "./ContactData.module.css"

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            address: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Address"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Zip Code"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your E-Mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "",
                validation: {},
                valid: true
            }
        },
        loading: false,
        formIsValid: false
    }

    inputChangeHandler = (id, event) => {
        const updatedOrderForm = { ...this.state.orderForm }
        const updatedOrderFormElement = { ...updatedOrderForm[id] }
        updatedOrderFormElement.value = event.target.value
        updatedOrderFormElement.valid = this.checkValidity(
            updatedOrderFormElement.value,
            updatedOrderFormElement.validation
        )
        updatedOrderFormElement.touched = true
        updatedOrderForm[id] = updatedOrderFormElement

        let formIsValid = true

        for (let id in updatedOrderForm) {
            formIsValid = updatedOrderForm[id].valid && formIsValid
        }

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }

    checkValidity(value, rules) {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== "" && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid
    }

    orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let id in this.state.orderForm) {
            formData[id] = this.state.orderForm[id].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }

        this.setState({ loading: true })

        axios.post("/orders", order).then(() => {
            this.setState({
                loading: false
            })
            this.props.history.push("/")
        })
    }

    render() {
        let formElementsArray = []

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) =>
                            this.inputChangeHandler(formElement.id, event)
                        }
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                    />
                ))}
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}
                >
                    ORDER
                </Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData)
