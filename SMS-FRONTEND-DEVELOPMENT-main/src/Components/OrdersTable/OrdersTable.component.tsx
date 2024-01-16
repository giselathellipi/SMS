import { FC, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//mui icons
import ForwardIcon from "@mui/icons-material/Forward";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

//components
import GenericButton from "Components/GenericButton/GenericButton.component";
import SnackBarList from "Components/SnackbarList/SnackbarList.component";

//style
import {
  Table,
  TableAndDatepickerHolder,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "Components/ProductsTable/style/ProductsTable.style";
import {
  AddNewOrderButton,
  AddOrderNameContainerPlusIcon,
  OrderButtonName,
  OrdersTableContainer,
  OrdersTableHead,
  TableBody,
} from "./style/OrdersTable.style";

//redux
import { AppDispatch } from "redux/store";
import { useDispatch } from "react-redux";
import {
  OrderDetails,
  fetchOrderDetails,
} from "redux/Pages/Orders/OrdersSlice";
import { addSnackbar } from "redux/actions/actions-snackbar";

const OrdersTable: FC<{}> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders, setOrders] = useState<OrderDetails[]>([]);

  const dispatch: AppDispatch = useDispatch();
  console.log("orders", orders);

  //get order api
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const result = await dispatch(fetchOrderDetails());
        if (fetchOrderDetails.fulfilled.match(result)) {
          setOrders(result.payload);
        }
      } catch (error) {
        dispatch(
          addSnackbar({
            id: "error",
            type: "error",
            message: "Error fetching orders!",
          })
        );
      }
    };

    fetchOrderData();
  }, [dispatch, location.pathname]);

  const orderButtonName = (
    <AddOrderNameContainerPlusIcon>
      <AddCircleOutlineIcon />
      <OrderButtonName>Add order</OrderButtonName>
    </AddOrderNameContainerPlusIcon>
  );

  const handleGoToOrderLinkClick = (order: OrderDetails) => {
    console.log(order);
    navigate(`/orderDetails/${order.id}`);
  };

  return (
    <OrdersTableContainer>
      <AddNewOrderButton>
        <GenericButton
          name={orderButtonName}
          onClick={() => navigate("/orderForm")}
        />
      </AddNewOrderButton>
      <TableAndDatepickerHolder>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <OrdersTableHead>Account Name</OrdersTableHead>
                <OrdersTableHead>Order Number</OrdersTableHead>
                <OrdersTableHead>Order Source</OrdersTableHead>
                <OrdersTableHead>Order Notes</OrdersTableHead>
                <OrdersTableHead>Order Status</OrdersTableHead>
                <OrdersTableHead>Street</OrdersTableHead>
                <OrdersTableHead>City</OrdersTableHead>
                <OrdersTableHead>State</OrdersTableHead>
                <OrdersTableHead>Country</OrdersTableHead>
                <OrdersTableHead>Postal Code</OrdersTableHead>
                <OrdersTableHead>Total Amount</OrdersTableHead>
                <OrdersTableHead>Actions</OrdersTableHead>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((orderGroup: any, index: number) =>
                orderGroup.map((order: any, subIndex: number) => (
                  <TableRow key={`${index}-${subIndex}`}>
                    <TableCell>
                      {order?.accountBasicDTO?.accountType === "B2B"
                        ? order?.accountBasicDTO?.accountName
                        : `${order?.accountBasicDTO?.firstName} ${order?.accountBasicDTO?.lastName}`}
                    </TableCell>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{order.orderSource}</TableCell>
                    <TableCell>{order?.orderNotes}</TableCell>
                    <TableCell>{order?.orderStatus}</TableCell>
                    <TableCell>{order?.shippingAddress?.street}</TableCell>
                    <TableCell>{order?.shippingAddress?.city}</TableCell>
                    <TableCell>{order?.shippingAddress?.state}</TableCell>
                    <TableCell>{order?.shippingAddress?.country}</TableCell>
                    <TableCell>{order?.shippingAddress?.postalCode}</TableCell>
                    <TableCell>${order?.totalAmount}</TableCell>
                    <TableCell>
                      <ForwardIcon
                        color="primary"
                        fontSize="large"
                        onClick={() => handleGoToOrderLinkClick(order)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableAndDatepickerHolder>
      <SnackBarList />
    </OrdersTableContainer>
  );
};

export default OrdersTable;
