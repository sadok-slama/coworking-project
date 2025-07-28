import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mt-4 alert alert-danger">
          <h4>Une erreur est survenue</h4>
          <button 
            className="btn btn-primary mt-2"
            onClick={this.handleRetry}
          >
            Recharger
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}