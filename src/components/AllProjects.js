import React,{useContext, useEffect} from 'react'
import ProjectItem from './ProjectItem';
import ProjectContext from '../context/projects/ProjectContext';
import {useNavigate} from 'react-router-dom';

const AllProjects = () => {

  const context = useContext(ProjectContext);

  const {projects, getProjects} = context;

  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getProjects();
    }else{
      navigate("/login");
    }
  });

  let count = 0;

  return (
    <>
      <table className='container'>
        <thead>
          <tr>
              <th id='head'>S.No</th>
              <th id='head'>Title</th>
              <th id='head'>Category</th>
              <th id='head'>Likes</th>
          </tr>
        </thead>
        <tbody>
          {projects.length !== 0 ? Array.from(projects).map((project)=>{
            count+=1;
              return (
                  <ProjectItem
                      key={project.id}
                      sNo={count}
                      dbTitle={project.dbTitle}
                      title={project.title}
                      category={project.category}
                      likes={project.likes}
                  />
              );
          }) : <h3 style={{textAlign: "center"}}> No Projects to Display</h3>}
        </tbody>
      </table> 
    </>
  )
}

export default AllProjects;
