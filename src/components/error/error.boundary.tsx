import React, { ErrorInfo, PropsWithChildren } from 'react';

interface Props {
  level: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<PropsWithChildren<Props>, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('ERROR:\n', error, '\n', errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { level, children } = this.props;
    if (hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong on LEVEL {level}.</h1>
          <div>{error?.message}</div>
        </>
      );
    }

    return children;
  }
}
