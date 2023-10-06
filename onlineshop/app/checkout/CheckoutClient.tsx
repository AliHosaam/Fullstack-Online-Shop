"use client";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // create a payment intent as soon as the page loads
    const paymentData = async () => {
      if (cartProducts) {
        try {
          setLoading(true);
          setError(false);

          const res = await axios.post("/api/create-payment-intent", {
            items: cartProducts,
            payment_intent_id: paymentIntent,
          });

          setLoading(false);

          if (res.status === 401) return router.push("/login");

          const data = res.data;
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);

          return data;
        } catch (error) {
          setError(true);
          console.log("Error:", error);
          toast.error("Something went wrong...");
        }
      }
    };

    paymentData();
  }, [cartProducts, handleSetPaymentIntent, paymentIntent, router]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };

  const handleSetPaymentSuccess = useCallback((val: boolean) => {
    setPaymentSuccess(val);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
          />
        </Elements>
      )}
      {loading && <div className="text-center">Loading Checkout...</div>}
      {error && (
        <div className="text-center text-rose-500">Something went wrong...</div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-teal-500 text-center">Payment Success</div>
          <div className="max-w-[220px] w-full">
            <Button
              label="View Your Orders"
              onClick={() => router.push("/order")}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClient;
