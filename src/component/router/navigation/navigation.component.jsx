import  { Fragment} from 'react';
import { Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from '../../../assets/crown.svg';
import './navigation.styles.jsx';
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import CartIcon from '../../cart-icon/cart-icon.component.';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import '../../cart-dropdown/cart-dropdown.styles.jsx';
import { NavigationContainer , NavLink,NavLinks,LogoContainer} from './navigation.styles.jsx';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../../store/cart/cart.selector';


const Navigation = () => {
  const currentUser = useSelector((state)=>state.user.currentUser); 
  const isCartOpen= useSelector(selectIsCartOpen);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo"/>
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
            {currentUser? ( <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink> ) :  (<NavLink to='/auth'>
            SIGN IN
          </NavLink>)}
          <CartIcon/>
        </NavLinks>
        {isCartOpen && <CartDropdown/>}
      </NavigationContainer>
      <Outlet/> {/*acts as placeholder  for where child components should be rendered within a parent component.*/} 
    </Fragment>
  );
};
export default Navigation;