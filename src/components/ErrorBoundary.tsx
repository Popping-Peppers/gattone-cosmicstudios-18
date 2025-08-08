import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // In production, you might want to log to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-cosmic-dark text-cosmic-light">
          <div className="text-center p-8 max-w-md">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2 text-cosmic-accent">
                Oops! Something went wrong
              </h1>
              <p className="text-cosmic-muted mb-6">
                An unexpected error occurred while loading this page. 
                Don't worry, this has been logged and we'll investigate the issue.
              </p>
            </div>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-cosmic-purple hover:bg-cosmic-accent transition-colors px-6 py-2 rounded-lg font-medium"
            >
              Refresh Page
            </button>
            
            <button
              onClick={() => (window.location.href = '/')}
              className="ml-4 border border-cosmic-purple hover:bg-cosmic-purple/10 transition-colors px-6 py-2 rounded-lg font-medium"
            >
              Go Home
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-cosmic-muted hover:text-cosmic-light">
                  Show Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-4 bg-black/50 rounded text-xs overflow-auto text-red-300">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}