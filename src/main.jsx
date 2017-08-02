import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

//Components
let accessID = "yocxh7CmPlMGDQGTBKUmK"
let secretKey = "tjq8LqUhAUuI7HDbxZsSzCzN3U5EjtK2dR8XkXTv"

let urlWithToken = `http://api.aerisapi.com/forecasts/11101?client_id=${accessID}&client_secret=${secretKey}`

var App = React.createClass({
    getInitialState(){
      return({
       data : null
      })
    },
    componentDidMount(){
      $.ajax({
        url: urlWithToken,
        type: "GET"
      })
      .done( (data) => {
        console.log("CURRENT DATA:",data.response[0].periods)
        this.setState({ 
        data: data.response[0].periods
      })
    }
  )},
    temp(){
      if(!this.state.data == 0){
        return(
          <div>
            {this.state.data.map((results,idx) => {
              return(
                <div>
              <p key={idx}>
              Date:{results.dateTimeISO}
              High:{results.maxTempF}
              Low:{results.minTempF}
              </p>
              </div>
              )
            })}
          </div>
          )
      }
    },
render() {
    return (
      <div>
        {this.props.children}
        {this.temp()}
      </div>
    )
  }
})

ReactDOM.render(
  <App />,
  document.getElementById('root')
);