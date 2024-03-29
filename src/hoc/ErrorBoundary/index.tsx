/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, ReactElement } from "react";

const MISSING_ERROR = "Unknown Error";

interface IProps {
  children: ReactElement;
}

interface IState {
  readonly error: Error | null | undefined;
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { error: undefined };
  }

  componentDidCatch(error: Error | null): void {
    // You can also log the error to an error reporting service
    this.setState({ error: error || new Error(MISSING_ERROR) });
  }

  render(): ReactElement {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong. See details below:</h1>
          <div className="error-text">{error.message}</div>
        </>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
