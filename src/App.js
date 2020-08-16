import React, {Component} from 'react';
import './App.css';
import Cookie from './assets/cookie.png';
import axios from './axios-orders';
import Radium, {StyleRoot} from 'radium'
class App extends Component{
  state={
    isFirstWindowHovered: false,
    isSecondWindowHovered: false,
    darkMode: false,
    animateMailBox: false
  }
  animateMailBoxHandler=()=>{
    this.setState(prevState => ({
      animateMailBox: !prevState.animateMailBox
    }))
  }
  toggleDarkMode=()=>{
    this.setState(prevState => ({darkMode: !prevState.darkMode}));
  }
  toggleFirstImageHover= ()=> {
    this.setState(prevState => ({isFirstWindowHovered: !prevState.isFirstWindowHovered}));
  }
  toggleSecondImageHover= ()=> {
    this.setState(prevState => ({isSecondWindowHovered: !prevState.isSecondWindowHovered}));
  }
  sendingRequestHandler=()=>{
    if(this.state.darkMode){
      alert('Sorry you cannot make any orders! We are closed.') 
    }
    if(!this.state.darkMode){
      const order = {
        cookie: "cookie"
      }
      axios.post('/orders.json', order)
           .then(response=> console.log(response))
      alert('Your cookie Order Has been sent')

    }
    
  }
  render(){
  return (
    <StyleRoot>
      <div style={{
        backgroundColor: this.state.darkMode ? 'black': 'white'
      }} className="BakeryBody">
       <div onClick={this.toggleDarkMode} className="BakerySun"></div>
       <div className="BakeryContainer">
        <div className="BakeryRoof"></div>
        <div className="BakeryBuilding">
          <div className="BakeryTitle">
            <h3>COOKIE BAKERY</h3>
          </div>
          <div className="BakeryStructure">
                <div style={{
                visibility: this.state.isFirstWindowHovered && !this.state.darkMode ? "hidden": "visible" 
              }} className="BakeryWindow" onMouseEnter={this.toggleFirstImageHover} onMouseLeave={this.toggleFirstImageHover}>
                 { !this.state.darkMode ? 
                   <img style={{
                     visibility: this.state.isFirstWindowHovered  ? 'visible' : null
                   }} src={Cookie} alt="cookie"/>
                   : null}
              </div>
              <div className="BakeryDoor">
                <div onClick={this.sendingRequestHandler} className="BakeryHandle"></div>
              </div>
              <div 
              style={{
                visibility: this.state.isSecondWindowHovered && !this.state.darkMode ? "hidden": "visible"
              }}
              className="BakeryWindow" onMouseEnter={this.toggleSecondImageHover} onMouseLeave={this.toggleSecondImageHover}>
                { !this.state.darkMode ?
                  <img 
                style={{
                  visibility: this.state.isSecondWindowHovered ? 'visible' : null
                }}
              src={Cookie} alt="cookie"/> : null} 
              </div>
          </div>
          <div
          style={{
            animation: this.state.animateMailBox ? "slidedown 1s" : null,
          }}
           className="BakeryMailbox" onClick={this.animateMailBoxHandler}>
             <div className="MailReceiver"></div>
             <div className="MailText">
               <h3>Mailbox</h3>
               </div>
          </div>
        </div>
     </div>
    </div>
  </StyleRoot>
  );
}
}
export default Radium(App);
