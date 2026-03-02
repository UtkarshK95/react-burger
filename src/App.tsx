import { Component, type ReactNode } from "react";
import Burger from "./components/Burger.tsx";

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p style={{ textAlign: "center", marginTop: "2rem", color: "#c17116" }}>
          Something went wrong. Please refresh the page.
        </p>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Burger />
    </ErrorBoundary>
  );
}

export default App;
