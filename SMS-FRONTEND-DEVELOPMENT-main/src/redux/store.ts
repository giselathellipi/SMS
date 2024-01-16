import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { combineReducers } from "redux";

// slices
import { LoginState } from "redux/Authentication/Login/LoginSlice";
import authReducer from "redux/Authentication/Login/LoginSlice";
import { AuthRegState } from "redux/Authentication/Register/RegisterSlice";
import registerSlice from "redux/Authentication/Register/RegisterSlice";
import { RegPasswordState } from "redux/Authentication/NewPassword/NewPasswordSlice";
import newPasswordSlice from "redux/Authentication/NewPassword/NewPasswordSlice";
import { ResetPasswordState } from "redux/Authentication/ResetPassword/ResetPasswordSlice";
import resetPasswordSlice from "redux/Authentication/ResetPassword/ResetPasswordSlice";
import productCategorySlice from "redux/Pages/ProductCategory/ProductCategorySlice";
import { ProductsPropsState } from "redux/Pages/ProductCategory/ProductCategorySlice";
import { ShopProductPropsState } from "redux/Pages/ShopCategory/ShopCategorySlice";
import shopProductSlice from "redux/Pages/ShopCategory/ShopCategorySlice";
import { ProductImageState } from "redux/Pages/ImageCategory/ImageCategorySlice";
import imageCategorySlice from "redux/Pages/ImageCategory/ImageCategorySlice";
import { ProductState } from "redux/Pages/Product/ProductSlice";
import productSlice from "redux/Pages/Product/ProductSlice";
import { ProductFormState } from "redux/Containers/ProductForm/ProductFormSlice";
import productFormSlice from "redux/Containers/ProductForm/ProductFormSlice";
import { OrderState } from "redux/Pages/Orders/OrdersSlice";
import orderSlice from "redux/Pages/Orders/OrdersSlice";
import { OrderFormState } from "redux/Containers/OrderForm/OrderFormSlice";
import orderFormSlice from "redux/Containers/OrderForm/OrderFormSlice";
import { CalculateItem } from "redux/Containers/CalculateItem/CalculateItemSlice";
import calculateItemSlice from "redux/Containers/CalculateItem/CalculateItemSlice";
import { NotificationPropsState } from "redux/Pages/AdminNotification/AdminNotificationSlice";
import adminNotificationSlice from "redux/Pages/AdminNotification/AdminNotificationSlice";
import { VendorFormState } from "redux/Containers/VendorForm/VendorFormSlice";
import vendorFormSlice from "redux/Containers/VendorForm/VendorFormSlice";
import { AccountState } from "redux/Containers/Account/AccountSlice";
import accountSlice from "redux/Containers/Account/AccountSlice";
import { AccountTypeState } from "redux/Pages/AccountType/AccountTypeSlice";
import accountTypeSlice from "redux/Pages/AccountType/AccountTypeSlice";
import { ContactState } from "redux/Pages/Contact/ContactSlice";
import contactSlice from "redux/Pages/Contact/ContactSlice";
import snackbarSlice from "./slices/slice-snackbar";
import { SnackbarState } from "./slices/slice-snackbar";

type RootState = {
  login: LoginState;
  register: AuthRegState;
  newPassword: RegPasswordState;
  resetPassword: ResetPasswordState;
  products: ProductsPropsState;
  shopProducts: ShopProductPropsState;
  imageCategory: ProductImageState;
  product: ProductState;
  productForm: ProductFormState;
  order: OrderState;
  orderForm: OrderFormState;
  calculate: CalculateItem;
  notifications: NotificationPropsState;
  vendor: VendorFormState;
  account: AccountState;
  accountType: AccountTypeState;
  contact: ContactState;
  snackbar: SnackbarState;
};
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: [
    "login",
    "register",
    "newPassword",
    "resetPassword",
    "products",
    "shopProducts",
    "imageCategory",
    "product",
    "productForm",
    "order",
    "orderForm",
    "calculate",
    "notifications",
    "vendor",
    "account",
    "accountType",
    "contact",
    "snackbar",
  ],
};

const rootReducer = combineReducers({
  login: authReducer,
  register: registerSlice,
  newPassword: newPasswordSlice,
  resetPassword: resetPasswordSlice,
  products: productCategorySlice,
  shopProducts: shopProductSlice,
  imageCategory: imageCategorySlice,
  product: productSlice,
  productForm: productFormSlice,
  order: orderSlice,
  orderForm: orderFormSlice,
  calculate: calculateItemSlice,
  notifications: adminNotificationSlice,
  vendor: vendorFormSlice,
  account: accountSlice,
  accountType: accountTypeSlice,
  contact: contactSlice,
  snackbar: snackbarSlice,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "user/UserLogin/fulfilled",
          "user/registerUser/fulfilled",
          "user/newPassword/fulfilled",
          "user/resetPassword/fulfilled",
          "user/productCategory/fulfilled",
          "user/shopProductCategory/fulfilled",
          "user/imageCategory/fulfilled",
          "user/productProp/fulfilled",
          "user/productForm/fulfilled",
          "user/orderProp/fulfilled",
          "user/orderForm/fulfilled",
          "user/adminNotification/fulfilled",
          "user/vendorForm/fulfilled",
          "persist/PERSIST",
        ],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type { RootState };
