export const storefront = async(query, variables = {}) => {
  // TODO: Add error handling
  const response = await fetch(process.env.GRAPHQL_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  

  return response.json();
}

export const extractDataFromEdges = ({edges}) => {
  return edges.map(edge => edge.node)
}

/*

https://admin.shopify.com/store/ramsay-test-development-store/apps/shopify-graphiql-app

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

*/
