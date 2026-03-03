import { Component } from 'react'

export class SceneErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    console.error('[Space scene] Asset or render error:', error?.message || error)
  }

  render() {
    if (this.state.error) {
      return null
    }
    return this.props.children
  }
}
