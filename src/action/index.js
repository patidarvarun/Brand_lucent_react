import { API } from "../config/config";
import axios from "axios";

function authHeader() {
  const user = JSON.parse(localStorage.getItem("data"));
  if (user) {
    return { Authorization: `Bearer ${user}` };
  } else {
    return {};
  }
}

export function userDetail(callback) {
  const request = axios.get(`${API.getUser}`, { headers: authHeader() });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function deleteUser(id, callback) {
  const request = axios.delete(`${API.deleteRegisterUser}?userid=${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function getUserDetail(id, callback) {
  const request = axios.get(`${API.getUserById}?userid=${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function createUser(data, callback) {
  const request = axios.post(`${API.register}`, data);
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function updateUser(data, callback) {
  const request = axios({
    method: "put",
    url: `${API.updateUser}`,
    data: data,
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function loginUser(data, callback) {
  const request = axios.post(`${API.login}`, data);
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function resetPass(data, callback) {
  const request = axios.post(`${API.reset}`, data);
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function resetPassword(data, callback) {
  const request = axios.post(`${API.resetPassword}`, data);
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function CategoriesDetail(callback) {
  const request = axios.get(`${API.getCategoryList}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function updateCat(id, data, callback) {
  const request = axios.put(`${API.updateCategory}/${id}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function deleteCat(id, callback) {
  const request = axios.delete(`${API.deteleCategory}/${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function addCategories(data, callback) {
  const request = axios.post(`${API.addCategory}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function getProduct(callback) {
  const request = axios.get(`${API.getProductDetail}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function getOrders(callback) {
  const request = axios.get(`${API.getAdminOrder}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function getContacts(callback) {
  const request = axios.get(`${API.getContactUs}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function getProductDetail(callback) {
  const request = axios.get(`${API.getProductoff}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function addprod(data, callback) {
  const request = axios.post(`${API.addproduct}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function addprodOffer(data, callback) {
  const request = axios.post(`${API.addproductoffer}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function deleteProduct(id, callback) {
  const request = axios.delete(`${API.deteleprod}/${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function deleteProductOffer(id, callback) {
  const request = axios.delete(`${API.deteleprodOffer}/${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function deleteContactUsData(id, callback) {
  const request = axios.delete(`${API.deteleContactUs}/${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function updateProd(id, data, callback) {
  const request = axios.put(`${API.updateProduct}/${id}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function updateProdOffer(id, data, callback) {
  const request = axios.put(`${API.updateProducts}/${id}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function createBannerr(data, callback) {
  const request = axios.post(`${API.createBanner}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function getAllBanner(callback) {
  const request = axios.get(`${API.getBanner}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function newsLetter(data, callback) {
  const request = axios.post(`${API.createNewsletter}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function updateBann(data, callback) {
  const request = axios.put(`${API.updateBanner}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function deleteBannerData(id, callback) {
  const request = axios.delete(`${API.deleteBanner}?bannerid=${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function getNewsLetter(callback) {
  const request = axios.get(`${API.getNewsletter}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function updateNewsLetterr(data, callback) {
  const request = axios.put(`${API.updateNewsLetter}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function deleteNewsLetterr(id, callback) {
  const request = axios.delete(`${API.deleteNewsLetter}?newsletterid=${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function getHeaderData(callback) {
  const request = axios.get(`${API.getHeader}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function updateHeader(data, callback) {
  const request = axios.put(`${API.updateHeader}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function deleteHeaderr(id, callback) {
  const request = axios.delete(`${API.deleteHeader}?headerid=${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function createHeaderr(data, callback) {
  const request = axios.post(`${API.createHeader}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function createFooterr(data, callback) {
  const request = axios.post(`${API.createFooter}`, data, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function getFooterr(callback) {
  const request = axios.get(`${API.getFooter}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}

export function updateFooterr(data, callback) {
  const request = axios.put(`${API.updateFooter}`, data, {
    headers: authHeader(),
  });

  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
export function deleteFooterr(id, callback) {
  const request = axios.delete(`${API.deleteFooter}?footerid=${id}`, {
    headers: authHeader(),
  });
  return (dispatch) => {
    request
      .then((res) => {
        callback(res);
      })
      .catch(function (error) {
        console.log("error: ", error.response);
        callback(error);
      });
  };
}
