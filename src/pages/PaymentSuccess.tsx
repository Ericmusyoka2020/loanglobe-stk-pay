import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle, Home, Phone, Mail, LogOut } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    // Add some celebratory animation or confetti here if desired
    document.title = "Success - LoanGlobe";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/10 via-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-success to-secondary bg-clip-text text-transparent">
              Application Successful!
            </h1>
          </div>
          <Button 
            onClick={signOut} 
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
        
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8 animate-bounce">
            <CheckCircle className="h-24 w-24 text-success mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-success mb-2">
              Application Submitted Successfully!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your loan application has been received and is being processed
            </p>
          </div>

          {/* Success Details Card */}
          <Card className="shadow-success mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-success">
                🎉 Congratulations!
              </CardTitle>
              <CardDescription className="text-lg">
                Thank you for choosing LoanGlobe! Your application has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-success/10 to-primary/10 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
                <div className="grid gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="bg-success/20 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Application Received</p>
                      <p className="text-sm text-muted-foreground">Your loan application has been successfully submitted to our processing team</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-success/20 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Email Confirmation</p>
                      <p className="text-sm text-muted-foreground">You'll receive a confirmation email within 5 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-success/20 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Call</p>
                      <p className="text-sm text-muted-foreground">Our team will contact you within 24 hours for verification</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Reference Number:</strong> LG{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep this reference number for your records
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/")}
              className="w-full max-w-md bg-gradient-to-r from-primary to-secondary hover:shadow-financial transition-all duration-300"
            >
              <Home className="h-5 w-5 mr-2" />
              Return to Home
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team at{" "}
                <a href="mailto:support@loanglobe.com" className="text-primary hover:underline">
                  support@loanglobe.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;