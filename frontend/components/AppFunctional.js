import React, { useState } from 'react';
import axios from 'axios';

const URL = "http://localhost:9000/api/result"

export default function AppFunctional(props) {

  const [state, setState] = useState({
    steps: 0,
    grid: [null, null, null, null, "B", null, null, null, null], 
    email: "",
    message: "",

  })
  
  const getPositionOfXY = () => {
    const c = state.grid.indexOf("B");
    let r;
    return c < 3 ? r = 1 : c < 6 ? r = 2 : c < 9 && (r = 3),
    [c % 3 + 1, r]
  };

  const getMessageOfXY = () => {
    const [c, r] = getPositionOfXY();
    return `Coordinates (${c}, ${r})`
  };

  const getUpdatedGrid = evt => {
    const i = state.grid.indexOf("B"),
    u = [ ...state.grid];
    switch (evt) {
    case "up":
      if (i < 3)
        break;
        u[i - 3] = "B";
        break;
    case "down":
      if (i > 5)
        break;
      u[i + 3] = "B";
        break;
     case "left":
      if (i % 3 == 0)
        break;
      u[i - 1] = "B";
        break;
     case "right":
      if ((i - 2) % 3 == 0)
        break; 
      u[i + 1] = "B";
        break;    
      }
      return JSON.stringify(state.grid) === JSON.stringify(u) ? null : (u[i] = null, u)
    };

    const getMoves = evt => {
      const i = evt.target.id,
      u = getUpdatedGrid(i)
      u ? setState({
         ...state,
         steps: state.steps + 1,
         message: "",
         grid: u,
      }) : setState({
        ...state,
        message: `You can't go ${i}`,
      });
  };

  const stepsCount = () => {
    if (state.steps === 1) {
    return (`You moved ${state.steps} time`)
    }else{
      return(`You moved ${state.steps} times`)
    }
  }

  const handleReset = () => {
    //console.log(this.handleReset)
     setState({
     steps: 0,
     grid: [null, null, null, null, "B", null, null, null, null], 
     email: "",
     message: "",
    })
   };

   const handleOnChange = evt => {
    //console.log(this.handleOnChange)
    const { value } = evt.target;
          setState({ ...state, email: value,
       });
  };

  
  
  const newPost = () => {
    const [x, y] = getPositionOfXY()
    axios.post(URL, {x: x, y: y, steps: state.steps, email: state.email,})
    .then(res =>{
      setState({
        ...state,
        message: res.data.message,
        email: "" 
      })
    })
    .catch(err => {
      setState({
        ...state,
        message: err.response.data.message,
        email: ""
      })
    })
  }

  const handleOnSubmit = evt => {
    evt.preventDefault(); 
    newPost();  
  }

 
  

  return (
  
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">{getMessageOfXY()}</h3>
          <h3 id="steps">{stepsCount(state.steps)}</h3>
        </div>
        <div id="grid">
          {state.grid.map((s, n) => (<div key={n} className={"square" + (s ? " active" : "")}>{s}</div>))}
        </div>
        <div className="info">
          <h3 id="message" value={state.message}>{state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={getMoves}>LEFT</button>
          <button id="up" onClick={getMoves}>UP</button>
          <button id="right" onClick={getMoves}>RIGHT</button>
          <button id="down" onClick={getMoves}>DOWN</button>
          <button id="reset" onClick={handleReset}>reset</button>
        </div>
        <form onSubmit={handleOnSubmit}>
          <input id="email" type="email" value={state.email} placeholder="type email" onChange={handleOnChange}></input>
          <input id="submit" type="submit" ></input>
        </form>
    </div>
  )
}
