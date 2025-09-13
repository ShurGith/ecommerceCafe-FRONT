import { useGetCategories } from "@/api/getProducts";
import { CategoryType } from "@/types/category";
import { ResponseType } from "@/types/response";
import ExpandableCard, { CardItem } from './ExpandableCard';


const sampleItems: CardItem[] = [

  // {
  //   id: "upstash",
  //   title: "Upstash",
  //   subtitle: "Backend Developer",
  //   icon: <Upstash className="h-8 w-8" />,
  //   description: "$90k - $120k",
  //   details:
  //     "Work with Redis, Kafka, and serverless technologies to build scalable backend infrastructure.",
  //   metadata: "Remote | Full-time | Global",
  // },
  // {
  //   id: "firebase",
  //   title: "Firebase",
  //   subtitle: "Cloud Engineer",
  //   icon: <Firebase className="h-8 w-8" />,
  //   description: "$110k - $140k",
  //   details:
  //     "Contribute to Firebase's real-time databases, authentication, and cloud functions on GCP.",
  //   metadata: "Hybrid | Full-time | Mountain View, CA",
  // },
  // {
  //   id: "metamask",
  //   title: "MetaMask",
  //   subtitle: "Frontend Developer",
  //   icon: <MetaMask className="h-8 w-8" />,
  //   description: "$100k - $130k",
  //   details:
  //     "Build React-based Web3 interfaces for the MetaMask crypto wallet, focusing on usability and security.",
  //   metadata: "Remote | Full-time | Global",
  // },
];

export function ExpandableCardExample() {


  const { result, loading }: ResponseType = useGetCategories();
  result?.forEach((c: CategoryType) => {
    const encotrarRegistro = sampleItems.find(sampleItem => sampleItem.id === c.categorySlug);
    if (encotrarRegistro) return;

    sampleItems.push({
      id: c.categorySlug,
      title: c.categoryName,
      subtitle: c.categoryDescription,
      icon: <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${c.categoryImage.url}`} />,
      description: "300k - $600k",
      details: c.categoryDescription,
      metadata: "Remote | Full-time | Global",
    });
  })

  return (
    <ExpandableCard items={sampleItems} />
  )
}