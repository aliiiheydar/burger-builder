import React, { useState } from "react"

import Aux from "../Aux"
import Toolbar from "../../components/Navigation/Toolbar/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import classes from "./Layout.module.css"

const Layout = (props) => {
    const [showSideDrawerState, setShowSideDrawerState] = useState(false)

    const sideDrawerToggleHandler = () => {
        setShowSideDrawerState((prevState) => !prevState)
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                closed={sideDrawerToggleHandler}
                show={showSideDrawerState}
            />
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    )
}

export default Layout
