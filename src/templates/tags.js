import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const Tags = ({ data, location, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagCount = `${totalCount} result${totalCount === 1 ? "" : "s"}`
  const blogPosts = edges.filter(
    edges => edges.node.frontmatter.type === "blog"
  )
  const projectPosts = edges.filter(
    edges => edges.node.frontmatter.type === "project"
  )

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <SeoDefine title={tag} />
      <article className="blog-post">
        <header className="blog-header">
          <h1 itemProp="headline" className="mt-0 mb-0 pb-0">
            {tag}
          </h1>
          <em>{tagCount}</em>
        </header>
        <div className="separator mt-2 mb-2">
          <h3 className="section-separator font-sc">Projects tagged {tag}</h3>
          <img
            className="separator-accent"
            src="/img/pencil-separator.png"
            alt=""
          />
        </div>

        <div className="project-container row">
          {projectPosts.map(post => {
            const title =
              post.node.frontmatter.title || post.node.frontmatter.path
            return (
              <div className="project col-4" key={post.node.frontmatter.path}>
                <div className="project-image">
                  <Link to={post.node.frontmatter.path} itemProp="url">
                    <img
                      className="project-image-el"
                      src={`${post.node.frontmatter.thumbnail}`}
                      alt=""
                    />
                  </Link>
                </div>
                <h2 className="project-title">
                  <Link to={post.node.frontmatter.path} itemProp="url">
                    <span itemProp="headline">{title}</span>
                  </Link>
                </h2>
                <p
                  className="project-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      post.node.frontmatter.description || post.node.excerpt,
                  }}
                  itemProp="description"
                />
              </div>
            )
          })}
        </div>
        <div className="separator mb-2">
          <h3 className="section-separator font-sc">Posts tagged {tag}</h3>
          <img
            className="separator-accent"
            src="/img/pencil-separator.png"
            alt=""
          />
        </div>

        <ol style={{ listStyle: `none` }}>
          {blogPosts.map(post => {
            const title =
              post.node.frontmatter.title || post.node.frontmatter.path
            return (
              <li key={post.node.frontmatter.path}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <Link to={post.node.frontmatter.path} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>{post.node.frontmatter.date}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          post.node.frontmatter.description ||
                          post.node.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>
        {/*
			  This links to a page that does not yet exist.
			  You'll come back to it!
			  */}
        <a className="link-more font-sc" href="/tags">
          All Tags
        </a>
      </article>
    </Layout>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            description
            thumbnail
            type
            path
          }
        }
      }
    }
  }
`
