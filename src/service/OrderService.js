import axios from "axios";

export const updateOrder = async (orderFormBody) => {
  const dataResponse = await axios({
    method: "put",
    url: `http://localhost:8080/orders/`,
    data: orderFormBody,
  });

  return dataResponse;
};

export const deleteOrderById = async (idItem) => {
  const dataResponse = await axios({
    method: "delete",
    url: `http://localhost:8080/orders/${idItem}`,
  });
  return dataResponse;
};

