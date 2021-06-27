import React from "react";
import { useSelector } from "react-redux";

function RenderOrderTaxes() {
  const orderById = useSelector((state) => state.orderById);
//   console.log(orderById);
  const {
    listOrdersItems = [],
    taxes_amounts = {},
    taxes_total = 0,
    total_amount = 0,
  } = orderById;

  const totalPriceOrderItems = () => {
    const subtotalOrder = listOrdersItems.map((order, index) => {
      let totalPriceOrderItemsF = 0;
      const { quantity, unit_price } = order;
      const priceOrderItem = quantity * unit_price;
      totalPriceOrderItemsF = totalPriceOrderItemsF + priceOrderItem;

      console.log(priceOrderItem);
      console.log(totalPriceOrderItemsF);
      return totalPriceOrderItemsF;
    });
    return subtotalOrder;
  };


  const { city_tax, country_tax, state_tax, federal_tax } = taxes_amounts;
  console.log(taxes_amounts)
  return (
    <>
      <table className="table table-borderless table-sm">
        <tbody>
          <tr>
            <td>
              <h5>Subtotal</h5>
            </td>
            <td>
              <h5>$ {totalPriceOrderItems()}</h5>
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
            <td>$ {(city_tax * totalPriceOrderItems)}</td>
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
    </>
  );
}

export default RenderOrderTaxes;
