import React from 'react';
import {Socket} from 'phoenix';

class Client extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {messages: [], message: ''};
  }

  componentDidMount() {
    let socket = new Socket("ws://localhost:4000/socket", {
      params: {username: this.props.username}
    });
    socket.connect();
    let channel = socket.channel("chat:lobby");
    this.channel = channel;
  
    channel.join()
      .receive("ok", ({messages}) => console.log("catching up", messages) )
      .receive("error", ({reason}) => console.log("failed join", reason) )
      .receive("timeout", () => console.log("Networking issue. Still waiting..."));

      channel.on("handle_message", msg => {
        this.setState({messages: [...this.state.messages, msg]});
      });
  }
  
  sendMessage() {
    this.channel.push("send_message", {
      username: this.props.username,
      text: this.state.message
    });
    this.setState({message: ''})
  }

  render() {
    return (
      <div style={{display:'flex'}}>
      <div style={{width:'60%'}}>
        <div
          style={{height: '500px',
          overflowY: 'scroll',
          border: '1px solid #474747'}}
        >
          {
            this.state.messages.map((msg, index) => (
              msg.username === this.props.username ?
                <div key={index}
                  style={{float: 'right', textAlign: 'left', width:'60%',
                  borderRadius: '5px', marginTop: '5px' ,padding: '5px',
                  backgroundColor: '#e6f2ff'}}
                >
                  {msg.text}
                </div>
                :
                <div key={index}
                  style={{float: 'left', textAlign: 'left', width:'60%',
                  borderRadius: '5px', marginTop: '5px', padding: '5px',
                  backgroundColor: 'lightgray'}}
                >
                  <strong>[{msg.username}] </strong>{msg.text}
                </div>
              )
            )
          }
          </div>
          <div>
            <textarea
              style={{width: '80%', height: '60px', resize: 'none'}}
              value={this.state.message}
              onChange={ev => this.setState({message: ev.target.value})}
            />
            <button onClick={() => this.sendMessage()}>Send</button>
          </div>
      </div>
      <div style={{width:'40%', backgroundColor: 'lightgray'}}>
      </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username : "", text: ""};
  }
  render() {
    return (
      <div>
        {
          this.state.username ?
            <Client username={this.state.username} />
          :
            <div>
              <input
                value={this.state.text}
                onChange={(ev) => this.setState({text : ev.target.value})}
              />
              <button
                onClick={() => this.setState({username: this.state.text})}>
                Enter
              </button>
            </div>
        }
      </div>
    );
  }
}

export default App;