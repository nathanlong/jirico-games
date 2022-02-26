/**
 * Nav
 */

import React from "react"

const Nav = ({ className }) => {
  return (
    <nav className={className}>
      <ul className="nav-list font-sc">
        <li className="nav-item">
          <a className="nav-link" href="/projects">
            Projects
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/ramblings">
            Ramblings
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/tags">
            Tags
          </a>
        </li>
        {/* <li className="nav-item"><a className="nav-link" href="/">About</a></li> */}
      </ul>
    </nav>
  )
}

export default Nav
