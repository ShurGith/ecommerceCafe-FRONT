/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetCategories } from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import Link from "next/link";

const ChooseCategory = () => {
  const { result, loading }: ResponseType = useGetCategories();

  return (
    <div className="max-w-7xl py-4 mx-auto sm:py-16 sm:px-24">
      <h3 className="px-6 pb-4 text-3xl sm:pb-8">
        Elige tu categoría favorita
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border ">
        {!loading &&
          result !== null &&
          result.map((category: CategoryType) => (
            <Link
              key={category.id}
              href={`/category/${category.categorySlug}`}
              className={`relative group overflow-hidden rounded-xl bg-gradient-to-br from-black to-gray-900`}>
              <div className="h-[250px] w-[250px] group-hover:scale-125 transition-transform duration-1000"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${process.env.NEXT_PUBLIC_BACKEND_URL}${category.categoryImage.url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}></div>
              <p className="absolute w-full py-2 text-lg font-bold text-center text-white bottom-5 backdrop-blur-lg">
                {category.categoryName}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ChooseCategory;
