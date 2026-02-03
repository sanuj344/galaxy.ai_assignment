'use client';

import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] to-[#f3f4f6] relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Navigation */}
      <nav className="relative z-40 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Weavy</span>
          </Link>

          {/* Menu */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Collective
              </a>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Enterprise
              </a>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Pricing
              </a>
              <a href="#" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                Request a Demo
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 border border-yellow-200/50 text-sm font-semibold text-gray-900 transition-all group"
              >
                Start Now
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Weavy Artistic Intelligence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Design AI workflows visually. Connect, configure, and create without writing code. Built for creators and engineers.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-yellow-50 hover:bg-yellow-100 border border-yellow-200/50 text-base font-semibold text-gray-900 transition-all group shadow-sm hover:shadow-md"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Text */}
          <p className="text-xs text-gray-500 pt-6">
            No credit card required • Free forever plan • 14-day premium trial
          </p>
        </div>

        {/* Right: Workflow Visualization */}
        <div className="relative h-96 lg:h-full min-h-80 order-1 lg:order-2">
          <WorkflowVisualization />
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="Visual Builder"
            description="Drag-and-drop interface to design complex AI workflows in minutes"
            icon="✨"
          />
          <Feature
            title="Smart Integration"
            description="Connect to LLMs, media processing, and data pipelines with one click"
            icon="⚡"
          />
          <Feature
            title="Execute & Monitor"
            description="Run workflows, track execution, and refine in real-time"
            icon="🎯"
          />
        </div>
      </div>

      {/* Footer CTA */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Ready to build your first workflow?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of creators designing intelligent workflows with Weavy
          </p>
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-all group shadow-lg"
          >
            Start Building Now
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* CSS for grid background */}
      <style jsx>{`
        .bg-grid {
          background-image:
            linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.05) 25%, rgba(0, 0, 0, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.05) 75%, rgba(0, 0, 0, 0.05) 76%, transparent 77%, transparent);
          background-size: 50px 50px;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .workflow-card {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .workflow-card:nth-child(2) {
          animation-delay: 0.1s;
        }

        .workflow-card:nth-child(3) {
          animation-delay: 0.2s;
        }

        .connection-line {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

function WorkflowVisualization() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Container */}
      <div className="relative w-full max-w-md h-full flex flex-col justify-center">
        {/* Node 1: Image */}
        <div className="workflow-card absolute left-0 top-0">
          <WorkflowNode 
            title="IMAGE" 
            content={
              <div className="w-full h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-md flex items-center justify-center">
                <div className="text-2xl">🖼️</div>
              </div>
            }
          />
        </div>

        {/* Node 2: Text (Center) */}
        <div className="workflow-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <WorkflowNode 
            title="PROCESS" 
            content={
              <div className="w-full h-24 bg-gradient-to-br from-purple-100 to-purple-50 rounded-md flex items-center justify-center">
                <div className="text-2xl">✨</div>
              </div>
            }
            highlight
          />
        </div>

        {/* Node 3: Video */}
        <div className="workflow-card absolute right-0 bottom-0">
          <WorkflowNode 
            title="OUTPUT" 
            content={
              <div className="w-full h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-md flex items-center justify-center">
                <div className="text-2xl">🎬</div>
              </div>
            }
          />
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
          {/* Line from Image to Process */}
          <path
            d="M 80 60 Q 150 80 220 140"
            stroke="#d1d5db"
            strokeWidth="2"
            fill="none"
            className="connection-line"
          />
          {/* Line from Process to Output */}
          <path
            d="M 320 180 Q 350 200 380 260"
            stroke="#d1d5db"
            strokeWidth="2"
            fill="none"
            className="connection-line"
            style={{ animationDelay: '0.4s' }}
          />
        </svg>
      </div>
    </div>
  );
}

function WorkflowNode({ 
  title, 
  content, 
  highlight = false 
}: { 
  title: string; 
  content: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-lg border transition-all ${
      highlight 
        ? 'border-gray-300 bg-white shadow-lg shadow-gray-200' 
        : 'border-gray-200 bg-white shadow-md shadow-gray-100'
    } overflow-hidden max-w-[140px]`}>
      <div className={`px-3 py-2 text-[10px] font-semibold tracking-widest ${
        highlight ? 'bg-gray-50 text-gray-900' : 'bg-white text-gray-700'
      }`}>
        {title}
      </div>
      <div className="p-3">
        {content}
      </div>
    </div>
  );
}

function Feature({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string;
  icon: string;
}) {
  return (
    <div className="space-y-3 p-6 rounded-lg border border-gray-200/50 bg-white/50 hover:bg-white/80 transition-colors">
      <div className="text-3xl">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
