"use client";
import { useCart } from "@/app/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
  const { cartTotalQuantity } = useCart();
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/cart")}
      className="relative cursor-pointer"
    >
      <div className="text-3x1">
        <CiShoppingCart size={28} />
      </div>
      <span className="absolute pl-2 pt-0.5 top-[-10px] right-[-10px] bg-slate-700 text-white h-6 w-6 rounded-full text-sm">
        {cartTotalQuantity}
      </span>
    </div>
  );
};

export default CartCount;
