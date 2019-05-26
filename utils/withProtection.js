import React from 'react'
import Router from 'next/router'

const withProtection = Component => {
  return class extends React.Component {
    state = {
      hasToken: false
    }

    componentDidMount() {
      const hasToken = localStorage.getItem('token')
      this.setState({ hasToken })
      if (!hasToken) Router.push('/sign-in')
    }

    render() {
      return this.state.hasToken ? <Component /> : null
    }
  }
}

export default withProtection
