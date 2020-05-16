import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';



class Clock extends React.Component{
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  componentDidMount(){
    this.timerID = setInterval ( ()=> this.tick(), 1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  tick(){
    this.setState({
      date: new Date()
    })
  }
  render(){return(
    <div className="clock">
      <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
    </div>
  );
}
}

let note = 'Please write an essay about your favorite DOM element.';
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: note
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({value: event.target.value});
    note = this.state.value;
  }


  render() {
    return (
      <form className="edit-box" onSubmit={this.handleSubmit}>
        <label>
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
    );
  }
}

class NoteBox extends React.Component {
    constructor(props){
      super(props);
      this.state = {editMode: false };
      this.case = '';
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
      this.setState((state) =>(
        {editMode: !state.editMode})
      );
    }

    render (){

      if (this.state.editMode){
        this.case = <EssayForm />;
      }else{
        this.case = <p className="note">{note}</p>;
      }
      return(
        <div className="note-box" >
          <button type="button" className="edit" onClick={() => this.handleClick()}>
            <p>{this.state.editMode ? "FINISH": "EDIT"}</p>
          </button>
          {this.case}

        </div>
      );
    }
}


function App (props){
  return (
    <div className="container">
      <Clock />
      <h1>{props.name}</h1>
      <NoteBox />

    </div>
  );
}

ReactDOM.render(

  <App name="Note App" />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
