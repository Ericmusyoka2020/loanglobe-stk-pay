import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Shield, DollarSign, Clock, LogOut } from "lucide-react";

interface LoanFormData {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
}

const LoanApplication = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    fullName: "",
    idNumber: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();

  const handleInputChange = (field: keyof LoanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { fullName, idNumber, phoneNumber } = formData;
    
    if (!fullName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!idNumber.trim()) {
      toast({
        title: "Missing Information", 
        description: "Please enter your ID number.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!phoneNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your phone number.",
        variant: "destructive",
      });
      return false;
    }
    
    // Basic phone number validation (Kenya format)
    if (!/^(\+?254|0)[0-9]{9}$/.test(phoneNumber.replace(/\s/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid Kenyan phone number.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Store loan application in Supabase
      const { error } = await supabase
        .from('loan_applications')
        .insert([
          {
            user_id: user?.id,
            full_name: formData.fullName,
            id_number: formData.idNumber,
            phone_number: formData.phoneNumber,
            status: 'submitted'
          }
        ]);

      if (error) {
        throw error;
      }

      // Send data to Formspree as well
      await fetch('https://formspree.io/f/xqadzdpo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          idNumber: formData.idNumber,
          phoneNumber: formData.phoneNumber,
          userEmail: user?.email,
          timestamp: new Date().toISOString(),
        }),
      });

      toast({
        title: "Success!",
        description: "Your loan application has been submitted successfully.",
      });
      navigate("/success");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Loan Application
            </h1>
            <p className="text-muted-foreground text-lg">
              Complete your loan application in just a few steps
            </p>
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Secure Process</h3>
            <p className="text-sm text-muted-foreground">Your data is protected with bank-level security</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Quick Approval</h3>
            <p className="text-sm text-muted-foreground">Get approved in minutes, not days</p>
          </div>
          <div className="text-center p-6 bg-card rounded-lg shadow-sm">
            <DollarSign className="h-12 w-12 text-success mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Fair Rates</h3>
            <p className="text-sm text-muted-foreground">Competitive interest rates for everyone</p>
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-financial">
            <CardHeader>
              <CardTitle className="text-2xl">Application Details</CardTitle>
              <CardDescription>
                Please provide your information to proceed with the loan application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name as per ID"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    type="text"
                    placeholder="Enter your national ID number"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="e.g., 0712345678 or +254712345678"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="h-12"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg bg-gradient-to-r from-success to-secondary hover:shadow-success transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? "Submitting Application..." : "Submit Loan Application"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By clicking "Submit Loan Application", you agree to our terms and conditions. 
                  Your application will be processed and you will be contacted soon.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;