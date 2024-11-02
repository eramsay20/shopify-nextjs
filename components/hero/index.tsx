// baseline source: https://tailwindui.com/components/marketing/sections/heroes

"use client";

import Link from "next/link"
import Image from "next/image"
import { IProduct } from "@/pages";
import { extractDataFromEdges } from "@/utils";

interface IHero {
  featuredProduct: IProduct
}

const Hero: React.FC<IHero> = ({featuredProduct}) => {
  const featuredImage = extractDataFromEdges(featuredProduct.images)[0]

  return (
    <div className="group bg-gradient-to-br from-gray-100 to-orange-100">
      <div className="px-6 pt-14 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* FEATURED PRODUCT */}
          <div className="max-w-2xl overflow-hidden h-auto rounded-md group-hover:opacity-75 m-8">
            <Image
              alt={featuredImage.altText || featuredImage.title}
              src={featuredImage.url}
              width={500}
              height={300}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-300"
            />
          </div>

          {/* COPY */}
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center uppercase">
              <p className="uppercase mb-4 text-orange-900">New Release</p>
              <h1 className="text-balance text-2xl tracking-tight text-gray-900 sm:text-4xl">
                The Satchel
              </h1>
              <div className="mt-8 flex items-center justify-center gap-x-6">
                <Link
                  href="/products/leather-journal-copy"
                  className="rounded-md bg-orange-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-900"
                  passHref
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;