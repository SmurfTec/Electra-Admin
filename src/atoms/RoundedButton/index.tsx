import React from 'react'

export const RoundedButton = (props:any) => {
  return (
    <div className={`${props.classes} cursor-pointer rounded-full h-10 w-10 flex items-center justify-center`}>
        <img src={props.icon}/>
    </div>
  )
}
