import React from 'react'

export default class AppClass extends React.Component {

  state = {
    steps: 0,
    grid: [null, null, null, null, "B", null, null, null, null], 
    email: "",
    message: "",
  }

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

  reset = () => {
    this.setState()
  };

  







  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getMessageOfXY()}</h3>
          <h3 id="steps">{`You moved ${this.state.steps} times`}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((gridLetter, idx) => (
            <div key={idx} className="square">{gridLetter}
          </div>))};
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}

// add comment for initial commit and push