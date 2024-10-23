import { IProduct } from "@/pages";
import { extractDataFromEdges, formatPrice } from "@/utils";
import Image from 'next/image'

// TODO: Replace anchor and img elements with link/image from nextjs
// import Link from 'next/link'
// import Image from 'next/image'

interface IProductList {
  products: IProduct[]
}

export const ProductList: React.FC<IProductList> = ({products}) => {

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Latest Product Offerings
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => {
            const firstImage = extractDataFromEdges(product.images)[0]
            return (
              <div key={product.handle} className="group relative">
                <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                  <Image
                    alt={firstImage.altText || product.title}
                    src={firstImage.url}
                    width={500}
                    height={300}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={`/products/${product.handle}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </a>
                    </h3>
                    {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(product.priceRange.minVariantPrice.amount)}
                  </p>
                </div>
              </div>
            )}
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList
