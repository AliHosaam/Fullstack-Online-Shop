import Link from "next/link";
import { CartProductType } from "../product/[productId]/ProductDetails";
import { formatPrice } from "../utils/formatPrice";
import { truncateText } from "../utils/truncateText";
import { useCart } from "../hooks/useCart";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveFromCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
  } = useCart();

  return (
    <div className="grid grid-cols-5 text-xs md:text-sd gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImg.image}
              fill
              alt={item.name}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              onClick={() => handleRemoveFromCart(item)}
              className="underline text-slate-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter={true}
          cartProduct={item}
          handleQuantityDecrease={() => {
            handleQuantityDecrease(item);
          }}
          handleQuantityIncrease={() => {
            handleQuantityIncrease(item);
          }}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
