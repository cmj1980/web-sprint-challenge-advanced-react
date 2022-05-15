import React from 'react';
import axios from 'axios';

const URL = "http://localhost:9000/api/result"
export default class AppClass extends React.Component {

  state = {
    steps: 0,
    grid: [null, null, null, null, "B", null, null, null, null], 
    email: "",
    message: "",
    error: "",
  }
// c = column  r = row
  getPositionOfXY = () => {
    const c = this.state.grid.indexOf("B");
    let r;
    return c < 3 ? r = 1 : c < 6 ? r = 2 : c < 9 && (r = 3),
    [c % 3 + 1, r]
  };

  getMessageOfXY = () => {
    const [c, r] = this.getPositionOfXY();
    return `Coordinates (${c}, ${r})`
  };

// i = idx of   u = update 
  getUpdatedGrid = evt => {
    const i = this.state.grid.indexOf("B"),
    u = [ ...this.state.grid];
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
      return JSON.stringify(this.state.grid) === JSON.stringify(u) ? null : (u[i] = null, u)
    };
// used switch statement to evaluate, match, & execute statments matching the value of case.  
// JSON.stringfy is used to return null where "B" in not found in the "new" grid array.

// count moves create message if move is invalid
  getMoves = evt => {
      const i = evt.target.id,
      u = this.getUpdatedGrid(i)
      u ? this.setState({
         ...this.state,
         steps: this.state.steps + 1,
         message: "",
         grid: u,
      }) : this.setState({
        ...this.state,
        message: `You can't go ${i}`,
      });
  };

  stepsCount = () => {
    if (this.state.steps === 1) {
      return (`You moved ${this.state.steps} time`)
      }else{
        return(`You moved ${this.state.steps} times`)
      }
  }

// onChange, onSubmit, & reset handlers

 handleReset = () => {
   //console.log(this.handleReset)
  this.setState({
    steps: 0,
    grid: [null, null, null, null, "B", null, null, null, null], 
    email: "",
    message: "",

   })
  };

  handleOnChange = evt => {
    //console.log(this.handleOnChange)
    const { value } = evt.target;
          this.setState({ ...this.state, email: value,
       });
  };
  
  setResError = err => this.setState({ ...this.state, error: err.response.data.message }); 
    
  newPost = () => {
    const [x, y] = this.getPositionOfXY()
    axios.post(URL, {x: x, y: y, steps: this.state.steps, email: this.state.email,})
    .then((res => {
         console.log(res)
         this.setState({ ...this.state, message: this.state.message.concat(res.data.message)})
    }))
    .catch(this.setResError)
  } 

  
 handleOnSubmit = evt => {
   evt.preventDefault(); 
   this.newPost();
   this.setState({
     email: "",
   })
 }
  


  render() {
    const { steps: s, grid: g, message: m, email: e,} = this.state
    const { className } = this.props
    return ( 
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getMessageOfXY()}</h3>
          <h3 id="steps">{this.stepsCount(s)}</h3>
        </div>
        <div id="grid">
          {g.map((s, n) => (<div key={n} className={"square" + (s ? " active" : "")}>{s}</div>))}
        </div>
        <div className="info">
          <h3 id="message" value={m}>{m}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.getMoves}>LEFT</button>
          <button id="up" onClick={this.getMoves}>UP</button>
          <button id="right" onClick={this.getMoves}>RIGHT</button>
          <button id="down" onClick={this.getMoves}>DOWN</button>
          <button id="reset" onClick={this.handleReset}>reset</button>
        </div>
        <form onSubmit={this.handleOnSubmit}>
          <input id="email" type="email" value={e} placeholder="type email" onChange={this.handleOnChange}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

// add comment for initial commit and push