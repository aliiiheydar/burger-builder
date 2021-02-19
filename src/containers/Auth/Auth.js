import React, { Component } from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import Input from "../../components/UI/Input/input"
import Button from "../../components/UI/Button/Button"
import Spinner from "../../components/UI/Spinner/Spinner"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { checkValidity } from "../../shared/utility"

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Mail"
                },
                value: "",
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        formIsValid: false
    }

    inputChangeHandler = (id, event) => {
        const updatedControls = { ...this.state.controls }
        const updatedControlsElement = { ...updatedControls[id] }
        updatedControlsElement.value = event.target.value
        updatedControlsElement.valid = checkValidity(
            updatedControlsElement.value,
            updatedControlsElement.validation
        )
        updatedControlsElement.touched = true
        updatedControls[id] = updatedControlsElement

        let formIsValid = true

        for (let id in updatedControls) {
            formIsValid = updatedControls[id].valid && formIsValid
        }

        this.setState({
            controls: updatedControls,
            formIsValid: formIsValid
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        )
    }

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {
        let formElementsArray = []

        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
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
                <Button btnType="Success">
                    {this.state.isSignup ? "SIGN UP" : "SIGN IN"}
                </Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        if (this.props.isAuth) {
            form = <Redirect to="/" />
        }

        let errorMessage = null

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        return (
            <div className={classes.Auth}>
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => {
            dispatch(actions.auth(email, password, isSignup))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
