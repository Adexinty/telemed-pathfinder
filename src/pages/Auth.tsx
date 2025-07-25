import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Heart, Stethoscope } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'patient',
    phone: '',
    dateOfBirth: undefined as Date | undefined,
    // Doctor specific fields
    licenseNumber: '',
    specialization: '',
    yearsOfExperience: '',
    consultationFee: '',
    bio: '',
    education: '',
  });

  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (field: string, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await signIn(formData.email, formData.password);
    } else {
      if (formData.password !== formData.confirmPassword) {
        return;
      }

      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: formData.role,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth?.toISOString().split('T')[0],
        ...(formData.role === 'doctor' && {
          license_number: formData.licenseNumber,
          specialization: formData.specialization,
          years_of_experience: parseInt(formData.yearsOfExperience) || 0,
          consultation_fee: parseFloat(formData.consultationFee) || 0,
          bio: formData.bio,
          education: formData.education,
        })
      };

      await signUp(formData.email, formData.password, userData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Heart className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">TeleMed Connect</h1>
          <p className="text-gray-600 mt-2">Your Digital Healthcare Platform</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to access your healthcare dashboard' 
                : 'Join our telemedicine platform today'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <Tabs value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="patient" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Patient
                    </TabsTrigger>
                    <TabsTrigger value="doctor" className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4" />
                      Doctor
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="patient" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label>Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.dateOfBirth && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.dateOfBirth}
                            onSelect={(date) => handleInputChange('dateOfBirth', date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TabsContent>

                  <TabsContent value="doctor" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="doctorFirstName">First Name</Label>
                        <Input
                          id="doctorFirstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="doctorLastName">Last Name</Label>
                        <Input
                          id="doctorLastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="licenseNumber">Medical License Number</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialization">Specialization</Label>
                      <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general_practice">General Practice</SelectItem>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="dermatology">Dermatology</SelectItem>
                          <SelectItem value="endocrinology">Endocrinology</SelectItem>
                          <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="oncology">Oncology</SelectItem>
                          <SelectItem value="orthopedics">Orthopedics</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                          <SelectItem value="radiology">Radiology</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                        <Input
                          id="yearsOfExperience"
                          type="number"
                          value={formData.yearsOfExperience}
                          onChange={(e) => handleInputChange('yearsOfExperience', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                        <Input
                          id="consultationFee"
                          type="number"
                          step="0.01"
                          value={formData.consultationFee}
                          onChange={(e) => handleInputChange('consultationFee', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={formData.education}
                        onChange={(e) => handleInputChange('education', e.target.value)}
                        placeholder="Medical school, residency, etc."
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;