import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAuthorization } from '../actions/AuthActions'

class AuthSwitch extends Component {
  componentWillMount() {
    // Save url queryString
    const queryString = this.props.location.search
    // Check if it contains a CODE
    // If so, send to backend API
    if (queryString.includes('code')) {
      const code = queryString.split('=')[1]
      // Dispact action!
      this.props.fetchAuthorization(code)
      .then(this.props.history.push("/"))
    } else {
      // If not, redirect to home page
      this.props.history.push("/")
    }
  }
  render() {
    return <h1>Authorized redirect page</h1>
  }
}

const mapDispatchToProps = {
  fetchAuthorization
}


export default connect(null, mapDispatchToProps)(AuthSwitch)
