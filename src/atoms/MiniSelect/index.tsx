import React, { useState } from 'react'

export const Miniselect = (props:any) => {
const [checked,setChecked]=React.useState(false)
  return (
    <div className='flex gap-3'>
        <input
        onClick={()=>setChecked(!checked)}
        checked={checked}
        className='rounded-full bg-gray'
        type='radio'/>
        <p className='font-semibold'>
            {props.txt}
        </p>
    </div>
  )
}
