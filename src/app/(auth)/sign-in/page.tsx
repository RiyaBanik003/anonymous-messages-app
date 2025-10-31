'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { signInSchema } from '@/schemas/signInSchema';
import { signIn } from 'next-auth/react';
export default function SignInForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });





  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  setIsSubmitting(true);
  const result = await signIn('credentials', {
    redirect: false,
    identifier: data.identifier,
    password: data.password,
  });
  setIsSubmitting(false);

  console.log("Sign-in result:", result);

  if (result?.error) {
    if (result.error === 'CredentialsSignin') {
      toast.error('Invalid email/username or password');
    } else {
      toast.error(result.error);
    }
    return;
  }

  if (result?.ok && result.url) {
    toast.success('Signed in successfully!');
    router.replace('/dashboard');
    return;
  }

  toast.error('An unexpected error occurred');
};



    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Join mystery message
            </h1>
            <p className="mb-4">Sign in to start your anonymous adventure</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input
                      {...field}
                      placeholder="Enter your email or username"
                    />
                    
                    <FormMessage />
                  </FormItem>
                )}
              />

              
              {/* Password Field */}
              <FormField
  control={form.control}
  name="password"
  render={({ field }) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <div className="relative">
            <Input
              {...field}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-800"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.958 9.958 0 013.22-7.422m3.28-2.49A9.956 9.956 0 0112 1c5.523 0 10 4.477 10 10 0 2.31-.784 4.435-2.094 6.124M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3l18 18M9.88 9.88A3 3 0 0112 9a3 3 0 013 3c0 .43-.09.84-.25 1.21m-2.75 2.75A3.001 3.001 0 019 12m9 6a9.77 9.77 0 01-6 2c-5.523 0-10-4.477-10-10 0-2.23.737-4.284 1.97-5.947m2.104-2.186A9.962 9.962 0 0112 2c5.523 0 10 4.477 10 10a9.961 9.961 0 01-1.97 5.947"
                  />
                </svg>
              )}
            </button>
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    );
  }}
/>


              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Form>

          <div className="text-center mt-4">
            <p>
              Don't have an Account?{' '}
              <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  
}
