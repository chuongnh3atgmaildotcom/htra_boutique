import * as React from 'react'
import { Layout } from "theme-ui";
import Header from "gatsby-theme-gallery/src/components/Header";
import Footer from "gatsby-theme-gallery/src/components/Footer";
import Gallery from "gatsby-theme-gallery/src/components/Gallery";
import useSiteMetadata from "gatsby-theme-gallery/src/hooks/useSiteMetadata";
import lodash from "lodash"
import Img, { FluidObject } from "gatsby-image"
import { graphql, PageProps } from "gatsby"

const ProductPage = ({ data }:PageProps<SingleProductDataType>) => {
  const siteMetadata = useSiteMetadata();
  console.log(data)
  return (
    <Layout>
      <Header />
      <Gallery />
      <div className="product-box" style={({ flexGrow: "1" })}>
        {(!!(data) &&
          (<>
            {!!lodash.get(data, 'fireimage.imgSrc.childImageSharp.fluid') && <Img fluid={data.fireimage.imgSrc.childImageSharp.fluid} />}
            {!!lodash.get(data, 'fireimage.name') && <span>{data.fireimage.name}</span>}
          </>)
        )}
      </div>
      {siteMetadata.author && <Footer />}
    </Layout>
  )
}
type SingleProductDataType = {
  fireimage: {
    desc: string
    id: string
    name: string
    price: number
    imgSrc: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
}

export const product = graphql`
query ($slug: String) {
  fireimage(slug: {eq: $slug}) {
    desc
    id
    name
    price
    imgSrc {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
}
`

export default ProductPage