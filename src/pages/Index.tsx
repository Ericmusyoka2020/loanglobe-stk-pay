import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Zap, Users, ArrowRight } from "lucide-react";
import financialHero from "@/assets/financial-hero.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
                    LoanGlobe
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground mt-4">
                  Your trusted partner for quick and secure loan solutions
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="text-lg">100% Secure & Encrypted</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-secondary" />
                  <span className="text-lg">Instant Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-success" />
                  <span className="text-lg">10,000+ Happy Customers</span>
                </div>
              </div>

              <div className="space-y-4">
                <Link to="/auth">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:shadow-financial transition-all duration-300 h-14 px-8 text-lg">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  Quick application • Fast approval • Competitive rates
                </p>
              </div>
            </div>

            <div className="lg:order-last">
              <img 
                src={financialHero} 
                alt="Financial services and digital banking" 
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-financial"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose LoanGlobe?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make loan applications simple, fast, and transparent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-sm hover:shadow-financial transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-primary to-primary-hover p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Bank-Level Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Your personal and financial information is protected with 256-bit SSL encryption and advanced security protocols.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-financial transition-shadow duration-300">
              <CardHeader className="text-center">
                <div className="bg-gradient-to-r from-secondary to-success p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Get approved in minutes with our automated processing system. No lengthy paperwork or waiting periods.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-financial transition-shadow duration-300">
              <CardHeader className="text-center">  
                <div className="bg-gradient-to-r from-success to-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">Trusted by Thousands</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Join over 10,000 satisfied customers who have successfully secured loans through our platform.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Get Your Loan?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start your application today and get approved in minutes
            </p>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-success to-secondary hover:shadow-success transition-all duration-300 h-14 px-12 text-lg">
                Apply for Loan Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
