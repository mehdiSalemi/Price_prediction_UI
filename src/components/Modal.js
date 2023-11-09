import './Modal.css'


export default function Modal(props) {
  return (
    <div id="myModal" class="modal">    
        {props.children}
  </div>
  )
}
