import React from "react";
// *Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectOrder,
  setHandlerFormItem,
  setModalOrder,
} from "../../../redux/actions/orderActions";

// *local imports
import { updateOrder } from "../../../service/OrderService";

// *utils
import Swal from "sweetalert2";

function RenderModalInsertItem() {
  const dispatch = useDispatch();
  let formOrderBody = useSelector((state) => state.orderById);
  let listOrderItems = formOrderBody.listOrdersItems;
  const modalManageType = useSelector((state) => state.modalAction.action);
  const idOrderItem = useSelector((state) => state.modalAction.idItem);
  const modalOpened = useSelector((state) => state.modalAction.opened);
  const handlerFormItem = useSelector((state) => state.modalHandler);

  // !functions
  const handleChangeFormOrderItem = async (e) => {
    e.preventDefault();

    dispatch(
      setHandlerFormItem({
        ...handlerFormItem,
        [e.target.name]: e.target.value,
      })
    );
  };

  const insertNewOrderItem = async (e) => {
    e.preventDefault();

    if (
      handlerFormItem.name == "" ||
      handlerFormItem.quantity == "" ||
      handlerFormItem.unit_price == ""
    ) {
      Swal.fire(swalAlertConfig());
      return;
    }
    for (let index = 0; index < listOrderItems.length; index++) {
      if (listOrderItems[index].name == handlerFormItem.name) {
        const itemNameDuplicated = handlerFormItem.name;
        Swal.fire(swalAlertConfig(`${itemNameDuplicated} exists!`));
        return;
      }
    }

    listOrderItems.push(handlerFormItem);
    dispatch(setSelectOrder(formOrderBody));

    const data = await updateOrder(formOrderBody);
    cleanModalFiles();
  };

  const editOrderItem = async (e, idOrderItem) => {
    e.preventDefault();
    console.log(idOrderItem);
    if (
      handlerFormItem.name == "" ||
      handlerFormItem.quantity == "" ||
      handlerFormItem.unit_price == ""
    ) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Empty fields",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const itemsCleaned = duplicateItemClean(idOrderItem);
    itemsCleaned.push(handlerFormItem);
    formOrderBody.listOrdersItems = itemsCleaned;

    dispatch(setSelectOrder(formOrderBody));
    const data = await updateOrder(formOrderBody);
    cleanModalFiles();
  };
  const duplicateItemClean = (nameItem) => {
    const itemListCleaned = listOrderItems.filter(
      (item) => item.name != nameItem
    );
    return itemListCleaned;
  };

  const onSubmitOrderItem = (e) => {
    e.preventDefault();
    if (modalManageType == "New") {
      console.log("SUBMIT new");
      insertNewOrderItem(e);
    }

    if (modalManageType == "Edit") {
      console.log("SUBMIT edit");
      editOrderItem(e, idOrderItem);
    }

    const modalConfig = {
      idItem: "",
      opened: false,
    };

    dispatch(setModalOrder(modalConfig));
  };

  const cleanModalFiles = () => {
    dispatch(setHandlerFormItem(orderItemTemplateFormat()));
  };

  return (
    <>
      {modalOpened && (
        <div>
          <form onSubmit={onSubmitOrderItem}>
            <table className="table table-bordered mt-5">
              <thead>
                <tr className="text-center">
                  <th colSpan="3">{modalManageType} Item</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td scope="row">Name</td>
                  <td>
                    <input
                      name="name"
                      className="form-control"
                      type="text"
                      value={handlerFormItem.name}
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
                      className="form-control"
                      type="number"
                      value={handlerFormItem.quantity}
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
                      className="form-control"
                      type="text"
                      value={handlerFormItem.unit_price}
                      placeholder="Unit Price"
                      onChange={handleChangeFormOrderItem}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <button className="btn btn-primary btn-block mb-5" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// ! Templates and  settings
const orderItemTemplateFormat = () => {
  return {
    name: "",
    quantity: "",
    unit_price: "",
  };
};

const swalAlertConfig = (getTitle, time) => {
  const timer = time || 1500;
  const title = getTitle || "Empty fields";
  return {
    position: "center",
    icon: "info",
    showConfirmButton: false,
    title,
    timer,
  };
};

export default RenderModalInsertItem;
