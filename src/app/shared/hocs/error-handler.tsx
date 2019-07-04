import * as React from 'react';
import { Redirect } from 'react-router';

interface ErrorHandlerState {
  hasError: boolean;
}

export const withErrorHandler = <WrappedProps extends object>(
  WrappedComponent: React.ComponentType<WrappedProps>
) =>
  class ErrorHandler extends React.Component<WrappedProps, ErrorHandlerState> {
    state = { hasError: false };
    render() {
      const { hasError } = this.state;
      if (!hasError) {
        return <WrappedComponent {...this.props as WrappedProps} />;
      } else {
        return <Redirect to="/error/1111" />;
      }
    }

    componentDidCatch = (error: any, info: any) => {
      this.setState({ hasError: true });
    };
  };
