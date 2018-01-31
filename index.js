import React from 'react'
import PropTypes from 'prop-types'

class Catcher extends React.Component {
  constructor(props) {
    super(props)
    this.componentDidCatch = props.onCatch
  }

  componentDidUpdate(prevProps) {
    if (prevProps.onCatch !== this.props.onCatch) {
      this.componentDidCatch = this.props.onCatch
    }
  }

  render() {
    return this.props.children
  }
}

Catcher.propTypes = {
  onCatch: PropTypes.func.isRequired,
}

export default Catcher
