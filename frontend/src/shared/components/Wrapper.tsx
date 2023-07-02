import Navigation from "./Navigation";
import {Outlet} from "react-router-dom";
import classes from './Wrapper.module.scss'

type WrapperProps = {}
const Wrapper: React.FC<WrapperProps> = props => {

    return <div className={classes.wrapper}>
      <Navigation />
        <Outlet />
    </div>
}

export default Wrapper