import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { OrderItem, User } from "../types";
import { updateCart } from "../features/user-slice";
import ProductItem from "../components/product/ProductItem";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../components/css/CartList.css";

// Instead of using 'any', create a proper type for the updateCart function if possible.
const updateCartWorkaround = (updateCart) as any;

interface CartItemProps {
  cartItem: OrderItem;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem }) => {
  return (
    <div>
      <ProductItem data={cartItem.product} />
      <div style={{ position: "relative", left: "1rem" }}>
        Quantity: <h5>{cartItem.quantity}</h5>
        <br />
        Total item Price: <h5>{cartItem.quantity * cartItem.product.price + "$"}</h5>
      </div>
    </div>
  );
};

const CartList: React.FC = () => {
  const cartItems = useSelector<RootState, OrderItem[]>((state) => (state.user.user as User | null)?.cart?.orderItems ?? []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="cart-container">
      <Button onClick={handleBack}>Back</Button>
      <h2>Your Cart</h2>
      {cartItems && cartItems.length > 0 && (
        <ul className="cart-items-list">
          {cartItems.map((item, index) => (
            <CartItem key={`${item.id},${index}`} cartItem={item} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartList;
