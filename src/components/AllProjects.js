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
      <table className='container-fluid'>
        <tr>
            <th id='head'>S.No</th>
            <th id='head'>Title</th>
            <th id='head'>Category</th>
            <th id='head'>Likes</th>
        </tr>
        {projects.length !== 0 ? Array.from(projects).map((project)=>{
          count+=1;
            return (
                <ProjectItem
                    key={project.id}
                    sNo={count}
                    title={project.title}
                    category={project.category}
                    likes={project.likes}
                />
            );
        }) : <h3 style={{textAlign: "center"}}> No Projects to Display</h3>}
      </table> 
    </>
  )
}

export default AllProjects;
