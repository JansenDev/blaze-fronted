import React, { useState } from "react";
// *Redux
import { useDispatch, useSelector } from "react-redux";
import { setSelectOrder } from "../../../redux/actions/orderActions";
// *local imports
import { updateOrder } from "../../../service/OrderService";

function RenderModalInsertItem() {
  const dispatch = useDispatch();
  const orderFormBody = useSelector((state) => state.orderById);
  const orderFormItem = orderFormBody.listOrdersItems;

  const [formOrderItem, setFormOrderItem] = useState(orderItemTemplateFormat());

  // !functions
  const handleChangeFormOrderItem = async (e) => {
    e.preventDefault();
    setFormOrderItem({
      ...formOrderItem,
      [e.target.name]: e.target.value,
    });
  };

  const insertNewOrdenItem = async (e) => {
    e.preventDefault();
    orderFormItem.push(formOrderItem);
    dispatch(setSelectOrder(orderFormBody));
    
    const data = await updateOrder(orderFormBody);
    cleanModalFiles();
    console.log(data);
  };

  const cleanModalFiles=()=>{
    setFormOrderItem(orderItemTemplateFormat());
  }
  

  return (
    <div>
      <form onSubmit={insertNewOrdenItem}>
        <table className="table table-bordered my-5">
          <thead>
            <tr className="text-center">
              <th colSpan="3">New Product</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Name</td>
              <td>
                <input
                  name="name"
                  id=""
                  className="form-control"
                  type="text"
                  value={formOrderItem.name}
                  placeholder="Name"
                  onChange={handleChangeFormOrderItem}
                />
              </td>
            </tr>
            <tr>
              <td scope="row">Quantity</td>
              <td>
                <input
                  name="quantity"
                  id=""
                  className="form-control"
                  type="number"
                  value={formOrderItem.quantity}
                  placeholder="Quantity"
                  onChange={handleChangeFormOrderItem}
                  min="1"
                />
              </td>
            </tr>
            <tr>
              <td scope="row">Unit Price</td>
              <td>
                <input
                  name="unit_price"
                  id=""
                  className="form-control"
                  type="text"
                  value={formOrderItem.unit_price}
                  placeholder="Unit Price"
                  onChange={handleChangeFormOrderItem}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary btn-block mb-5" type="submit">
          Add Item+
        </button>
      </form>
    </div>
  );
}

const orderItemTemplateFormat = () => {
  return {
    name: "",
    quantity: "",
    unit_price: "",
  };
};


export default RenderModalInsertItem;
