"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function AuthLogout() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const logout = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);

    Cookies.remove("auth_token");

    toast({
      title: "Logout successfully",
      description: `Comeback later!`,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/auth/login");
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-[100dvh] justify-center px-4 py-12 mt-10">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Logout
          </h1>
        </div>
        <form className="space-y-4" onSubmit={logout}>
          <Button className="w-full" type="submit" disabled={submitting}>
            {submitting ? "Loading..." : "Logout"}
          </Button>
        </form>
      </div>
    </div>
  );
}
