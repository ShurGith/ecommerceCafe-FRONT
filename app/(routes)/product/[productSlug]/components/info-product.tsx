import BlockLongTextRender from "@/components/BlockLongTextRender";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Heart } from "lucide-react";

export type InfoProductProps = {
  product: ProductType;
};

const InfoProduct = (props: InfoProductProps) => {
  const { product } = props;
  const { addItem } = useCart();
  const { addLoveItem } = useLovedProducts();

  return (
    <div className="px-6">

      <Separator className="my-4" />
      <BlockLongTextRender content={product.longDescription} />

      <Separator className="my-4" />
      <p className="my-4 text-2xl">{formatPrice(product.price)}</p>


      <div className="flex items-center gap-5">
        <Button className="w-full " onClick={() => addItem(product)}>
          Comprar{" "}
        </Button>

        <Heart
          width={30}
          strokeWidth={1}
          className="transition duration-300 cursor-pointer hover:fill-black"
          onClick={() => addLoveItem(product)}
        />
      </div>
    </div >
  );
};

export default InfoProduct;
