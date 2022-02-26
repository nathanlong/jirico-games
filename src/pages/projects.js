import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const ProjectIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const posts = data.allMarkdownRemark.nodes
  const projectPosts = posts.filter(post => post.frontmatter.type === "project")

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SeoDefine title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SeoDefine title="All Projects" />

      <article className="blog-post">
        <header className="blog-header">
          <h1 itemProp="headline" className="mt-0 mb-0 pb-0">
            Projects
          </h1>
          <em>Ideas that may or may not stick to a wall when thrown.</em>
        </header>
        <div className="separator mt-3 mb-3">
          <img
            className="separator-accent"
            src="/img/pencil-separator.png"
            alt=""
          />
        </div>

        <div className="project-container row">
          {projectPosts.map(post => {
            const title = post.frontmatter.title || post.frontmatter.path
            return (
              <div className="project col-4" key={post.frontmatter.path}>
                <div className="project-image">
                  <Link to={post.frontmatter.path} itemProp="url">
                    <img
                      className="project-image-el"
                      src={`${post.frontmatter.thumbnail}`}
                      alt=""
                    />
                  </Link>
                </div>
                <h2 className="project-title">
                  <Link
                    to={post.frontmatter.path}
                    className="project-link"
                    itemProp="url"
                  >
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <p
                  className="project-description"
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </div>
            )
          })}
        </div>
      </article>
    </Layout>
  )
}

export default ProjectIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          type
          thumbnail
          path
        }
      }
    }
  }
`
