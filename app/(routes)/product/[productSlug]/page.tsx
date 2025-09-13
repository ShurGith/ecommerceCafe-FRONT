"use client"

import { useGetProductBySlug } from "@/api/getProductBySlug";
import CarouselProduct from "@/app/(routes)/product/[productSlug]/components/carousel-product";
import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import InfoProduct from "./components/info-product";
import SkeletonProduct from "./components/skeleton-product";


export default function Page() {
    const params = useParams()
    const { productSlug } = params;

    const { result }: ResponseType = useGetProductBySlug(productSlug)

    if (result === null) {
        return <SkeletonProduct />
    }

    return (
        <div className="max-w-6xl py-4 mx-auto sm:py-32 sm:px-24 lg:min-h-[80vh]">
            <div className="grid sm:grid-cols-2"
                style={{

                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${process.env.NEXT_PUBLIC_BACKEND_URL}${result[0].productCover.url})`,
                }}>
                <div className="flex-col flex  justify-around h-full items-center">
                    <div className="justify-center flex-col  items-center  mb-3 sm:flex">
                        <h1 className="text-3xl mb-6">{result[0].productName}</h1>
                        <ProductTasteOrigin
                            origin={result[0].productOrigin}
                            taste={result[0].productTaste}
                        />
                    </div>
                    <CarouselProduct images={result[0].productImages} />
                </div>

                <div className="sm:px-12">
                    <InfoProduct product={result[0]} />
                </div>
            </div>
        </div >
    )
}