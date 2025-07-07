'use client';

import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, ThemeSwitcher } from '@my-org/shared';
import { ChevronRight, Book, Globe, Youtube, Zap, Award, Terminal, Heart } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with theme switcher */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">@my-org/web</h1>
          <ThemeSwitcher />
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            <span className="text-muted-foreground block text-2xl md:text-3xl font-normal mb-2">Hello there,</span>
            Welcome to <span className="text-primary">@my-org/web</span> 👋
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern Nx monorepo with Next.js, React, and ShadCN components for exploring web development patterns.
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-12 text-primary-foreground">
          <CardContent className="p-8">
            <div className="flex items-center justify-center gap-4 text-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">You&apos;re up and running!</h2>
                <p className="text-primary-foreground/80 mt-2">
                  Your Nx monorepo with ShadCN components is ready for development.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Learning Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="w-5 h-5" />
                Learning Resources
              </CardTitle>
              <CardDescription>
                Everything you need to master Nx and modern web development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <a
                href="https://nx.dev/getting-started/intro?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors group"
              >
                <Book className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Documentation</div>
                  <div className="text-sm text-muted-foreground">Everything is in there</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://nx.dev/blog/?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors group"
              >
                <Globe className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Blog</div>
                  <div className="text-sm text-muted-foreground">Changelog, features & events</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://www.youtube.com/@NxDevtools/videos?utm_source=nx-project&sub_confirmation=1"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors group"
              >
                <Youtube className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">YouTube Channel</div>
                  <div className="text-sm text-muted-foreground">Nx Show, talks & tutorials</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://nx.dev/react-tutorial/1-code-generation?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors group"
              >
                <Zap className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Interactive Tutorials</div>
                  <div className="text-sm text-muted-foreground">Create an app, step-by-step</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://nxplaybook.com/?utm_source=nx-project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors group"
              >
                <Award className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-medium">Video Courses</div>
                  <div className="text-sm text-muted-foreground">Nx custom courses</div>
                </div>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </CardContent>
          </Card>
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common tasks and development tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full justify-start h-auto p-4">
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console&utm_source=nx-project"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Install Nx Console for VSCode</div>
                    <div className="text-sm text-muted-foreground">The official VSCode extension for Nx</div>
                  </div>
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-auto p-4">
                <a
                  href="https://plugins.jetbrains.com/plugin/21060-nx-console"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">JB</span>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Install Nx Console for JetBrains</div>
                    <div className="text-sm text-muted-foreground">Available for WebStorm, IntelliJ IDEA and more</div>
                  </div>
                </a>
              </Button>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeWidth="2" d="M23 3.75V6.5c-3.036 0-5.5 2.464-5.5 5.5s-2.464 5.5-5.5 5.5-5.5 2.464-5.5 5.5H3.75C2.232 23 1 21.768 1 20.25V3.75C1 2.232 2.232 1 3.75 1h16.5C21.768 1 23 2.232 23 3.75Z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold">Nx Cloud</h3>
                    <p className="text-sm text-muted-foreground">Enable faster CI & better DX</p>
                  </div>
                </div>
                <p className="text-sm mb-3">Activate distributed tasks and caching:</p>
                <code className="block bg-muted px-3 py-2 rounded text-sm mb-3">nx connect</code>
                <Button asChild variant="link" className="p-0 h-auto">
                  <a href="https://nx.app/?utm_source=nx-project" target="_blank" rel="noreferrer">
                    What is Nx Cloud?
                  </a>
                </Button>
              </div>
              <Button asChild variant="outline" className="w-full justify-start h-auto p-4">
                <a
                  href="https://github.com/nrwl/nx?utm_source=nx-project"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Nx is open source</div>
                    <div className="text-sm text-muted-foreground">Love Nx? Give us a star!</div>
                  </div>
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              Here are some things you can do with your Nx monorepo:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Add UI Library
                </h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  <div className="text-muted-foreground"># Generate UI lib</div>
                  nx g @nx/next:library ui<br/>
                  <div className="text-muted-foreground"># Add a component</div>
                  nx g @nx/next:component ui/src/lib/button
                </code>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  View Project Details
                </h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  nx show project @my-org/web --web
                </code>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Interactive Project Graph
                </h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  nx graph
                </code>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Run Affected Commands
                </h4>
                <code className="block bg-muted p-3 rounded text-sm">
                  <div className="text-muted-foreground"># See what&apos;s affected</div>
                  nx affected:graph<br/>
                  <div className="text-muted-foreground"># Run tests</div>
                  nx affected:test
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center py-8 border-t">
          <p className="text-muted-foreground flex items-center justify-center gap-2 mb-4">
            Carefully crafted with
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            and modern tooling
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button>Get Started</Button>
            <Button variant="outline">View Docs</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
