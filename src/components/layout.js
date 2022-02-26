import React from "react"
import { Link } from "gatsby"
import Nav from "./nav.js"

const Layout = ({ location, title, description, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header
  let footer

  if (isRootPath) {
    header = (
      <div className="site-info line-1">
        <h1 className="site-title">
          <Link to="/">{title}</Link>
        </h1>
        <p className="global-description">{description}</p>
        <Nav className="nav nav-mod-large" />
      </div>
    )
    footer = (
      <footer className="footer">
        <div className="footer-accent-wrapper">
          <Link to="/">
            <img
              className="footer-accent"
              src="/img/lich-normal.jpg"
              alt="Skull with crown"
            />
            <img
              className="footer-accent-hover"
              src="/img/lich-thrill.jpg"
              alt="Skull stating: Power word: Thrill"
            />
          </Link>
        </div>
        <p className="footer-text font-sc">
          © {new Date().getFullYear()}, Jirico Games
        </p>
      </footer>
    )
  } else {
    header = (
      <div className="site-info line-1">
        <h1 className="site-title">
          <Link to="/">{title}</Link>
        </h1>
        <p className="global-description">{description}</p>
        <Nav className="nav nav-mod-large" />
      </div>
    )
    footer = (
      <footer className="footer">
        <div className="footer-accent-wrapper">
          <Link to="/">
            <img
              className="footer-accent"
              src="/img/lich-normal.jpg"
              alt="Skull with crown"
            />
            <img
              className="footer-accent-hover"
              src="/img/lich-thrill.jpg"
              alt="Skull stating: Power word: Thrill"
            />
          </Link>
        </div>
        <p className="footer-text font-sc">
          © {new Date().getFullYear()}, George Jirico
        </p>
      </footer>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      {footer}
    </div>
  )
}

export default Layout
