import { ActionTypes } from "../constant/action-types";

export const setBanner = (banData) => {
  return {
    type: ActionTypes.SET_BANNERS,
    payload: banData,
  };
};

export const getCategory = (catdata) => {
  return {
    type: ActionTypes.GET_CATEGORYS,
    payload: catdata,
  };
};

export const getheader = (headData) => {
  return {
    type: ActionTypes.GET_HEADERS,
    payload: headData,
  };
};
export const getSellingProduct = (sellingData) => {
  return {
    type: ActionTypes.GET_SELLINGPRODUCTS,
    payload: sellingData,
  };
};

export const getNewsletter = (newsData) => {
  return {
    type: ActionTypes.GET_NEWSLETTERS,
    payload: newsData,
  };
};

export const getFooter = (footerData) => {
  return {
    type: ActionTypes.GET_FOOTERS,
    payload: footerData,
  };
};
export const getProductById = (productData) => {
  return {
    type: ActionTypes.GET_PRODUCTBYID,
    payload: productData,
  };
};
export const getProductDetails = (productDetail) => {
  return {
    type: ActionTypes.GET_PRODUCTDETAILS,
    payload: productDetail,
  };
};
export const getCart = (getCartData) => {
  return {
    type: ActionTypes.GET_CART,
    payload: getCartData,
  };
};
export const getLocation = (getLocationData) => {
  return {
    type: ActionTypes.GET_LOCATION,
    payload: getLocationData,
  };
};
export const getPayment = (payment) => {
  return {
    type: ActionTypes.GET_PAYMENT,
    payload: payment,
  };
};
export const getOrderdata = (orderData) => {
  return {
    type: ActionTypes.GET_ORDERDATA,
    payload: orderData,
  };
};
