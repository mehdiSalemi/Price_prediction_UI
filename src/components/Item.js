import React from 'react'


export default function Item(props) {



  return (
    <React.Fragment>
       <div class="form-group">
            <label for="name">{props.des}</label>
            <input type="text" class="form-control"  id={props.name} name={props.name} onChange={props.handleChange} />
        </div>
    </React.Fragment>
   
  )
}


