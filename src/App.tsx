import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlacierBackground } from "./components/three/GlacierBackground";
import { Navigation } from "./components/layout/Navigation";
import { PageTransition } from "./components/layout/PageTransition";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Success from "./pages/Success";
import Status from "./pages/Status";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Home />
          </PageTransition>
        } />
        <Route path="/register" element={
          <PageTransition>
            <Register />
          </PageTransition>
        } />
        <Route path="/success" element={
          <PageTransition>
            <Success />
          </PageTransition>
        } />
        <Route path="/status" element={
          <PageTransition>
            <Status />
          </PageTransition>
        } />
        <Route path="/admin" element={
          <PageTransition>
            <Admin />
          </PageTransition>
        } />
        <Route path="*" element={
          <PageTransition>
            <NotFound />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Persistent 3D Glacier Background */}
        <GlacierBackground />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Animated Routes */}
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
