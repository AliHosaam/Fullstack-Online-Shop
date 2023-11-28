import Container from "@/app/components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getOrderByUserId from "@/actions/getOrderByUserId";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Ooops! Access denied" />;

  const orders = await getOrderByUserId(currentUser.id);

  if (!orders) return <NullData title="No orders yet..." />;

  return (
    <div className="pt-8">
      <Container>
        <OrderClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
