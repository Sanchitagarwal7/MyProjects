import React, { useState } from 'react'
import ProjectItem from './ProjectItem';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  return (
    <>
     <table>
     <tr>
        <th>S.No</th>
        <th>Title</th>
        <th>Category</th>
        <th>Likes</th>
    </tr>
      {projects.length !== 0 ? Array.from(projects).map((project)=>{
          return (
              <ProjectItem
                  key={project.id}
                  title={project.title}
                  category={project.category}
                  likes={project.likes}
              />
          );
      }) : <h3 style={{textAlign: "center"}}>No Projects to Display</h3>};s
     </table> 
    </>
  )
}

export default AllProjects
