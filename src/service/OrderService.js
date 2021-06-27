import axios from "axios";

export const updateOrder = async (orderFormBody) => {
  const dataResponse = await axios({
    method: "put",
    url: `http://localhost:8080/orders/`,
    data: orderFormBody,
  })
  .catch((err)=> console.log(err));
  return dataResponse;
};

export const deleteOrderById = async (idItem) => {
  const dataResponse = await axios({
    method: "delete",
    url: `http://localhost:8080/orders/${idItem}`,
  })
  .catch((err)=> console.log(err));
  return dataResponse;
};

export const createOrder = async (orderFormBody) => {
  const dataResponse = await axios({
    method: "post",
    url: `http://localhost:8080/orders/`,
    data: orderFormBody,
  })
  .catch((err)=> console.log(err));
  return dataResponse;
};
