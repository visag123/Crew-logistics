import React from 'react';

const Button = (props) => {
    const {type,className,onClick,labelName,onChange} =props
    
  return (
    <div className='button_js'>
   
    <button type={type} 
     className={className} 
     onClick={onClick}
     onChange={onChange}    
     >  
     
      {props.children} </button>
    </div>
  )
}
export default Button