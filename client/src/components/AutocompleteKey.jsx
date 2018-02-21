import Script from 'react-load-script'

...

render() {
  return (
    <Script
      url="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"
      onCreate={this.handleScriptCreate.bind(this)}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}
    />
  )
}

...

handleScriptCreate() {
  this.setState({ scriptLoaded: false })
}

handleScriptError() {
  this.setState({ scriptError: true })
}

handleScriptLoad() {
  this.setState({ scriptLoaded: true })
}
 
