import React, { useRef, useState, useCallback } from 'react';

import logo from './logo.svg';
import './App.css';
import './my-styling.css';

class Todo {
  title: string;
  description: string;
  id: number;
  done: boolean;
  constructor(title:string,description: string, id: number, done: boolean){
    this.description = description;
    this.id = id;
    this.done = done;
    this.title = title;
  }
}


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState(new Todo("","",2, false));
  const [doneTodos, setDoneTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [todoCounter, setTodoCounter] = useState(1);
  const [onlyDoneTodosClicked, setOnlyDoneTodosClicked] = useState(false);
  const [img, setImg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  

  const showOnlyDoneTodos = () => {
    setOnlyDoneTodosClicked(true);
    setDoneTodos(todos.filter(e => e.done == true));
  }

  function addNewTodo(todo: Todo){
    if(todo.title != ""){
      setTodos([...todos, todo]);
      setInput("");
      setDescription("");

      setTodoCounter(todoCounter + 1);
      if(inputRef.current){
        inputRef.current.value = "";
      }
      if(descriptionRef.current){
        descriptionRef.current.value = "";
      }
    }
  }

  const showAllTodos = () => {
    setOnlyDoneTodosClicked(false);
    console.log(todos);
  }

  const handleCheckboxChange = useCallback((id: number) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo =>
        todo.id === id
          ? {
              ...todo,
              done: !todo.done, // Toggle the done property
            }
          : todo
      );

    });
  }, []);

  const handleInputChange = (event: any) => {setInput(event.target.value)}
  const handleTextAreaChange = (event: any) => {setDescription(event.target.value)}
  return (
   <>
      <h1>Todos</h1>
      <input type='text' ref={inputRef} placeholder='Input todo...' onChange={handleInputChange}></input>
      <textarea  ref={descriptionRef} placeholder='Description' onChange={handleTextAreaChange}></textarea>
      <button onClick={() => addNewTodo(new Todo(input.toUpperCase(),description,todoCounter, false))}>Add new todo</button>
      <button onClick={() => showOnlyDoneTodos()}>Show Done Todos</button>
      <button onClick={() => showAllTodos()}>Show All Todos</button>
      <button>Test</button>
      
      <div className='todos-div'>
      <ul className='todos-ul'>
       {!onlyDoneTodosClicked ? todos.map((element, index) => {
        return <li className={element.done ? "todos-li-done" : "todos-li"} key={index}>
          <p className='element-id'>{element.id}</p> 
        <p className={element.done ? 'element-done' : 'element-title'}>{element.title}</p>
        <p className='element-description'>{element.description}</p>
        <p>Done: </p>
        <input type="checkbox" checked={element.done} onChange={() => {
          handleCheckboxChange(element.id)
          }}></input>
        </li>
       }): doneTodos.map((element, index) => {
          return <li className={element.done ? "todos-li-done" : "todos-li"} key={index}>
          <p className='element-id'>{element.id}</p> 
        <p className={element.done ? 'element-done' : 'element-title'}>{element.title}</p>
        <p className='element-description'>{element.description}</p>
        <input type = "checkbox" checked = {element.done}></input>
        </li>
       })}
      </ul>
      </div>
    
   </>
  );
}

export default App;
