import React from 'react';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: props.username || '',
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
              console.log('ow');
              this.setState({toggleInput: true})
            }}>
            {this.state.userInput}
          </span>
          :
          <input
            type="text"
            placeholder={this.state.userInput || "name"}
            value={this.state.input}
            // onClick={() => {
            //   this.props.handleName(this.state.userInput)
            // }}

            // onChange={(event) => {
            //   this.setState({
            //     userInput: event.target.value
            //   })
            // }}
            onKeyUp={event => {
              if (event.keyCode === 13) {
                this.setState({
                  userInput: event.target.value,
                  toggleInput: false
                })
                // userInput: event.target.value
                console.log('enter')
              }
            }}
          />
        }
      </div>
    )
  }
}

export default Users;
