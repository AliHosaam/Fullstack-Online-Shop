import { Container } from "@mui/material";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/app/utils/products";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  const product = products.find((item) => item.id === params.productId);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4 ">
          <div className="font-bold text-2x1">Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
