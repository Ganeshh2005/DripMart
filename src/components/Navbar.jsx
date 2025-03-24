import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Logo from './Logo';
import useScrollDirection from '../hooks/useScrollDirection';
// Add this to your existing imports
import { FaTshirt } from 'react-icons/fa';

const Nav = styled.nav`
  background: white;
  color: black;
  padding: 0.8rem 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform: translateY(${props => props.$hide ? '-100%' : '0'});
`;

// Then in your Navbar component, update the prop name
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTryOn, setShowTryOn] = useState(false);
  const scrollDirection = useScrollDirection();

  return (
    <>
      <Nav $hide={scrollDirection === "down"}>
        <NavContainer>
          <Logo />
          <NavLinks>
            <NavItem>
              <NavLink as="div">MEN</NavLink>
              <DropdownContent>
                <DropdownLink to="/men/tshirts">T-Shirts</DropdownLink>
                <DropdownLink to="/men/shirts">Shirts</DropdownLink>
                <DropdownLink to="/men/pants">Pants</DropdownLink>
                <DropdownLink to="/men/hoodies">Hoodies</DropdownLink>
                <DropdownLink to="/men">View All</DropdownLink>
              </DropdownContent>
            </NavItem>
            <NavItem>
              <NavLink as="div">WOMEN</NavLink>
              <DropdownContent>
                <DropdownLink to="/women/dresses">Dresses</DropdownLink>
                <DropdownLink to="/women/tops">Tops</DropdownLink>
                <DropdownLink to="/women/skirts">Skirts</DropdownLink>
                <DropdownLink to="/women/jackets">Jackets</DropdownLink>
                <DropdownLink to="/women">View All</DropdownLink>
              </DropdownContent>
            </NavItem>
            <NavItem>
              <NavLink as="div">KIDS</NavLink>
              <DropdownContent>
                <DropdownLink to="/kids/boys">Boys</DropdownLink>
                <DropdownLink to="/kids/girls">Girls</DropdownLink>
                <DropdownLink to="/kids/infants">Infants</DropdownLink>
                <DropdownLink to="/kids">View All</DropdownLink>
              </DropdownContent>
            </NavItem>
            <NavLink to="/shop">SHOP ALL</NavLink>
            <TryOnButton to="/try-on">
              <FaTshirt />
              Try-On
            </TryOnButton>
          </NavLinks>
          <IconWrapper>
            <NavLink to="/profile">
              <PersonOutlineIcon />
            </NavLink>
            <NavLink to="/wishlist">
              <FavoriteBorderIcon />
            </NavLink>
            <NavLink to="/cart">
              <ShoppingCartIcon />
            </NavLink>
            <MenuIconWrapper onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon />
            </MenuIconWrapper>
          </IconWrapper>
        </NavContainer>
      </Nav>
      {showTryOn && (
        <VirtualTryOn 
          onClose={() => setShowTryOn(false)}
          product={{
            name: "Virtual Fitting Room",
            productImage: "/path/to/default/overlay.png"
          }}
        />
      )}
    </>
  );
}

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 2rem; // Added padding here instead
  margin: 0 auto;
`;

// Change the existing Logo styled component to LogoLink
const LogoLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
  font-family: 'Arial', sans-serif;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: black;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const MenuIconWrapper = styled.div`
  display: none;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 200px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  z-index: 1;
  padding: 1rem 0;
`;

const NavItem = styled.div`
  position: relative;
  
  &:hover ${DropdownContent} {
    display: block;
  }
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  color: black;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    background: #f5f5f5;
  }
`;

// Add this to your styled components
const TryOnButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  border-radius: 25px;
  text-decoration: none;
  font-weight: 500;
  transition: ${props => props.theme.transitions.ease};
  
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

// Add this to your navigation links section
<TryOnButton onClick={() => setShowTryOn(true)}>
  <FaTshirt />
  Virtual Try-On
</TryOnButton>
export default Navbar;