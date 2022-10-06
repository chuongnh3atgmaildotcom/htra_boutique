import * as React from "react";
import { Layout } from "theme-ui";
import Header from "gatsby-theme-gallery/src/components/Header";
import Footer from "gatsby-theme-gallery/src/components/Footer";
import Gallery from "gatsby-theme-gallery/src/components/Gallery";
import useSiteMetadata from "gatsby-theme-gallery/src/hooks/useSiteMetadata";
import { graphql, Link } from "gatsby"
import lodash from "lodash"
import type { PageProps } from "gatsby"
//import type { ImageFormatType } from "gatsby-transformer-sharp"
import type CSS from 'csstype';
import Img, { FluidObject } from "gatsby-image"

const pcontainerstyle: CSS.Properties = { display: 'flex', flexDirection: 'row', width: "100%" };
const HomePage = ({ data }: PageProps<ProductListType>) => {
  const siteMetadata = useSiteMetadata();

  return (
    <Layout>
      <Header />
      <Gallery />
      {console.log(data)}
      <div className="product" style={pcontainerstyle} >
        {data.allFireimage.edges.map(({ node: { id, name, desc, imgSrc, price, slug } }) => (
          <div key={id} className="product-box" style={({ flexGrow: "1" })}>
            <Link to={"/sanpham/" + slug}>
              {!!lodash.get(imgSrc, 'childImageSharp.fluid') && <Img fluid={imgSrc.childImageSharp.fluid} />}
              <span>{name}</span>
            </Link>
          </div>
        )
        )}
      </div>
      {siteMetadata.author && <Footer />}
    </Layout>
  );
};
type ProductListType = {
  allFireimage: {
    edges: [
      {
        node: {
          desc: string,
          id: string,
          name: string,
          price: number,
          slug: string,
          imgSrc: {
            childImageSharp: {
              fluid: FluidObject
            }
          }
        }
      }
    ]
  }
}

export const products = graphql`
{
  allFireimage {
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

export default HomePage;
