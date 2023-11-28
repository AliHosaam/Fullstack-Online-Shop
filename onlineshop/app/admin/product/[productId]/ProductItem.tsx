import Image from "next/image";

interface ProductItemProps {
  item: Image;
}

type Image = {
  color: string;
  codeColor: string;
  image: string;
};

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
  return (
    <div className="flex">
      <div className="relative w-[70px] h-[100px]">
        <Image
          src={item.image}
          alt={item.codeColor}
          fill
          className="rounded-md"
        />
      </div>
      <div>
        <div className="px-5 py-8 font-semibold">{item.color}</div>
      </div>
    </div>
  );
};

export default ProductItem;
