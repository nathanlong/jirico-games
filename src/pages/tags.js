import React from "react"
import PropTypes from "prop-types"

// Utilities
import kebabCase from "lodash/kebabCase"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const TagsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || `Description`
  const group = data.allMarkdownRemark.group

  return (
    <Layout location={location} title={siteTitle} description={siteDescription}>
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <SeoDefine title="All Tags" />
        <header className="blog-header">
          <h1 itemProp="headline" className="mt-0 mb-0 pb-0">
            Tags
          </h1>
          <em>Content by topic, arranged alphabetically</em>
        </header>
        <div className="separator mt-3">
          <img
            className="separator-accent"
            src="/img/pencil-separator.png"
            alt=""
          />
        </div>
        <ul className="tag-index">
          {group.map(tag => (
            <li className="tag-index-item" key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
