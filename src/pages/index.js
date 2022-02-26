import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const frontPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const posts = data.allMarkdownRemark.nodes
  const blogPosts = posts.filter(post => post.frontmatter.type === "blog")
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
      <SeoDefine title={siteTitle} description={siteDescription} />

      <div className="separator mb-2">
        <h3 className="section-separator font-sc">Recent Projects</h3>
        <img
          className="separator-accent"
          src="/img/pencil-separator.png"
          alt=""
        />
      </div>

      <div className="project-container row">
        {projectPosts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <div className="project col-4" key={post.frontmatter.path}>
              <div className="project-image">
                <Link
                  to={post.frontmatter.path}
                  className="project-image-link"
                  itemProp="url"
                >
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
      <a className="link-more font-sc" href="/projects">
        Other Projects
      </a>

      <div className="separator mt-5 mb-2">
        <h3 className="section-separator font-sc">Recent Ramblings</h3>
        <img
          className="separator-accent"
          src="/img/pencil-separator.png"
          alt=""
        />
      </div>

      <ol style={{ listStyle: `none` }}>
        {blogPosts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.frontmatter.path}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.frontmatter.path} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <a className="link-more font-sc" href="/ramblings">
        Other Ramblings
      </a>
    </Layout>
  )
}

export default frontPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 20
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          path
          title
          description
          type
          thumbnail
        }
      }
    }
  }
`
