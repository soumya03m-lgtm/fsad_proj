import { Component } from 'react';
import AppCrashState from '../../components/system/AppCrashState';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Central place to wire external crash reporting (Sentry, Datadog, etc.)
    // eslint-disable-next-line no-console
    console.error('Uncaught UI error', error);
  }

  render() {
    if (this.state.hasError) {
      return <AppCrashState />;
    }

    return this.props.children;
  }
}
