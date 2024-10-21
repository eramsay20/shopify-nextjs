import * as React from 'react';
import Image from "next/image";
// import localFont from "next/font/local";
import Hero from "@/components/hero";
import Navigation from "@/components/navigation";
import ProductList from "@/components/product-list";
import { extractDataFromEdges, storefront } from "@/utils/index";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export interface IProduct {
  title: string,
  handle: string,
  tags: [],
  priceRange: { 
    minVariantPrice:  {
      amount: string
    }
  },
  images: { edges: [{ node: unknown; }] }
}

interface IHome {
  products: IProduct[]
}

// export const Portfolio = () => {
export const Home: React.FC<IHome> = ({products}) => {
  // console.log(products);

  return (
  <main>
      <Navigation />
      <Hero />
      <ProductList products={products} />

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </main>
  );
}

export default Home

export async function getStaticProps() {
  const { data } = await storefront(productQuery);

  if (!data || !data?.products) {

    return {
      props: {}
    }
  } else {

    const products = extractDataFromEdges(data.products)

    return {
      props: {
        products
      },
    };
  }

}

const productQuery = `
  query Products {
    products(first:3) {
      edges {
        node {
          title
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first:1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;