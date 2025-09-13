/* eslint-disable @next/next/no-img-element */
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Image from "next/image";
import { Key } from "react";

interface CarouselProductProps {
  images: {
    map: any;
    data: {
      id: number;
      attributes: {
        url: string;
      };
    }[];
  };
}

const CarouselProduct = (props: CarouselProductProps) => {
  const { images } = props;

  return (
    <div className="sm:px-16">
      <Carousel>
        <CarouselContent>
          {images.map((image: { id: Key | null | undefined; url: any; }) => (
            <CarouselItem key={image.id}>
              <Image
                width={500}
                height={375}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${image.url}`}
                alt="Image product"
                className="rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CarouselProduct;
