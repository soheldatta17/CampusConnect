import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { GoogleButton } from '../components/auth/GoogleButton';
import { signUp, signInWithGoogle } from '../lib/firebase/auth';
import toast from 'react-hot-toast';

export function SignUpPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    const { user, error } = await signUp(
      formData.email,
      formData.password,
      formData.displayName
    );

    if (error) {
      setErrors({ auth: error.message });
      toast.error('Sign up failed. Please try again.');
    } else if (user) {
      toast.success('Account created successfully!');
      navigate('/');
    }

    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const { user, error } = await signInWithGoogle();

    if (error) {
      toast.error('Google sign in failed. Please try again.');
    } else if (user) {
      toast.success('Welcome to College Super App!');
      navigate('/');
    }

    setIsGoogleLoading(false);
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Sign up to get started"
    >
      <div className="space-y-6">
        <GoogleButton
          onClick={handleGoogleSignIn}
          isLoading={isGoogleLoading}
        />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-gray-900">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            error={errors.displayName}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
            required
          />

          {errors.auth && (
            <p className="text-red-400 text-sm text-center">{errors.auth}</p>
          )}

          <Button type="submit" isLoading={isLoading}>
            Create Account
          </Button>

          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}