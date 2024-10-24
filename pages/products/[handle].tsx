"use client";

import Image from 'next/image'
import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { extractDataFromEdges, formatPrice, storefront } from "@/utils";
import { IProduct } from "@/pages/index";

// TODO: Refactor this static data to pull from Shopify's variant product options
const product = {
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ]
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface IProductPage {
  singleProduct: IProduct
  selectSize?: boolean // product has option to select size
  selectColor?: boolean // product has option to select color
}

export const ProductPage: React.FC<IProductPage> = ({
  singleProduct, 
  selectSize, 
  selectColor
}) =>  {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  
  const productImages = extractDataFromEdges(singleProduct.images)
  const defaultImage = productImages[0]

  return (
    <div className="bg-white min-h-[100vh]">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li key={1}>
              <div className="flex items-center">
                <a
                  href={"/"}
                  className="mr-2 text-sm font-medium text-gray-900"
                >
                  {"Products"}
                </a>
                <svg
                  fill="currentColor"
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-sm">
              <a
                href={`/products/${singleProduct.handle}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {singleProduct.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery (baseline: https://tailwindui.com/components/ecommerce/components/product-overviews) */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <Image
              src={productImages[0].url}
              alt={productImages[0].altText}
              width={500}
              height={300}
              className="h-full w-full object-cover object-center"
              priority // Optional: use this if the image is important for the initial render
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <Image
                alt={productImages[1]?.altText || defaultImage.altText}
                src={productImages[1]?.url || defaultImage.url}
                width={500}
                height={300}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <Image
                alt={productImages[2]?.altText || defaultImage.altText}
                src={productImages[2]?.url || defaultImage.url}
                width={500}
                height={300}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <Image
              alt={productImages[3]?.altText || defaultImage.altText}
              src={productImages[3]?.url || defaultImage.url}
              width={500}
              height={300}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {singleProduct.title}
            </h1>
          </div>

          {/* Product Select Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {formatPrice(singleProduct.priceRange.minVariantPrice.amount)}
            </p>

            <form className="mt-10">
              {/* Select Color */}
              {selectColor && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}

              {/* Select Size */}
              {selectSize && (
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Size guide
                    </a>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
              )}

              {/* Add to Cart Btn */}
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
          </div>

          {/* Description and details */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>
              <div
                className="product-description text-base text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: singleProduct.descriptionHtml,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;


// Note: Using the `descriptionHtml` field instead of `description` to lean on Shopify's rich text to HTML handler
const singleProductQuery = `
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      handle
      descriptionHtml
      updatedAt
      tags
      priceRange{
        minVariantPrice {
          amount
        }
      }
      images(first: 1) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`

export const getStaticProps = async ({params}: {params: {handle: string}}) => {
  const { data } = await storefront(singleProductQuery, {handle: params.handle})

  return {
    props: {
      singleProduct: data.productByHandle,
    }
  }
  
}

export async function getStaticPaths() {
  const { data } = await storefront(`
    {
      products(first: 6) {
        edges {
          node {
            handle
          }
        }
      }
    }
  `)

  return {
    paths: data.products.edges.map((product: { node: { handle: unknown; }; }) => ({params: {handle: product.node.handle}})),
    fallback: false,
  }
}