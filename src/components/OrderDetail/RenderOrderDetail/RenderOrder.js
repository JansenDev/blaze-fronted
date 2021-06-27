import React from "react";
import { Link } from "react-router-dom";
// *redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// *local imports
import {
  setSelectOrder,
  setModalOrder,
  setHandlerFormItem
} from "../../../redux/actions/orderActions";
import { updateOrder } from "../../../service/OrderService";
import RenderModalInsertItem from "./RenderModalInsertItem";
// import RenderOrderTaxes from "./RenderOrderTaxes";
// *utils lib
import Swal from "sweetalert2";
import { formatDate } from "../../../utils/utils";


function RenderOrder() {

  const dispatch = useDispatch();
  const orderById = useSelector((state) => state.orderById);
  const {
    order_number = "",
    date = "",
    customer = "",
    status = "",
    listOrdersItems = [],
    taxes_amounts = {},
  } = orderById;

  const { city_tax, country_tax, state_tax, federal_tax } = taxes_amounts;

  const dateFormated = formatDate(date.substr(0, 10));
  const arrrayItems = listOrdersItems;

  let auxTotal_taxes = 0;
  let auxTotal_amount = 0;
  let totalPriceOrderItems = 0;
  // !functions
  const renderOrderItemsList = arrrayItems.map((order, index) => {
    const { name, quantity, unit_price } = order;
    const priceOrderItem = quantity * unit_price;
    totalPriceOrderItems = totalPriceOrderItems + priceOrderItem;

    auxTotal_taxes = (totalPriceOrderItems*0.1)+(totalPriceOrderItems*0.05)+(totalPriceOrderItems*0.08)+(totalPriceOrderItems*0.02);
    auxTotal_amount = totalPriceOrderItems + auxTotal_taxes;

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{name}</td>
        <td>{quantity}</td>
        <td>$ {unit_price}</td>
        <td>$ {priceOrderItem.toFixed(2)}</td>
        <td className="justify-content-evenly d-flex">
          <a className="text-info" onClick={() => setModalEditOrderItem(name)} role="button">
            Edit
          </a>
          <a className="text-danger" onClick={() => deleteOrderItem(name)} role="button">
            Delete
          </a>
        </td>
      </tr>
    );
  });

  const setModalEditOrderItem = async (nameItem) => {
    const modalConfig = {
      action:"Edit",
      idItem:nameItem,
      opened:true,
    }

    const modalFieldsItem =  arrrayItems.filter((item)=> item.name == nameItem)[0]; 

    dispatch(setHandlerFormItem(modalFieldsItem));
    dispatch(setModalOrder(modalConfig));
  };

  const setModalAddOrderItem = async () => {
    const modalConfig = {
      action:"New",
      idItem:"",
      opened:true,
    }

    dispatch(setModalOrder(modalConfig));

      
      dispatch(setHandlerFormItem({
        name: "",
        quantity: "",
        unit_price: "",
      }));
  };

  const deleteOrderItem = async (nameItem) => {
    const newListOrdersItem = listOrdersItems.filter(
      (orderItem) => orderItem.name != nameItem
    );
    orderById.listOrdersItems = newListOrdersItem;

    Swal.fire({
      title: `Do you want to delete the Item: ${nameItem}?`,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Cancel`,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        dispatch(setSelectOrder(orderById));
        updateOrder(orderById);
      }
    });
  };

  const btnCompleteOrder = () => {
    orderById.status = "Completed";
    dispatch(setSelectOrder(orderById));
    updateOrder(orderById);
  };

  const btnRejectOrder = () => {
    orderById.status = "Reject";
    dispatch(setSelectOrder(orderById));
    updateOrder(orderById);
  };

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
        className="btn btn-primary float-end"
        role="button"
        onClick={() => setModalAddOrderItem()}
      >
        Add Item+
      </a>

      {/* <RenderOrderTaxes /> */}

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
              <h5>$ {auxTotal_taxes.toFixed(2)}</h5>
            </td>
          </tr>
          <tr>
            <td scope="row">
              <h5>Total</h5>
            </td>
            <td>
              <h5>$ {auxTotal_amount.toFixed(2)}</h5>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mb-5 float-end">
        <a onClick={btnCompleteOrder} className="btn btn-success mx-1" role="button">
          Complete Order
        </a>
        <a onClick={btnRejectOrder} className="btn btn-danger mx-1" role="button">
          Reject Order
        </a>
      </div>

      <div>
        <RenderModalInsertItem />
      </div>
    </div>
  );
}

export default RenderOrder;
