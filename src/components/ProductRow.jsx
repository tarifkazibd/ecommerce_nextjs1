import Image from "next/image";

import { icons } from "@/assets";
import Link from "next/link";

function ProductRow({ item }) {
  const removeHandler = () => {
    fetch(`http://localhost:5000/products/${item.id}`, {
      method: "DELETE",
    }).then(() => {
      fetch("http://localhost:3000/api/product/revalidate-shop").then(() => {
        console.log("successfull");
      });
    });
  };

  return (
    <tr className="product-row d-flex justify-content-around align-items-center">
      <td>
        {" "}
        <img src={item.image} className="product-img" alt="" />
      </td>

      <td>
        {" "}
        <h2>{item.title}</h2>
      </td>
      <td>
        <h2>{item.price}</h2>
      </td>
      <td>
        <Image
          width={30}
          className="product-icon"
          src={icons.editIcon}
          alt=""
        />
      </td>
      <td>
        <Image
          width={20}
          alt={item.title}
          className="product-icon"
          src={icons.crossIcon}
          onClick={removeHandler}
        />
      </td>
    </tr>
  );
}

export default ProductRow;
