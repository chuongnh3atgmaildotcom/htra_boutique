import * as React from 'react'
import { Layout } from "theme-ui";
import Header from "gatsby-theme-gallery/src/components/Header";
import Footer from "gatsby-theme-gallery/src/components/Footer";
import Gallery from "gatsby-theme-gallery/src/components/Gallery";
import useSiteMetadata from "gatsby-theme-gallery/src/hooks/useSiteMetadata";
import lodash from "lodash"
import Img, { FluidObject } from "gatsby-image"

const ProductPage = ({ data }) => {
  const siteMetadata = useSiteMetadata();
  const productData = lodash.get(data, 'allFireimage.edges.0.node', {})
  console.log(data)
  return (
    <Layout>
      <Header />
      <Gallery />
      <div className="product-box" style={({ flexGrow: "1" })}>
        {(!!(productData) &&
          (<>
            {!!lodash.get(productData, 'imgSrc.childImageSharp.fluid') && <Img fluid={productData.imgSrc.childImageSharp.fluid} />}
            {!!lodash.get(productData, 'name') && <span>{productData.name}</span>}
          </>)
        )}
      </div>
      {siteMetadata.author && <Footer />}
    </Layout>
  )
}

export const products = graphql`
query ($slug: String) {
  allFireimage(filter: {slug: {eq: $slug}}) {
    edges {
      node {
        desc
        id
        name
        price
        slug
        imgSrc {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
}
`
export default ProductPage