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
import Cookies from "js-cookie"; // Import js-cookie

interface SignUpData {
  email: string;
  password: string;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const handleSignUpRedirect = () => {
    router.push("/auth/sign-up");
  };

  const [signUpForm, setSignUpForm] = useState<SignUpData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

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
            process.env.NEXT_PUBLIC_API_URL + "/auth/login",
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
        setError(null);
      },
      onSuccess: (data) => {
        // Store tokens in cookies
        Cookies.set("accessToken", data.accessToken, { expires: 1 }); // Expires in 1 day
        Cookies.set("refreshToken", data.refreshToken, { expires: 7 }); // Expires in 7 days

        // Redirect to dashboard on successful login
        router.push("/dashboard");
      },
      onError: (err: Error) => {
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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
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
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Logging in..." : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                onClick={handleSignUpRedirect}
                className="underline underline-offset-4"
              >
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
