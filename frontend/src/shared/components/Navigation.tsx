import {Outlet} from "react-router-dom";
import classes from './Navigation.module.scss'
import {NavLink} from 'react-router-dom'

type NavigationProps = {

}
const Navigation: React.FC<NavigationProps> = () => {
    return (
        <div className={classes.navigation}>

                    <NavLink to='/streamers'>STREAMERS SPOTLIGHT</NavLink>

            <Outlet />
        </div>
    );
};

export default Navigation;
