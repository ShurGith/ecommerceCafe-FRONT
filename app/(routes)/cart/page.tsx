"use client";
import { makePaymentRequest } from "@/api/payment";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { loadStripe } from "@stripe/stripe-js";
import { StoreIcon, Trash2Icon } from "lucide-react";
import CartItem from "./components/cart-item";

export default function Page() {
  const { items, removeAll } = useCart();

  const prices = items.map((product) => product.price);
  const totalPrice = prices.reduce((total, price) => total + price, 0);
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );

  //console.log(items);
  const buyStripe = async () => {
    //  removeAll();
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: items,
      });
      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
      //  removeAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:min-h-[80vh]">
      <h1 className="mb-5 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid sm:grid-cols-2 sm:gap-5">
        <div>
          {items.length === 0 && <p>No hay productos en el carrito</p>}
          <ul>
            {items.map((item) => (
              <CartItem key={item.id} product={item} />
            ))}
          </ul>
        </div>

        {items.length > 0 &&
          <div className="max-w-xl">
            <div className="p-6 rounded-lg">
              <p className="mb-3 text-lg font-semibold">Order Summary</p>
              <Separator />
              <div className="flex justify-between gap-5 my-4">

                <h4>Order total</h4>
                <h2>{formatPrice(totalPrice)}</h2>
              </div>
              <div className="flex items-center justify-center w-full mt-3 gap-6">
                <Button className="w-full gap-6" variant={"buyit"} onClick={buyStripe}>
                  <StoreIcon size={30} /> Comprar
                </Button>
                <Button className="w-full gap-6 hover:text-white hover:bg-transparent transition-all duration-400 ease-in-out border-2 border-primary " onClick={() => removeAll()}>
                  <Trash2Icon size={30} /> Vaciar Carrito
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
