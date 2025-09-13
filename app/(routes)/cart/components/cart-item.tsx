import ProductImageMinuature from "@/components/shared/product-image-miniature";
import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { ProductType } from "@/types/product";
import { X } from "lucide-react";

interface CartItemProps {
    product: ProductType
}

const CartItem = (props: CartItemProps) => {
    const { product } = props
    const { removeItem } = useCart()

    return (
        <li className="flex py-6 border-b">
            <ProductImageMinuature slug={product.productSlug} url={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.productCover.url}`} />

            <div className="flex justify-between flex-1 px-6">
                <div>
                    <h2 className="text-xl mb-1 font-bold">{product.productName}</h2>
                    <p className="font-bold mb-4">{formatPrice(product.price)}</p>

                    <ProductTasteOrigin taste={product.productTaste} origin={product.productOrigin} />

                </div>
                <div>
                    <Button
                        className="rounded-full w-8 h-8  text-center bg-white/50 border shadow-md p-1 hover:scale-110 transition">
                        <X size={20} onClick={() => removeItem(product.id)} />
                    </Button>
                </div>
            </div>
        </li>
    );
}

export default CartItem;