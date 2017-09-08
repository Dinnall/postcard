import React from 'react';
import ReactDOM from 'react-dom';
import Webcam from 'react-webcam';
import {Component} from 'react'
import $ from 'jquery';



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
    border: '10px solid green',
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
    this.setState({email: event.target.email});
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
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Input email:
          <textarea value={this.state.email} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
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


        <div className="liveCam" >
          <Webcam
          audio={false}
          height={450}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={450}
        />
        <button className="CaptureBotton" onClick={this.capture}>Capture photo</button>
         </div>


      
        <div id="test">
              <textarea value={this.state.text} onChange={this.handleChange} />
              <canvas id="capturedPic"></canvas>
        </div>

        <EmailForm />

      </div>

    );
  }
}
ReactDOM.render(
  <WebcamCapture />,
  document.getElementById('root')
);
