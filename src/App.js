import { TodoCounter } from './TodoCounter';
import { TodoSearch } from './TodoSearch';
import { TodoList } from './TodoList';
import { TodoItem } from './TodoItem';
import { CreateTodoButton } from './CreateTodoButton';
import React from 'react';

/* const defaultToDos = [
  {text:'Aprender Django', completed: true},
  {text:'Repasar Django', completed: false},
  {text:'Aprender React', completed: false},
  {text:'Repasar React', completed: false},
  {text:'Seguir Aprendiendo', completed: true},
  {text:'Aprender Estados', completed: false},
]; 
localStorage.setItem('TODOS_V1', JSON.stringify(defaultToDos));
*/

//localStorage.removeItem('TODOS_V1');

function useLocalStorage(itemName, initialValue){
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;
  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  }else{
    parsedItem= JSON.parse(localStorageItem);
  }
  const [item, setItem] = React.useState(parsedItem);
  const saveItem = (newItem)  => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };
  return [item, saveItem];
}

function App() {
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const completedTodos = todos.filter(
    todo => !!todo.completed
  ).length;
  const totalTodos=todos.length;
  
  const searchedTodos = todos.filter(
    (todo)=>{
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );
  
  const completeTodo = (text) =>{
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };
  
  const deleteTodo = (text) =>{
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex(
      (todo) => todo.text === text
    );
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };  

  return (
    // <div className="App">
   // <React.Fragment>
    <> 
      <TodoCounter 
        completed={completedTodos} 
        total={totalTodos}/>
      <TodoSearch 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem 
           key={ todo.text } 
           text={ todo.text }
           completed={ todo.completed }
           onComplete={() => completeTodo(todo.text)}
           onDelete={()=> deleteTodo(todo.text)}
           />
        ))}
      </TodoList>

      <CreateTodoButton />
    </>  
    //</React.Fragment>  
    // </div>
  );
}

export default App;
