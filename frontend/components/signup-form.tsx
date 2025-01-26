"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";
import { REACT_APP_API_HOST } from "@/envs";
interface SignUpData {
  email: string;
  password: string;
}
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const handleSignInRedirect = () => {
    router.push("/auth/sign-in"); // Programmatically navigate to the Sign-In page
  };

  const [signUpForm, setSignUpForm] = useState<SignUpData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null); // Track error message

  const handleSignUpForm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
      setSignUpForm((prev) => ({
        ...prev,
        [name]: e.target.value,
      }));
    },
    []
  );

  const mutation: UseMutationResult<any, Error, SignUpData, void> = useMutation(
    {
      mutationFn: async (signUp: { email: string; password: string }) => {
        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_URL + "/auth/register",
            signUp
          );
          return response.data; // Return the response data
        } catch (err: any) {
          throw new Error(
            err.response?.data?.message || "Something went wrong"
          );
        }
      },
      onMutate: () => {
        setError(null); // Reset the error before mutation starts
      },
      onSuccess: (data) => {
        // Handle success (e.g., redirect to another page or show a success message)
        router.push("/auth/sign-in"); // Redirect to sign-in page on successful registration
      },
      onError: (err: Error) => {
        // Handle error (e.g., show an error message)
        setError(err.message);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(signUpForm); // Trigger the mutation with the form data
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">SignUp</CardTitle>
          <CardDescription>Enter your email below to signup</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => handleSignUpForm(e, "email")}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => handleSignUpForm(e, "password")}
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm mt-2">
                  {error} {/* Display error message */}
                </div>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isLoading} // Disable button while loading
              >
                {mutation.isLoading ? "Signing Up..." : "Sign Up"}
              </Button>
              <Button variant="outline" className="w-full">
                Sign Up with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a
                href="#"
                onClick={handleSignInRedirect}
                className="underline underline-offset-4"
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
