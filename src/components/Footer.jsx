import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${props => props.theme.colors.secondary};
  text-decoration: none;
  margin-bottom: 0.5rem;
  
  &:hover {
    opacity: 0.8;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${props => props.theme.colors.accent};
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>About DripMart</h3>
          <FooterLink to="/about">Our Story</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/careers">Careers</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Customer Service</h3>
          <FooterLink to="/shipping">Shipping Info</FooterLink>
          <FooterLink to="/returns">Returns</FooterLink>
          <FooterLink to="/faq">FAQ</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <h3>Connect With Us</h3>
          <FooterLink to="#">Instagram</FooterLink>
          <FooterLink to="#">Facebook</FooterLink>
          <FooterLink to="#">Twitter</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        © {new Date().getFullYear()} DripMart. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
}

export default Footer;