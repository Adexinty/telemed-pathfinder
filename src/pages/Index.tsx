import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Stethoscope, Calendar, Shield, Clock, Users } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-bold text-gray-900">TeleMed Connect</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {user ? (
                <Link to="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                  <Link to="/auth">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Healthcare at Your{' '}
            <span className="text-primary">Fingertips</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect with certified doctors, manage your medical records, and receive quality healthcare 
            from the comfort of your home with our comprehensive telemedicine platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <>
                <Link to="/auth">
                  <Button size="lg" className="px-8 py-3">
                    Book Your First Consultation
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    Join as a Doctor
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <Stethoscope className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Expert Doctors</CardTitle>
              <CardDescription>
                Connect with certified healthcare professionals across various specializations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Board-certified physicians</li>
                <li>• Multiple specializations available</li>
                <li>• Verified credentials</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Easy Scheduling</CardTitle>
              <CardDescription>
                Book appointments that fit your schedule with our flexible booking system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 24/7 booking availability</li>
                <li>• Same-day appointments</li>
                <li>• Automatic reminders</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your health data is protected with enterprise-grade security measures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• HIPAA compliant platform</li>
                <li>• End-to-end encryption</li>
                <li>• Secure data storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>24/7 Access</CardTitle>
              <CardDescription>
                Access your medical records and communicate with doctors anytime
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Family Care</CardTitle>
              <CardDescription>
                Manage healthcare for your entire family from one convenient platform
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Comprehensive Care</CardTitle>
              <CardDescription>
                From routine check-ups to specialized consultations, we've got you covered
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary rounded-2xl text-primary-foreground p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of patients and doctors who trust TeleMed Connect for their healthcare needs.
          </p>
          {!user && (
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Start Your Healthcare Journey
              </Button>
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-primary mr-2" />
              <span className="text-lg font-semibold">TeleMed Connect</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in digital healthcare. Providing quality medical care accessible to everyone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
