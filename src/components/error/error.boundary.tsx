import React, { ErrorInfo, PropsWithChildren } from 'react';

interface Props {
  level: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log("ERROR BOUNDARY:\n", error, "\n", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong on LEVEL {this.props.level}.</h1>;
    }

    return this.props.children; 
  }
}
