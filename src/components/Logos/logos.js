import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Stack, Box } from "@chakra-ui/react"
export const Logos = () => {
  const data = useStaticQuery(graphql`
    query {
      mtcvImage: file(relativePath: { eq: "mtcv.png" }) {
        childImageSharp {
          fluid(maxWidth: 150) {
            ...GatsbyImageSharpFluid
            
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
      mlsaImage: file(relativePath: { eq: "mlsa.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
      ncvliImage: file(relativePath: { eq: "ncvli.png" }) {
        childImageSharp {
          fluid(maxWidth: 200) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
    }
  `)

  return (
    <Stack mt={8} flex="1" spacing="12" width={"100%"} justify="center" align="center" direction={["column", "column", "row"]}>
      <Box mr={4} width={"200px"}>
        <Img fluid={data.ncvliImage.childImageSharp.fluid} />
      </Box>
      <Box mr={6} width={"100px"}>
        <Img fluid={data.mlsaImage.childImageSharp.fluid} />
      </Box>
      <Box  width={"150px"}>
        <Img fluid={data.mtcvImage.childImageSharp.fluid} />
      </Box>
    </Stack>
  )
}
