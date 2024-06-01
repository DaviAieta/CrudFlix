"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function AuthRegister() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3333/auth/sendMagicLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      if (response.ok) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        toast({
          title: "Email successfully sent",
          description: `E-mail ${email}`,
        });
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
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Magic Link Login
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Enter your email and to send you a magic link to sign in.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email address
            </Label>
            <Input
              id="email"
              placeholder="Email address"
              required
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? "Loading..." : "Create Account"}
          </Button>
        </form>
      </div>
    </div>
  );
}
