import React from 'react';
import ReactDOM from 'react-dom';
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
    maxWidth: 340,
    maxHeight: 340,
    minWidth: 340,
    minHeight: 340,
    margin: 30,
  },
  box: {
    maxWidth: 340,
    maxHeight: 340,
    minWidth: 340,
    minHeight: 340,
    border: '10px solid green',
  }
}

const Camera = (props) => {
    return(
      <div className="camera"
    style={ styles.box }
  >
    <video id="video"
      style={ styles.picSize }
    ></video>
    <button id="startbutton"
      onClick={ props.handleStartClick }
    >Take photo</button>
  </div>
    )
}

const Photo = (props) => {
    return(
        <div className="output"
            style={ styles.box }>
           <img id="photo" alt="Your photo"
              style={ styles.picSize } />
              <button id="saveButton" onClick={ props.handleSaveClick }>Save Photo</button>
         </div>
    )
}

//Components
class Capture extends React.Component{
  constructor(props) {
    super(props);
    this.state = {  
  constraints: { photo: null,audio: false, video: { width: 320, height: 320, startbutton:null } }
  };
    this.handleStartClick = this.handleStartClick.bind(this);  
    this.takePicture = this.takePicture.bind(this);  
    this.clearPhoto = this.clearPhoto.bind(this);  
  }
  componentDidMount(){
    const constraints = this.state.constraints;  
    console.log("CONSTRAINTS:",constraints)
const getUserMedia = (params) => (  
  new Promise((successCallback, errorCallback) => {
    return navigator.webkitGetUserMedia.call(navigator, params, successCallback, errorCallback);
  })
);

getUserMedia(constraints)  
.then((stream) => {
  const video = document.querySelector('video');
  const vendorURL = window.URL || window.webkitURL;

  video.src = vendorURL.createObjectURL(stream);
  video.play();
})
.catch((err) => {
  console.log(err);
});

this.clearPhoto(); 
  }

clearPhoto(){
      const canvas = document.querySelector('canvas');  
      const photo = document.getElementById('photo');  
      const context = canvas.getContext('2d');  
      const { width, height } = this.state.constraints.video;  
      context.fillStyle = '#FFF';  
      context.fillRect(0, 0, width, height);

      const data = canvas.toDataURL('image/png');  
      photo.setAttribute('src', data); 
    }

handleStartClick(event){
    event.preventDefault();  
    this.takePicture();  
    }

takePicture(){
    const canvas = document.querySelector('canvas');  
    const context = canvas.getContext('2d');  
    const video = document.querySelector('video');  
    const photo = document.getElementById('photo');  
    const { width, height } = this.state.constraints.video;
    const startbutton = document.getElementById('startbutton');
  
     let streaming = false;

    canvas.width = width;  
    canvas.height = height;  
    context.drawImage(video, 0, 0, width, height);

    const data = canvas.toDataURL('image/png'); 
    console.log("PHOTO:",photo) 
    photo.setAttribute('src', data);  


    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    )
console.log("VIDEO:",video)
    video.addEventListener('canplay', function(ev){
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    streaming = true;

   
    }, false);
console.log("Start Button:",startbutton)

startbutton.addEventListener('click', function(event){
      event.preventDefault();
      this.takePicture();
      console.log("Taking pictures:",this.takePicture())
    }, false);
    
  this.clearPhoto();
  }
render(){
    return (  
      <div className="capture"
        style={ styles.capture }
      >
        <Camera
          handleStartClick={ this.handleStartClick }
        />
        <canvas id="canvas"
          style={ styles.picSize }
          hidden
        ></canvas>
        <Photo />
      </div>
    );
  }
}
ReactDOM.render(
  <Capture />,
  document.getElementById('root')
);
