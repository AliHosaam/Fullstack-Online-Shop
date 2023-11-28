import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/app/utils/formatPrice";
import { Product } from "@prisma/client";
import { MdClose, MdDone } from "react-icons/md";
import ProductItem from "./ProductItem";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-5">
      <div className="mt-8">
        <Heading title="Product Details" />
      </div>
      <div>Order ID: {product.id}</div>
      <div>
        Price: <span className="font-bold">{formatPrice(product.price)}</span>
      </div>
      <div className="flex gap-2 items-center">
        <div>inStock Status:</div>
        <div>
          {product.inStock === true ? (
            <Status
              text="in stock"
              icon={MdDone}
              bg="bg-teal-200"
              color="text-teal-700"
            />
          ) : (
            <Status
              text="out of stock"
              icon={MdClose}
              bg="bg-rose-200"
              color="text-rose-700"
            />
          )}
        </div>
      </div>
      <div>
        {product.image?.map((item) => {
          return <ProductItem key={item.codeColor} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ProductDetails;
