import React, { Component } from "react"
import { Switch, Route, withRouter, Redirect } from "react-router-dom"
import { connect } from "react-redux"

import Layout from "./hoc/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout/Logout"
import Spinner from "./components/UI/Spinner/Spinner"
import * as actions from "./store/actions/index"

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignup()
    }

    render() {
        let app = <Spinner />
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        )
        if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/" />
                </Switch>
            )
        }

        if (!this.props.tryingAutoSignup) {
            app = <Layout>{routes}</Layout>
        }
        return app
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null,
        tryingAutoSignup: state.auth.tryingAutoSignup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
