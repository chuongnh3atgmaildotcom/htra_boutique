import * as React from "react";
import { Styled, Header as HeaderBase } from "theme-ui";
import useSiteMetadata from "../hooks/useSiteMetadata";
import SocialLinks from "gatsby-theme-gallery/src/components/SocialLinks";

const Header = () => {
  const siteMetadata = useSiteMetadata();

  return (
    <HeaderBase>
      <Styled.h1>{siteMetadata.title}</Styled.h1>
    </HeaderBase>
  );
};

export default Header;
