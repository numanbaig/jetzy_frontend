import React from "react";
import { Link } from "react-router-dom";

export default function Home(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <nav className="bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-400">SalesSync</div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/auth/login" className="hover:text-blue-400 transition-colors">Login</Link>
            <Link 
              to="/auth/signup" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Boost Your Sales Performance</h1>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          The ultimate dashboard for tracking, analyzing and optimizing your sales pipeline.
        </p>
        <div className="flex justify-center space-x-4">
          <Link 
            to="/auth/signup" 
            className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Free Trial
          </Link>
        </div>
      </section>
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Real-time Analytics",
              description: "Track your sales performance with live updates",
              icon: "📊"
            },
            {
              title: "Product Management",
              description: "Organize and manage your product catalog",
              icon: "📦"
            },
            {
              title: "Sales Pipeline",
              description: "Visualize and optimize your sales process",
              icon: "🚀"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-slate-800/50 p-6 rounded-xl hover:bg-slate-800/70 transition-colors">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-slate-900/50 py-8 mt-12">
        <div className="container mx-auto px-6 text-center text-slate-400">
          © {new Date().getFullYear()} SalesSync. All rights reserved.
        </div>
      </footer>
    </div>
  );
}