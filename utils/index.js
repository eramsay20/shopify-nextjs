// https://admin.shopify.com/store/ramsay-test-development-store/apps/shopify-graphiql-app

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

export const formatPrice = (number) => {
  return Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format(number)
}
