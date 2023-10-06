"use client";
import { truncateText } from "@/app/utils/truncateText";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatPrice } from "@/app/utils/formatPrice";

interface ProductCardProp {
  data: any;
}

const ProductCard: React.FC<ProductCardProp> = ({ data }) => {
  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 translate hover:scale-105 text-center text-sm"
    >
      <div className="flex flex-col items-center w-full gap-1">
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            className="w-full h-full object-contain"
            alt={data.name}
            src={data.images[0].image}
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} reviews</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
