import { combineReducers } from "redux";
import { BannerReducer } from "./BannerReducer";
import { CartReducer } from "./CartReducer";
import { CategoryReducer } from "./CategoryReducer";
import { FooterReducer } from "./FooterReducer";
import { HeaderReducer } from "./HeaderReducer";
import { LocationReducer } from "./LocationReducer";
import { NewsletterReducer } from "./NewsletterReducer";
import { PaymentReducer } from "./PaymentReducer";
import { ProductDetailReducer } from "./ProductDetailReducer";
import { ProductReducer } from "./ProductReducer";
import { SellingReducer } from "./SellingReducer";
import { OrderDataReducer } from "./OrderDataReducer";

const reducers = combineReducers({
  allBanners: BannerReducer,
  allCat: CategoryReducer,
  allHeader: HeaderReducer,
  allSelling: SellingReducer,
  allNews: NewsletterReducer,
  allFooter: FooterReducer,
  allProduct: ProductReducer,
  allProductDetail: ProductDetailReducer,
  cartData: CartReducer,
  getLocation: LocationReducer,
  paymentT: PaymentReducer,
  orderDetail: OrderDataReducer,
});
export default reducers;
