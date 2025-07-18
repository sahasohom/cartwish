import { useEffect } from "react";
import Table from "../Common/Table";
import "./MyOrderPage.css";
import useData from "../../hooks/useData";

const MyOrderPage = () => {
  const [orders] = useData("/order");
  const getProductsString = (order) => {
    const productStrArr = order.products.map((order) => {
      return `${order.product.title} (${order.quantity})`;
    });
    return productStrArr.join(", ");
  };

  return (
    <section className="align_center myorder_page">
      {orders && orders.length > 0 ? (
        <Table headings={["Order", "Products", "Total", "Status"]}>
          <tbody>
            {orders &&
              orders.map((order, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td style={{ width: "50%" }}>{getProductsString(order)}</td>
                    <td>${order.total + 5}</td>
                    <td>{order.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <h1>No Order Found</h1>
      )}
    </section>
  );
};

export default MyOrderPage;
