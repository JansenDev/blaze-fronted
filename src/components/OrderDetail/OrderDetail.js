import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSelectOrder } from "../../redux/actions/orderActions";

//!segment functionality
function formatDate(date) {
  return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1");
}

function OrderDetail() {
  const [formOrderItem, setFormOrderItem] = useState({name:'',
quantity:'',
unitPrice:''
});
  const idOrderPath = useParams("idOrder").idOrder;
  console.log(idOrderPath);
  const dispatch = useDispatch();

// !HANDLECHANGE
  const handleChangeFormOrderItem = async(e)=>{
    e.preventDefault();
    console.log(e);
    await setFormOrderItem(
      {
        ...formOrderItem,
      [e.target.name] : e.target.value
    }
    )
  }
  console.log(formOrderItem);

  // !SERVICE

  const insertNewOrdenItem= async(e)=>{
    e.preventDefault();
    console.log(formOrderItem);
    const data = await axios({
      method:'post',
      url:`http://localhost:8080/orders/`,
      data:formOrderItem
    })

    console.log(data);
  }


  const getOrderById = async () => {


    const datos = await axios
      .get(`http://localhost:8080/orders/${idOrderPath}`)
      .catch((err) => {
        console.log(err);
      });
    // console.log(datos.data);
    dispatch(setSelectOrder(datos.data));
  };

  useEffect(() => {
    getOrderById();
    return () => {};
  }, []);

  const storeAllOrders = useSelector((state) => state.allOrders.orders);

  const orderById = storeAllOrders.filter(
    (order) => order.order_number == idOrderPath
  )[0];

  const orderById2 = useSelector((state) => state.allOrders.selectOrder);
  // console.log(orderById2)

  const {
    order_number,
    date,
    customer,
    status,
    listOrdersItems,
    taxes_amounts,
    taxes_total,
    total_amount,
  } = orderById;

  const { city_tax, country_tax, federal_tax, state_tax } = taxes_amounts;

  const dateFormated = formatDate(date.substr(0, 10));

  let totalPriceOrderItems = 0;

  //!segment Template
  const renderOrderItemsList = listOrdersItems.map((order, index) => {
    const { name, quantity, unit_price } = order;
    const priceOrderItem = quantity * unit_price;
    totalPriceOrderItems = totalPriceOrderItems + priceOrderItem;
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>$ {unit_price}</td>
        <td>$ {priceOrderItem.toFixed(2)}</td>
        <td className="justify-content-evenly d-flex">
          <a href="#" role="button">
            Edit
          </a>
          <a href="#" role="button">
            Delete
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div>
        <div className="float-left">
          <h2>Order N° {order_number}</h2>
        </div>
        <div className="float-end">
          <Link className="btn btn-secondary" to="/orders">
            Back
          </Link>
        </div>
      </div>

      <table className="table table-borderless">
        <tbody className="h5">
          <tr>
            <td>Customer</td>
            <td>{customer}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{status}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>{dateFormated}</td>
          </tr>
        </tbody>
      </table>

      <table className="table table-bordered text-center">
        <thead>
          <tr>
            <th>N°</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{renderOrderItemsList}</tbody>
      </table>
      <a
        name=""
        id=""
        className="btn btn-primary float-lg-end"
        href="#"
        role="button"
      >
        Add Item+
      </a>

      <table className="table table-borderless table-sm">
        <tbody>
          <tr>
            <td>
              <h5>Subtotal</h5>
            </td>
            <td>
              <h5>$ {totalPriceOrderItems.toFixed(2)}</h5>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Taxes</h5>
            </td>
            <td></td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total city_tax</h6>
            </td>
            <td>$ {(city_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total country_tax</h6>
            </td>
            <td>$ {(country_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total federal_tax</h6>
            </td>
            <td>$ {(federal_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h6>&nbsp;&nbsp;Total state_tax</h6>
            </td>
            <td>$ {(state_tax * totalPriceOrderItems).toFixed(2)}</td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Total Taxes</h5>
            </td>
            <td>
              <h5>$ {taxes_total.toFixed(2)}</h5>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Total</h5>
            </td>
            <td>
              <h5>$ {total_amount.toFixed(2)}</h5>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mb-5">
        <a className="btn btn-success" href="#" role="button">
          Complete Order
        </a>
        <a className="btn btn-danger" href="#" role="button">
          Reject Order
        </a>
      </div>

      <div>
        <form onSubmit={insertNewOrdenItem}>
          <table className="table table-bordered my-5">
            <thead>
              <tr>
                <th colSpan="3">New Product</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">Name</td>
                <td><input name="name" id="" className="form-control" type="text" value={formOrderItem.name} placeholder="Name" onChange={handleChangeFormOrderItem} /></td>
              </tr>
              <tr>
                <td scope="row">Quantity</td>
                <td><input name="quantity" id="" className="form-control" type="number" value={formOrderItem.quantity} placeholder="Quantity"  onChange={handleChangeFormOrderItem}/></td>
              </tr>
              <tr>
                <td scope="row">Unit Price</td>
                <td><input name="unitPrice" id="" className="form-control" type="number" value={formOrderItem.unitPrice} placeholder="Unit Price"  onChange={handleChangeFormOrderItem}/></td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary btn-block" type="submit">Add Item+</button>
        </form>
      </div>
    </div>
  );
}

export default OrderDetail;
