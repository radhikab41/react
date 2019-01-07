import React from 'react';
import * as d3 from 'd3';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xpos: Array(5).fill(null),
          opos:Array(5).fill(null),
          xIsNext: true,
          xOdds:0.5,
          oOdds:0.5,
          oi:0,
          xi:0,
          Winner:0
        };
      }
      catchNumber(i){
          console.log("catch number "+ i);
          console.log(this.state.xpos);
      }
    renderSquare(i) {
        
        return <Square value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        />;
     
    }
     handleClick(i) {
        this.calculateOdds(i);
   //this.catchNumber(i);
   console.log(i);
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
      }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
 
  calculateOdds(i){
      if(this.state.Winner!=1){
        var  x =8;
        var  o = 8;
       
          
       console.log(this.state);
       if(this.state.xIsNext){
           //calculate o odds
          this.state.opos[this.state.oi]=i;
           this.state.oi++;
        
  
       }
       else{
           //calculate x odds
           this.state.xpos[this.state.xi]= i;
           this.state.xi++;
       }
        console.log(this.state.xpos);
        console.log(this.state.opos);
      }
     
  }

    render() {
      
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            this.state.Winner = 1;
          status = 'Winner: ' + winner;
        } else {
           
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-board">
            <Visualization />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  class Visualization extends React.Component{
    render(){
        return(
            <div>
                 <h1>hi im going to visualiztion the odds</h1>
                 <svg style={{ width: this.props.width, height: this.props.height }}>
               
            </svg>
            </div>
           
           
        ); 
      }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
 