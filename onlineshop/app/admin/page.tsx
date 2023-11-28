import getOrders from "@/actions/getOrders";
import Summary from "./Summary";
import getProducts from "@/actions/getProducts";
import getUsers from "@/actions/getUsers";
import NullData from "../components/NullData";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import BarGraph from "./BarGraph";
import getGraphData from "@/actions/getGraphData";

const Admin = async () => {
  const orders = await getOrders();
  const products = await getProducts({ category: null });
  const users = await getUsers();
  const currentUser = await getCurrentUser();
  const graphData = await getGraphData();

  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Ooops! Access denied" />;
  if (!orders) return <NullData title="There are no orders yet" />;
  if (!products) return <NullData title="There are no products yet" />;
  if (!users) return <NullData title="There are no users yet" />;

  return (
    <div className="pt-8">
      <Container>
        <Summary orders={orders} products={products} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
