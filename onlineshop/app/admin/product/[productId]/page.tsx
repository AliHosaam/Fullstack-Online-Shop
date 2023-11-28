import { Container } from "@mui/material";
import NullData from "@/app/components/NullData";
import ProductDetails from "./ProductDetails";
import getProductById from "@/actions/getProductById";

interface IParams {
  productId?: string;
}

const Product = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);

  if (!product) return <NullData title="No product..." />;

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
