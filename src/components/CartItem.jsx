import { useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

import { icons } from "@/assets";
import { removeFromCart, modifyQuantityOfAnItem } from "@/store/actions/cart";

function CartItem({ item }) {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  return (
    <tr>
      <td>
        <div className="product">
          <img src={item.image} className="product-img" alt={item.title} />
        </div>
      </td>
      <td>
        <p>{item.title}</p>
      </td>
      <td>$ {item.price}</td>
      <td>
        <div className="qty_input">
          <button
            className="qty-count qty-count--minus"
            data-action="minus"
            type="button"
            onClick={() => {
              if (itemQuantity > 1) {
                setItemQuantity((prev) => prev - 1);
                dispatch(
                  modifyQuantityOfAnItem({
                    id: item.id,
                    quantity: itemQuantity - 1,
                  })
                );
              } else {
                alert(`The quantity cannot be lesser than 1`);
              }
            }}
          >
            <figure>
              <Image src={icons.minusIcon} alt="" />
            </figure>
          </button>
          <input
            className="product-qty"
            type="number"
            name="product-qty"
            value={itemQuantity}
            onChange={(e) => {
              setItemQuantity(Number(e.target.value));
              console.log(typeof e.target.value);
              dispatch(
                modifyQuantityOfAnItem({
                  id: item.id,
                  quantity: Number(e.target.value),
                })
              );
            }}
            min="1"
          />
          <button
            className="qty-count qty-count--add"
            data-action="add"
            type="button"
            onClick={() => {
              setItemQuantity((prev) => prev + 1);
              dispatch(
                modifyQuantityOfAnItem({
                  id: item.id,
                  quantity: itemQuantity + 1,
                })
              );
            }}
          >
            <figure>
              <Image src={icons.plusIcon} alt="" />
            </figure>
          </button>
        </div>
      </td>
      <td>$ {item.price * item.quantity}</td>
      <td>
        <Image
          onClick={() => dispatch(removeFromCart(item.id))}
          className="cross-icon"
          src={icons.crossIcon}
          alt=""
        />
      </td>
    </tr>
  );
}

export default CartItem;
