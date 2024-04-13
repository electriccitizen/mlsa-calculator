import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { Stack, Box } from "@chakra-ui/react"
export const Logos = () => {
  const data = useStaticQuery(graphql`{
  mtcvImage: file(relativePath: {eq: "mtcv.png"}) {
    childImageSharp {
      gatsbyImageData(width: 150, layout: CONSTRAINED)
    }
  }
  mlsaImage: file(relativePath: {eq: "mlsa.png"}) {
    childImageSharp {
      gatsbyImageData(width: 100, layout: CONSTRAINED)
    }
  }
  ncvliImage: file(relativePath: {eq: "ncvli.png"}) {
    childImageSharp {
      gatsbyImageData(width: 200, layout: CONSTRAINED)
    }
  }
}`)

  return (
    <Stack mt={8} flex="1" spacing="12" width={"100%"} justify="center" align="center" direction={["column", "column", "row"]}>
      <Box mr={4} width={"200px"}>
        <GatsbyImage alt="logo" image={data.ncvliImage.childImageSharp.gatsbyImageData} />
      </Box>
      <Box mr={6} width={"100px"}>
        <GatsbyImage  alt="logo" image={data.mlsaImage.childImageSharp.gatsbyImageData} />
      </Box>
      <Box  width={"150px"}>
        <GatsbyImage  alt="logo" image={data.mtcvImage.childImageSharp.gatsbyImageData} />
      </Box>
    </Stack>
  );
}
