const API_Name = {
  LOGIN: 'login',
  GET_ALL_USERS: 'get_all_users',
  REGISTER_BUYER: 'register',
  LOGIN_MOBILE: 'login_mobile',
  FORGOT_PASSWORD: 'forgot_password',
  GET_ALL_NOTIFICATIONS: 'get_all_notifications',
  GET_TRENDING_PRODUCTS: 'get_trending_products',
  GET_FEATURED_PRODUCTS: 'get_featured_products',
  GET_ALL_BRANDS: 'get_official_brands',
  GET_ALL_CATEGORIES: 'get_all_categories',
  SEARCH_PRODUCT: 'search_products',
  CHANGE_PASSWORD: 'update_password',
  GET_MERCHANT_PRODUCTS: 'get_merchant_products',
  GET_LATEST_PRODUCTS: 'get_latest_products',
  GET_MERCHANT_LIST: 'get_merchant_list',
  ADD_FAVORITE_MERCHANT: 'add_favorite_merchant',
  GET_USER_DETAIL: 'get_user_details',
  REGISTER_WITH_MOBILE: 'login_mobile',
  VERIFY_OTP: 'verify_otp'
}

const URL = 'http://13.228.129.207:8093/api/';


export {
  API_Name
}


// ApiManager class calls the onApiResponse Method from caller
export default class ApiManager {

  parent = null

  constructor(parent) {
    this.parent = parent;
  }


  async makeCall(apiName, token = '', body, callBackFunc = null) {
    try {
      let responseJson = await fetch(URL + apiName, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + token,
        },
        body: JSON.stringify(body)
      }
      ).then(res => {
        console.log('response', res);
        return res.json()
      });
      callBackFunc !== null ? callBackFunc(responseJson) : this.parent.onApiResponse(responseJson);
    } catch (error) {
      this.parent.onApiResponse('internal server error:' + error.message);
    }
  }
}

