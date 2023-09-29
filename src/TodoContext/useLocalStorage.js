import React from 'react';

function useLocalStorage(itemName, initialValue){
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  
  React.useEffect(()=>{
    setTimeout(()=>{
      try{
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        }else{
          parsedItem= JSON.parse(localStorageItem);
          setItem(parsedItem);
        }
        setLoading(false);
      }catch(error) {
        setLoading(false);
        setError(true);
      }
  
    }, 2000);
  }, []);

  const saveItem = (newItem)  => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return {
    item, 
    saveItem, 
    loading, 
    error,
  };
}

export { useLocalStorage }


/* const defaultToDos = [
  {text:'Aprender Django', completed: true},
  {text:'Repasar Django', completed: false},
  {text:'Aprender React', completed: false},
  {text:'Repasar React', completed: false},
  {text:'Seguir Aprendiendo', completed: true},
  {text:'Aprender Estados', completed: false},
]; 
localStorage.setItem('TODOS_V1', JSON.stringify(defaultToDos));
localStorage.removeItem('TODOS_V1');
*/
