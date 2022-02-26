/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { getImage, StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            reddit
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social
  const avatar = getImage(data?.avatar?.childImageSharp)

  return (
    <div className="bio">
      {avatar && (
        <StaticImage
          src="../../content/assets/profile-pic.jpg"
          placeholder="blurred"
          alt={author?.name || ``}
          className="bio-avatar"
          width={200}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {author?.name && (
        <div className="bio-text">
          <p className="bio-title">
            <strong>{author.name}</strong>
            <br />
          </p>
          <p className="bio-desc font-sc">{author?.summary || null}</p>
          <ul className="bio-social">
            <li>
              <a
                className="bio-social-item font-sc"
                href={`${social?.reddit || ``}`}
              >
                Reddit
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Bio
