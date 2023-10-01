import './CreateTodoButton.css';

function CreateTodoButton({setOpenModal}){
  return (
    <button 
      className='CreateTodoButton'
      onClick={
        (event)=> {
          setOpenModal(state => !state);
          // console.log('Le diste click')
          // console.log(event)
          // console.log(event.target)
        }
      }
    >+</button>
  );
}

export { CreateTodoButton }; 