import {Outlet} from "react-router-dom";

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
} from './Navigation.styles';
type NavigationProps = {

}
const Navigation: React.FC<NavigationProps> = () => {
    return (
        <>
            <NavigationContainer>
                <LogoContainer to='/'>

                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>SHOP</NavLink>

                </NavLinks>
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
