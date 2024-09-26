// components/ErrorBoundary.tsx
"use client";
import React, { ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Uncaught error:", error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex justify-center items-center flex-col">
          <h1>Something went wrong.................</h1>
          <p>An error occurred. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
