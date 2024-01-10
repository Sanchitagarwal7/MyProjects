import React from 'react'

const ProjectItem = (props) => {
  return (
    <>
    <tr>
        <td>{props.key}</td>
        <td>{props.title}</td>
        <td>{props.category}</td>
        <td>{props.likes}</td>
    </tr>
    </>
  )
}

export default ProjectItem
