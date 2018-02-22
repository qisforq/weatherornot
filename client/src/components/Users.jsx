import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleInput: true
    }
  }

  render() {
    return (
      <div>
        <h1>hello.</h1>
        {!this.state.toggleInput ?
          <span
            onClick={() => {
              console.log(`ow! bye ${this.props.username}`);
              this.setState({toggleInput: true})
            }}>
            {this.props.username}
          </span>
          :
          <input
            autoFocus
            type="text"
            placeholder={this.state.userInput || "name"}
            value={this.state.input}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                this.props.handleName(event.target.value)
                this.setState({
                  toggleInput: false
                })
                console.log(`here comes ${event.target.value}`)
              }
            }}
          />
        }
      </div>
    )
  }
}

export default Users;
