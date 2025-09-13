"use client"
import { AnimatedTabsExample } from "@/components/AnimatedTabsExample";
import BlockLongTextRender from "@/components/BlockLongTextRender";
import { Button } from "@/components/ui/button";
import { ExpandableCardExample } from "@/components/ui/ExpandableCardExample";
import { ProductType } from "@/types/product";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// Cambia por tu dominio de Strapi


export default function ProductList() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/?populate=*`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  //console.log(products);
  if (products.length === 0) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className="w-1/3 mx-auto relative">
        <ExpandableCardExample />
      </div>
      <div className="grid grid-cols-3 gap-6 p-6">

        {products.length > 0 && products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-md">
            <div className="flex justify-start gap-12 items-center mb-4">
              <h2 className="text-lg font-semibold mb-2">
                <Link href={`/product/${product.productSlug}`}>{product.productName}</Link>
              </h2>
              {product.productCover && <Image
                className="px-4 py-21 rounded bg-white"
                width={90} height={90} priority
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.productCover.url}`} alt="" />}
            </div>
            {/* Mostrar imágenes aquí */}
            <div className="flex flex-wrap justify-between items-center">
              {product.productImages &&
                product.productImages.map((image) => (
                  <img
                    className="bg-gray-50 rounded-sm px-4 py-2 w-24 object-cover m-1 border border-gray-300"
                    key={image.id}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                    alt={image.alternativeText || ""}
                  />
                ))}
            </div>
            <div className="mt-4 text-gray-500">{product.shortDescription} </div>
            <div className="mt-4 text-gray-500">Precio: ${product.price}</div>
            <div className="mt-4 text-gray-500">Cantidad disponible: {product.quantity}</div>
            <div className="mt-4 text-gray-500">Categoría:&nbsp;
              <Link href={`/category/${product.category.categorySlug}`}>{product.category.categoryName}</Link>
            </div>
            <div className="mt-4 text-gray-500">Origen:&nbsp;
              {product.productOrigin}</div>
            <div className="mt-4 text-gray-500">Tamaño: {product.productTaste}</div>
            <div className="mt-4 text-gray-500">Estado: {product.productActive ? 'Activo' : 'Inactivo'}</div>
            <div className="mt-4 text-gray-500">Destacado: {product.productFeatured ? 'Sí' : 'No'} </div>
            <BlockLongTextRender content={product.longDescription} />
            <br />
            <Button variant={"buyit"} className="text-white font-bold py-2 px-4 rounded mt-4">
              Agregar al carrito
            </Button>
          </div>
        ))}
        <AnimatedTabsExample />
      </div>
    </>
  );
}