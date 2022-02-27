import React from "react"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SeoDefine from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
	const post = data.markdownRemark
	const siteTitle = data.site.siteMetadata?.title || `Title`
	const siteDescription =
		data.site.siteMetadata?.description || `Description`
	const { previous, next } = data

	return (
		<Layout
			location={location}
			title={siteTitle}
			description={siteDescription}
		>
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
					<p className="blog-date font-sc">
						{post.frontmatter.date}
					</p>
					{post.frontmatter.tags ? (
						<div className="tag-container">
							<ul className="tag-list">
								{post.frontmatter.tags.map(tag => (
									<li
										key={tag + `tag`}
										className="tag-item font-sc"
									>
										<Link
											className="tag-link"
											to={`/tags/${kebabCase(tag)}/`}
										>
											{tag}
										</Link>
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
				<div className="blog-wrapper">
					<Bio />
					<section
						dangerouslySetInnerHTML={{ __html: post.html }}
						itemProp="articleBody"
						className="blog-content"
					/>
				</div>
				{post.frontmatter.reddit ? (
					<div className="blog-comments">
						<a
							className="blog-comment-link font-sc"
							href={`${post.frontmatter.reddit}`}
						>
							Continue the Conversation
						</a>
					</div>
				) : null}
			</article>
			<nav className="blog-post-nav mt-4">
				<ul
					style={{
						display: `flex`,
						flexWrap: `wrap`,
						justifyContent: `space-between`,
						listStyle: `none`,
						padding: 0,
					}}
				>
					<li>
						{previous && (
							<Link to={previous.frontmatter.path} rel="prev">
								← {previous.frontmatter.title}
							</Link>
						)}
					</li>
					<li>
						{next && (
							<Link to={next.frontmatter.path} rel="next">
								{next.frontmatter.title} →
							</Link>
						)}
					</li>
				</ul>
			</nav>
		</Layout>
	)
}

export default BlogPostTemplate

export const pageQuery = graphql`
	query BlogPostBySlug(
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
				reddit
				type
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
