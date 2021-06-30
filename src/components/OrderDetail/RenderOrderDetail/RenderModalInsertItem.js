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
import { map } from "lodash";

function RenderModalInsertItem() {
  const dispatch = useDispatch();
  let formOrderBody = useSelector((state) => state.orderById);
  let listOrderItems = formOrderBody.listOrdersItems;
  const modalManageType = useSelector((state) => state.modalAction.action);
  const idOrderItem = useSelector((state) => state.modalAction.idItem);
  const modalOpened = useSelector((state) => state.modalAction.opened);
  const handlerFormItem = useSelector((state) => state.modalHandler);
  const allProducts = useSelector((state) => state.allProducts.products);
  console.log(allProducts);

  // !functions
  const handleChangeFormOrderItem = async (e) => {
    e.preventDefault();
    console.log(e.target.value);

    dispatch(
      setHandlerFormItem({
        ...handlerFormItem,
        [e.target.name]: e.target.value,
      })
    );
    if (e.target.name == "name" && e.target.value != "") {
      const priceProductSelected = allProducts.filter((product)=> product.name == e.target.value )[0];
      console.log(priceProductSelected)
      dispatch(
        setHandlerFormItem({
          unit_price: priceProductSelected.unit_price,
        })
      );
    }
  };

  const insertNewOrderItem = async (e) => {
    e.preventDefault();

    if (
      handlerFormItem.name == "" ||
      handlerFormItem.quantity == "" ||
      handlerFormItem.unit_price == ""
    ) {
      Swal.fire(swalAlertConfig("Empty fields"));
      return;
    }

    if(typeof(handlerFormItem.unit_price) === "string"){
      Swal.fire(swalAlertConfig("Pick product again!"));
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
      Swal.fire(swalAlertConfig("Empty fields"));
      return;
    }
    if(typeof(handlerFormItem.unit_price) === "string"){
      Swal.fire(swalAlertConfig("Pick product again!"));
      return;
    }
    console.log(typeof(handlerFormItem.unit_price) === "string");
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
      insertNewOrderItem(e);
    }

    if (modalManageType == "Edit") {
      editOrderItem(e, idOrderItem);
    }

    const modalConfig = {
      idItem: "",
      opened: false,
    };

    dispatch(setModalOrder(modalConfig));
  };

  const btnCloseModal = () => {
    const modalConfig = {
      idItem: "",
      opened: false,
    };

    dispatch(setModalOrder(modalConfig));
  };

  const cleanModalFiles = () => {
    dispatch(setHandlerFormItem(orderItemTemplateFormat()));
  };

  const renderComboBox = map(allProducts, (product, index) => {
    if(product.active == "active"){
      return (
        <option key={index} value={product.name}>
          {product.name}
        </option>
      );
    }
  });

  return (
    <>
      {modalOpened && (
        <div className="modalCap">
          <div className="myModalContainer">
            <form className="myModal" onSubmit={onSubmitOrderItem}>
              <table className="table table-borderless">
                <thead>
                  <tr className="text-center">
                    <th className="h2" colSpan="3">
                      {modalManageType} Item
                    </th>
                    <th
                      onClick={() => btnCloseModal()}
                      type="button"
                      className="close text-muted"
                    >
                      <span aria-hidden="true">&times;</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">Name</td>
                    <td>
                      {/* <input
                        name="name"
                        className="form-control"
                        type="text"
                        value={handlerFormItem.name}
                        placeholder="Name"
                        onChange={handleChangeFormOrderItem}
                      /> */}
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handleChangeFormOrderItem}
                        name="name"
                      >
                        <option value="">{handlerFormItem.name}</option>
                        {renderComboBox}
                      </select>
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
                    <td scope="row">Unit Price ($)</td>
                    <td>
                      <input
                        name="unit_price"
                        className="form-control"
                        type="text"
                        value={handlerFormItem.unit_price}
                        placeholder="0.00 "
                        onChange={handleChangeFormOrderItem}
                        disabled
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <button className="btn btn-primary btn-block" type="submit">
                  Save!
                </button>
              </div>
            </form>
          </div>
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
