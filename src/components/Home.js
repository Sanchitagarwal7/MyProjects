import React from 'react'
import AllProjects from './AllProjects';
import Filter from './Filter';
import ProjectState from '../context/projects/ProjectState';

const Home = () => {
  return (
    <>
    <ProjectState>
      <Filter/>
      <AllProjects/>
    </ProjectState>
    </>
  )
}

export default Home;
