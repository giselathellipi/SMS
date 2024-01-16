import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import Login from "Pages/Authentication/Login/Login.component";
import Register from "Pages/Authentication/Register/Register.component";
import NewPassword from "Pages/Authentication/NewPassword/NewPassword.component";
import OutletPage from "Components/Outletpage/Outletpage.component";
import ResetPassword from "Pages/Authentication/ResetPassword/ResetPassword.component";
import ForgotPassword from "Pages/Authentication/ForgotPassword/ForgotPassword.component";
import Home from "Pages/Home/Home.component";
import ShopCategory from "Pages/ShopCategory/ShopCategory.component";
import Product from "Pages/Product/Product.component";
import ProductForm from "Containers/ProductForm/ProductForm.component";
import ProductsTable from "Components/ProductsTable/ProductsTable.component";
import OrdersTable from "Components/OrdersTable/OrdersTable.component";
import OrderForm from "Containers/OrderForm/OrderForm.component";
import UserProfile from "Pages/UserProfile/UserProfile.component";
import CreateCategory from "Pages/CreateCategory/CreateCategory.component";
import GetCategories from "Pages/GetCategories/GetCategories.component";
import AdminNotifications from "Components/AdminNotifications/AdminNotifications.component";
import AdminMessageNotification from "Components/AdminMessageNotification/AdminMessageNotification.component";
import Vendor from "Components/Vendor/Vendor.component";
import VendorsTable from "Components/VendorsTable/VendorsTable.component";
import VendorDetails from "Components/VendorDetails/VendorDetails.component";
import ProductDetails from "Components/ProductDetails/ProductDetails.component";
import OrderDetailsComponent from "Components/OrderDetails/OrderDetails.component";
import AccountB2BTable from "Components/AccountB2BTable/AccountB2BTable.component";
import B2BForm from "Components/B2BForm/B2BForm.component";
import B2CForm from "Components/B2CForm/B2CForm.component";
import B2BAccountTypeDetails from "Components/B2BAccountTypeDetails/B2BAccountTypeDetails.component";
import B2CAccountTypeDetails from "Components/B2CAccountTypeDetails/B2CAccountTypeDetails.component";
import Contacts from "Components/Contacts/Contacts.component";
import ContactsTable from "Components/ContactsTable/ContactsTable.component";
import ContactDetails from "Components/ContactDetails/ContactDetails.component";
import { AccountB2CTableContainer } from "Components/AccountB2CTable/style/AccountB2CTable.style";
import LeadSource from "Components/LeadSource/LeadSource.component";
import LeadSourceTable from "Components/LeadSourceTable/LeadSourceTable.component";
import LeadSourceDetails from "Components/LeadSourceDetails/LeadSourceDetails.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

const App: FC<{}> = () => {
  const logoProps = {
    profilePhoto: "example_photo_url",
    profilePhotoType: "example_type",
    reload: true,
    sendPhoto: (file: File) => {},
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OutletPage />}>
            <Route element={<SnackBarList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="auth/sms/registration/:token"
              element={<NewPassword />}
            />
            <Route
              path="/SMS/resetPassword/:token"
              element={<ResetPassword />}
            />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/shopcategory/:categoryId"
              element={<ShopCategory />}
            />
            <Route path="/product/:id" element={<Product />} />
            <Route
              path="/productForm"
              element={<ProductForm {...logoProps} />}
            />
            <Route path="/table" element={<ProductsTable />} />
            <Route path="/orderTable" element={<OrdersTable />} />
            <Route path="/orderTable" element={<OrdersTable />} />
            <Route path="/orderForm" element={<OrderForm />} />
            <Route
              path="/orderDetails/:orderId"
              element={<OrderDetailsComponent />}
            />
            <Route path="/userProfile" element={<UserProfile />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/getCategory" element={<GetCategories />} />
            <Route path="/adminNotification" element={<AdminNotifications />} />
            <Route
              path="/adminMessage/:id"
              element={<AdminMessageNotification />}
            />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/vendorTable" element={<VendorsTable />} />
            <Route path="/vendorDetails/:id" element={<VendorDetails />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/accountB2BTable" element={<AccountB2BTable />} />
            <Route
              path="/accountB2BDetails/:id"
              element={<B2BAccountTypeDetails />}
            />
            <Route
              path="/accountB2CDetails/:id"
              element={<B2CAccountTypeDetails />}
            />
            <Route
              path="/accountB2CTable"
              element={<AccountB2CTableContainer />}
            />
            <Route path="/B2BForm" element={<B2BForm />} />
            <Route path="/B2CForm" element={<B2CForm />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/contactsTable" element={<ContactsTable />} />
            <Route path="/contactDetails/:id" element={<ContactDetails />} />
            <Route path="/leadSource" element={<LeadSource />} />
            <Route path="/leadSourceTable" element={<LeadSourceTable />} />
            <Route
              path="/leadSourceDetails/:id"
              element={<LeadSourceDetails />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
