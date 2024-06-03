"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.login_token;

        Cookies.set("auth_token", token, { expires: 30 });

        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast({
          title: "Login successfully",
          description: `Enjoy Crudflix!`,
        });
        router.push("/movies");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] justify-center px-4 py-12 mt-10">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Login
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-3">
            Enter your email and password to access your account.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email address
            </Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="enter your password"
              required
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? "Loading..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  );
}
