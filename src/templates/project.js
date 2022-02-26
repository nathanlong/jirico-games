import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const ProjectTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SeoDefine
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="blog-header">
          <h1 className="blog-title" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          <p className="blog-date font-sc">{post.frontmatter.date}</p>
          {post.frontmatter.tags ? (
            <div className="tag-container">
              <ul className="tag-list">
                {post.frontmatter.tags.map(tag => (
                  <li key={tag + `tag`} className="tag-item font-sc">
                    <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="separator">
            <img
              className="separator-accent"
              src="/img/pencil-separator.png"
              alt=""
            />
          </div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="blog-content"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
    </Layout>
  )
}

export default ProjectTemplate

export const pageQuery = graphql`
  query ProjectPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        path
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        path
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        path
      }
    }
  }
`
