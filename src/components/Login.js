import React from "react";
import { withRouter } from "react-router";
import auth from "alfresco-js-utils/lib/Authentication";


const Login = withRouter(
  React.createClass({

    getInitialState() {
      return {
        error: false
      }
    },

    handleSubmit(event) {
      event.preventDefault()

      const username = this.refs.username.value
      const pass = this.refs.pass.value

      auth.login(username, pass).then((loggedIn) => {
         if (!loggedIn)
         {
            this.setState({ error: true })
         }
         else
         {
            const { location } = this.props
            if (location.state && location.state.nextPathname) 
            {
               this.props.router.replace(location.state.nextPathname)
            } 
            else 
            {
               this.props.router.replace('/')
            }
         }
      });
    },

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label><input ref="username" placeholder="username" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
      )
    }
  })
)

export default Login;