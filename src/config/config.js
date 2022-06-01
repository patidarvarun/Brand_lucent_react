// export const BASE_URL = "http://94.237.3.78:4001";
// export const BASE_URL = "http://localhost:4001";
// export const BASE_URL = "https://brandnode.herokuapp.com";
export const BASE_URL = "http://95.111.202.157:4001";

export const API = {
  register: `${BASE_URL}/api/createUser`,
  login: `${BASE_URL}/api/login`,
  reset: `${BASE_URL}/api/sendMailtoRestPw`,
  resetPassword: `${BASE_URL}/api/resetPassword`,

  getUser: `${BASE_URL}/api/getUsers`,
  getUserById: `${BASE_URL}/api/getUser`,
  updateUser: `${BASE_URL}/api/updateUser`,
  deleteRegisterUser: `${BASE_URL}/api/deleteUser`,

  getCategoryList: `${BASE_URL}/api/getCategory`,
  updateCategory: `${BASE_URL}/api/updateCategory`,
  deteleCategory: `${BASE_URL}/api/deleteCategory`,
  addCategory: `${BASE_URL}/api/createCategory`,

  getProductDetail: `${BASE_URL}/api/getProducts`,
  getProductoff: `${BASE_URL}/api/GetProductOffer`,
  updateProduct: `${BASE_URL}/api/updateProduct`,
  updateProducts: `${BASE_URL}/api/updateProductOffer`,
  addproduct: `${BASE_URL}/api/createProduct`,
  addproductoffer: `${BASE_URL}/api/createProductOffer`,
  deteleprod: `${BASE_URL}/api/deleteProduct`,
  deteleprodOffer: `${BASE_URL}/api/deleteProductOffer`,

  createBanner: `${BASE_URL}/api/createBanner`,
  getBanner: `${BASE_URL}/api/getBanner`,
  updateBanner: `${BASE_URL}/api/updateBanner`,
  deleteBanner: `${BASE_URL}/api/deleteBanner`,

  getNewsletter: `${BASE_URL}/api/getNewsLetter`,
  createNewsletter: `${BASE_URL}/api/createNewsLetter`,
  updateNewsLetter: `${BASE_URL}/api/updateNewsLetter`,
  deleteNewsLetter: `${BASE_URL}/api/deleteNewsLetter`,

  getHeader: `${BASE_URL}/api/getHeader`,
  createHeader: `${BASE_URL}/api/createHeader`,
  updateHeader: `${BASE_URL}/api/updateHeader`,
  deleteHeader: `${BASE_URL}/api/deleteHeader`,

  getFooter: `${BASE_URL}/api/getFooter`,
  createFooter: `${BASE_URL}/api/createFooter`,
  updateFooter: `${BASE_URL}/api/updateFooter`,
  deleteFooter: `${BASE_URL}/api/deleteFooter`,

  viewCart: `${BASE_URL}/api/viewCart/?userid=`,
  deleteCartItem: `${BASE_URL}/api/removeProductOfCart`,

  addAccountInfo: `${BASE_URL}/api/addAccountInfo`,
  locationDetails: `${BASE_URL}/api/getAccountInfo?userid=`,
  locationChange: `${BASE_URL}/api/changeLocation`,
  viewAddress: `${BASE_URL}/api/getAccountInfo?userid=`,

  paymentMethod: `${BASE_URL}/api/payment/paypalPayment`,
  getorder: `${BASE_URL}/api/getOrders/`,
  getAdminOrder: `${BASE_URL}/api/getAllOrders`,
  orderidDetails: `${BASE_URL}/api/getUserOrder/`,
};
