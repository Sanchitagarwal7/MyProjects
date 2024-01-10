import {useState} from 'react'
import ProjectContext from './ProjectContext';

const ProjectState = (props) => {
    const [projects, setProjects] = useState([]);

    const host = "http://localhost:4999";

    const getProjects = async ()=>{

        const reponse = await fetch(`${host}/api/projects/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token":localStorage.getItem('token'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
              }
        });
        const json = await reponse.json();

        setProjects(json);
    }

    const filterByCategory = async ()=>{
        const response = await fetch(`${host}/api/projects/${props.role}/${props.category}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token":localStorage.getItem('token'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const json = await response.json();

        setProjects(json);
    }

    const filterByRole = async ()=>{
        const response = await fetch(`${host}/api/projects/${props.role}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "token":localStorage.getItem('token'),
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        const json = await response.json();

        setProjects(json);
    }
  return (
    <>
      <ProjectContext.Provider value={{projects, setProjects, getProjects, filterByCategory, filterByRole}}>
        {props.children}
      </ProjectContext.Provider>
    </>
  )
}

export default ProjectState;
