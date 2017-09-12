import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import {Component} from 'react'
import $ from 'jquery';
import './main.css'; 



// CSS Styling
const styles = {
  capture: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  picSize: {
    display: 'flex',
    maxWidth: 450,
    maxHeight: 450,
    minWidth: 450,
    minHeight: 450,
    margin: 30,
  },
  box: {
    maxWidth: 350,
    maxHeight: 350,
    minWidth: 450,
    minHeight: 450,
    border: '10px solid gray',
  }
}



// Helper Functions/Component

const Photo = (props) => {
    return(
        <div className="output"
            style={ styles.box }>
           <img id="test" alt="Your photo"
              style={ styles.picSize }
              src={props.picture} 
              />
         </div>
    )
}

// Components

class EmailForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let c = document.getElementById("capturedPic");
    let image = c.toDataURL();
    $.ajax({
      url: '/api/email',
      method: 'POST',
      data: {email: this.state.email, image: image}
    })
    .done((data) => {
      console.log('data');
    })
    .fail((err) => {
      console.log(err);
    });
 
  }

  render() {
console.log("Email:",this.state.email)
    return (
      <div className="submitEmail">
      <form onSubmit={this.handleSubmit}>
          Email address to receive image:
          <textarea onChange={this.handleChange} />
          <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

class WebcamCapture extends React.Component {
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  constructor(props) {
    super(props);
    this.state = {
      photo: null, text: "", audio: false, boxSize: { width: 450, height: 450 }
    };

    this.handleChange = this.handleChange.bind(this);
  }

 
  capture = () => {
    const imageSrc = this.webcam.getScreenshot()
    let c = document.getElementById("capturedPic");
    let ctx = c.getContext("2d");
    var img = new Image();
    c.width = 450;  
    c.height = 450;
    img.onload = ({path}) => ctx.drawImage(path[0], 10, 10);
    img.src = imageSrc
  };

  handleChange(e) {
    let text = e.target.value;
    let c = document.getElementById("capturedPic");
    let ctx = c.getContext("2d");
    ctx.font = "40pt Calibri";
    ctx.fillText(text, 40, 40);
    this.setState({text: text});
  } 




  render() {

    return (
      <div>
         <h2>Make a Postcard using your webcam</h2>
          <div className="instructions">
         <h3> How to use application:</h3>
         <p> Once webcam is loaded, strike a desired pose then click the "Captured Photobutton" botton</p>
         <p> Your image will be rendered.Once you have your desired image you can write a short message on your picture</p>
         <p> Enter a email address to send your postcard then hit submit!</p>
          </div>
        <div className="mainApp">
        <div className="liveCam" >
          <Webcam 
          audio={false}
          height={450}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={450}
        />
        <button className="cambutton" onClick={this.capture}>Capture photo</button>
         </div>
    


        <div className="camImage">

              <label>
               Postcard Message:
              <textarea value={this.state.text} onChange={this.handleChange} />
              <canvas id="capturedPic"></canvas>
              </label>
        </div>

        </div>
        <EmailForm className="submitform"/>
      </div>

    );
  }
}
ReactDOM.render(
  <WebcamCapture />,
  document.getElementById('root')
);
