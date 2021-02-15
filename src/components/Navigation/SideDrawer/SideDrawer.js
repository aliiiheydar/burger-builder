import React from "react"

import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Backdrop from "../../UI/Backdrop/Backdrop"
import Aux from "../../../hoc/Aux"
import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
    return (
        <Aux>
            <Backdrop clicked={props.closed} show={props.show} />
            <div
                className={[
                    classes.SideDrawer,
                    props.show ? classes.Open : classes.Close
                ].join(" ")}
            >
                <Logo height="11%" />
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
