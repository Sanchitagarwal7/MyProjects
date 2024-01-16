import React from 'react'

const ProjectItem = (props) => {
    const Capitalize = (str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const setClass = ()=>{
        if(props.category === "beginner"){
            return "beginner";
        }else if(props.category === "intermidiate"){
            return "intermidiate";
        }else{
            return "hard";
        }
    }
  return (
    <>
    <tr>
        <td id="item_style">{props.sNo}</td>
        <td id="item_style" className='pName'><a href={`/get/${props.dbTitle}`}>{props.title}</a></td>
        <td id="item_style"><span className={setClass()}>{Capitalize(props.category)}</span></td>
        <td id="item_style">{props.likes}</td>
    </tr>
    </>
  )
}

export default ProjectItem;
