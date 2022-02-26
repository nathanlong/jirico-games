/**
 * Comments from Reddit
 */

import React, { useEffect, useState } from "react"
import CommentList from "./commentList"
// import { useStaticQuery, graphql } from "gatsby"

const Comments = ({ post }) => {
  let uri = post + ".json"

  const [appState, setAppState] = useState({
    loading: false,
    comments: null,
  })

  // fetch the post json and then spit it into console
  useEffect(() => {
    setAppState({ loading: true })
    fetch(uri)
      .then(data => data.json())
      .then(data => console.log(data))
      .then(data => {
        setAppState({ loading: false, comments: data })
      })
      .catch(err => console.log(err))
  }, [setAppState])

  return <CommentList props={appState.comments} />
}

export default Comments
