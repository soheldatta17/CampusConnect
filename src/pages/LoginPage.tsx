import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/auth/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { GoogleButton } from '../components/auth/GoogleButton';
import { signIn, signInWithGoogle } from '../lib/firebase/auth';
import toast from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const { user, error } = await signIn(formData.email, formData.password);

    if (error) {
      setErrors({ auth: 'Invalid email or password' });
      toast.error('Login failed. Please check your credentials.');
    } else if (user) {
      toast.success('Welcome back!');
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
      toast.success('Welcome back!');
      navigate('/');
    }

    setIsGoogleLoading(false);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue"
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
            required
          />
          
          {errors.auth && (
            <p className="text-red-400 text-sm text-center">{errors.auth}</p>
          )}

          <Button type="submit" isLoading={isLoading}>
            Sign In
          </Button>

          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}