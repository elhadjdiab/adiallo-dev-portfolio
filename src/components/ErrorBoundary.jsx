"use client";

import { Component } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0B0F14] px-6">
          <Card hover={false} className="max-w-md border-red-500/25 bg-red-500/10">
            <h1 className="mb-2 text-xl font-bold text-red-200">
              Une erreur est survenue
            </h1>
            <p className="mb-6 text-sm text-red-300">
              {this.state.error?.message || "Erreur inattendue"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="secondary"
              className="w-full"
            >
              Recharger la page
            </Button>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
