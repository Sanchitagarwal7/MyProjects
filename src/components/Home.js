import React from 'react'
import AllProjects from './AllProjects';
import Navbar from './Navbar';
import ProjectState from '../context/projects/ProjectState';

const Home = () => {
  return (
    <>
    <ProjectState>
      <Navbar/>
      <AllProjects/>
    </ProjectState>
    </>
  )
}

export default Home;
