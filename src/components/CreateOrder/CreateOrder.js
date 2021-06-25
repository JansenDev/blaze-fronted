import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CreateOrder(props) {
  // console.log(props);
  // const param = useParams("idOrder");
  // const storeAllOrders = useSelector((state)=>{
  //     state
  // })

  return (
    <>
      <h2>New Order</h2>
      <div>
        <form>
          <table width="500" class="table table-borderless">
            <tbody>
              <tr>
                <td>Customer Name</td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder="Customer"
                  />
                </td>
              </tr>
                <h2 className="mt-3">Product</h2>
              <tr>
                <td>Quantity</td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder="Quantity"
                    min="1"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Unit Price</td>
                <td>
                  <input
                    type="number"
                    class="form-control"
                    name=""
                    id=""
                    aria-describedby="helpId"
                    placeholder="Price"
                    min="1"
                    required
                  />
                </td>
              </tr>

               <a name="" id="" class="btn btn-primary" href="#" role="button">Add Item</a>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default CreateOrder;
