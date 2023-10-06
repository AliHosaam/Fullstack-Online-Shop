import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { CartProductType } from "../product/[productId]/ProductDetails";
import toast from "react-hot-toast";

interface CartContextType {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveFromCart: (product: CartProductType) => void;
  handleQuantityDecrease: (product: CartProductType) => void;
  handleQuantityIncrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
}
interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCardProducts] = useState<CartProductType[] | null>(
    null
  );
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("onlineShopCartItem");
    const cartProducts: CartProductType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);

    setPaymentIntent(paymentIntent);
    setCardProducts(cartProducts);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCardProducts((prev) => {
      let updatedCart;

      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }

      toast.success("Product added to cart");
      localStorage.setItem("onlineShopCartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredCart = cartProducts.filter((item) => {
          return item.id !== product.id;
        });

        setCardProducts(filteredCart);
        toast.error("Product deleted from cart");
        localStorage.setItem(
          "onlineShopCartItem",
          JSON.stringify(filteredCart)
        );
      }
    },
    [cartProducts]
  );

  const handleQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 1) return toast.error("Ooops, Minimum Reached!");

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity -= 1;
        }

        setCardProducts(updatedCart);
        localStorage.setItem("onlineShopCartItem", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;

      if (product.quantity === 99)
        return toast.error("Ooops, Maximum Reached!");

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity += 1;
        }

        setCardProducts(updatedCart);
        localStorage.setItem("onlineShopCartItem", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  useEffect(() => {
    const getsTotals = () => {
      if (cartProducts) {
        const { total, quantity } = cartProducts.reduce(
          (acc, item) => {
            const totalAmount = item.price * item.quantity;

            acc.total += totalAmount;
            acc.quantity += item.quantity;

            return acc;
          },
          {
            total: 0,
            quantity: 0,
          }
        );

        setCartTotalQuantity(quantity);
        setCartTotalAmount(total);
      }
    };
    getsTotals();
  }, [cartProducts]);

  const handleClearCart = useCallback(() => {
    setCardProducts([]);
    setCartTotalQuantity(0);
    localStorage.setItem("onlineShopCartItem", JSON.stringify([]));
  }, []);

  const handleSetPaymentIntent = useCallback((val: string | null) => {
    setPaymentIntent(val);
    localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
  }, []);

  const value = {
    cartTotalQuantity,
    cartProducts,
    handleAddProductToCart,
    handleRemoveFromCart,
    handleQuantityDecrease,
    handleQuantityIncrease,
    handleClearCart,
    cartTotalAmount,
    paymentIntent,
    handleSetPaymentIntent,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("UseCart must be within a CartContextProvider");
  }

  return context;
};
