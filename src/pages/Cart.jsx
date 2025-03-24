import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 80px 20px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

function Cart() {
  return (
    <CartContainer>
      <h1>Shopping Cart</h1>
      {/* Content will be added later */}
    </CartContainer>
  );
}

export default Cart;