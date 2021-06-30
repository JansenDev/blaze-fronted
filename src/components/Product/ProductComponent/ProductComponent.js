import React from "react";
// *redux
import { useSelector } from "react-redux";
// *utils
import { map } from "lodash";

function ProductComponent() {
  const allProductsStore = useSelector((state) => state.allProducts.products);
  console.log(allProductsStore);

  const renderTableProducts = map(allProductsStore, (product, index) => {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>$ {product.unit_price}</td>
        <td>{product.active}</td>
        <td className="justify-content-evenly d-flex">
          <a className="text-warning" href="#" role="button">
            Edit
          </a>
          <a className="text-danger" href="#" role="button">
            Delete
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2>Products</h2>
    <a name="" id="" className="btn btn-primary float-end my-5" href="#" role="button">New Product</a>
      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>N°</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {renderTableProducts}
        </tbody>
      </table>
    </div>
  );
}

export default ProductComponent;
