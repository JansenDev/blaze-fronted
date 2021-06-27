import React from "react";
import { Link, Redirect } from "react-router-dom";
// * redux
import { useDispatch, useSelector } from "react-redux";
// * Componenets
import { createOrder, getAllOrders } from "../../service/OrderService";
// * utils
import  Swal  from "sweetalert2";
import { setOrder } from "../../redux/actions/orderActions";

function formatDate(date){
    return date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }

const OrderComponent = () => {
  const storeAllOrders = useSelector((state) => state.allOrders.orders);
  const dispatch = useDispatch();

  const renderOrderList = storeAllOrders.map((Order, index) => {
    const { order_number, status, date, customer, total_amount } = Order;

    const dateFormated = formatDate(date.substr(0,10));

    return (
      <tr key={ order_number } className="text-center">
        <td scope="row">{ index+1 }</td>
        <td>{ customer }</td>
        <td>{ status }</td>
        <td>{ dateFormated }</td>
        <td> $ { total_amount.toFixed(2) }</td>
        <td className="justify-content-center d-flex">
          <Link className="text-info" to={`/orders/${order_number}`} >
            Edit
          </Link>
        </td>
      </tr>
    );
  });


  const createNewOrder= ()=>{
    console.log("New Order Create");
    Swal.fire({
      title: 'Create New Order',
      input: 'text',
      inputPlaceholder:"Customer name",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Create!',
      showLoaderOnConfirm: true,
      preConfirm: (textImput) => {
        newOrderTemplate.customer = textImput;
        if(textImput == "" || textImput == " "){
          // throw new Error("not does name customer");
          return;
        }
        const newOrderCreated = createOrder(newOrderTemplate);
        return newOrderCreated;
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          title: `Order created!`,
        });

        window.location.replace(window.location.href+`/${result.value.data.order_number}`);

        // const response =  getAllOrders();
        // dispatch(setOrder(response.data));
        // return <Redirect  to={window.location.href+"/"+result.value.data.order_number} />
      }
    })
    .catch((err)=>console.log(err));
  }

  return (
    <div>
      <div className="h2">Orders</div>
      <div>
          <a onClick={createNewOrder}  className="btn btn-primary float-end my-5" role="button">Create Order</a>
      </div>
      <table className="table table-bordered ">
        <thead>
          <tr className="text-center" >
            <th>N°</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <>{renderOrderList}</>
        </tbody>
      </table>
    </div>
  );
};

const newOrderTemplate = {
  status: "Pending",
  customer: "",
  taxes_amounts: {
    city_tax: 0.1,
    country_tax: 0.05,
    state_tax: 0.08,
    federal_tax: 0.02
  },
  taxes_total: 0.0,
  total_amount:0.0,
  listOrdersItems: []
}

export default OrderComponent;
