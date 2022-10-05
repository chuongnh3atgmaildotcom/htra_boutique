import * as React from "react";
import { Layout } from "theme-ui";
import Header from "gatsby-theme-gallery/src/components/Header";
import Footer from "gatsby-theme-gallery/src/components/Footer";
import Gallery from "gatsby-theme-gallery/src/components/Gallery";
import useSiteMetadata from "gatsby-theme-gallery/src/hooks/useSiteMetadata";
import { graphql } from "gatsby"
import type { PageProps } from "gatsby"
import Img from "gatsby-image"

const HomePage = ({data}: PageProps<ProductListType>) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Header />
      <Gallery />
      {console.log(data)}
      {data.allProduct.edges.map(({node:{id,name,img,price,slug}}) => (
        <div className="product-box">
          <img key={id} src={img}></img>
          <span>{name}</span>
        </div>
        )
      )}
      {siteMetadata.author && <Footer />}
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </Layout>
  );
};
type ProductListType = {
  allProduct: {
    edges: [
      {
        node: {
          id: string,
          name: string,
          img: string,
          price: number,
          slug: string
        }
      }
    ]
  }
}

export const products = graphql`
  {
    allProduct {
      edges {
        node {
          id
          name
          img
          price
          slug
        }
      }
    }
  }
`

export default HomePage;
