import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const posts = data.allMarkdownRemark.nodes
  const blogPosts = posts.filter(post => post.frontmatter.type === "blog")

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
      <SeoDefine title="All Posts" />

      <article className="blog-post">
        <header className="blog-header">
          <h1 itemProp="headline" className="mt-0 mb-0 pb-0">
            Ramblings
          </h1>
          <em>Occassionally coherent explorations of ideas.</em>
        </header>
        <div className="separator mt-3">
          <img
            className="separator-accent"
            src="/img/pencil-separator.png"
            alt=""
          />
        </div>
        <ol style={{ listStyle: `none` }}>
          {blogPosts.map(post => {
            const title = post.frontmatter.title || post.frontmatter.path

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
      </article>
    </Layout>
  )
}

export default BlogIndex

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
          path
        }
      }
    }
  }
`
