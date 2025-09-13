"use client";
import { useGetCategories } from "@/api/getProducts";
import AnimatedTabs from "@/components/AnimtadTabs";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";

const tabs: string[] = [];

export function AnimatedTabsExample() {
  const { result, loading }: ResponseType = useGetCategories();
  result?.forEach((category: CategoryType) => {
    //console.log(category.categoryName);
    if (!tabs.includes(category.categoryName))
      tabs.push(category.categoryName)
  })

  return (
    <AnimatedTabs tabs={tabs} />
  )
}
