import { PiShoppingCartSimpleBold } from "react-icons/pi";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CartTaggle = () => {
    const quantity = useSelector<RootState,number>(state => state.user.cartTotalQuantity)

    const Rounded = styled.span`
      border-radius: 60%;
      width: 17px;
      height: 16px;
      display:grid;
      align-content: center;
      background: #bd3333;
      color: white;src/index.tsx
      place-items:center;
      position:absolute;
      left: 16px;
      top:-6px;
    `;
    return (
      <>
        <Link to="/cart">
          <button
            style={{
              borderRadius: "5px",
              position: "relative",
              height:"34px",
              width: "34px",
              padding:"6px",
              border: "1px solid #c3bebe",
            }}
          >
            <Rounded>{quantity}</Rounded>
            <PiShoppingCartSimpleBold style={{ fontSize: "18px", display: "grid" }} />
          </button> 
        </Link>
      </>
    );

};
export default CartTaggle;
