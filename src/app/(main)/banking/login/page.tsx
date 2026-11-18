"use client";

import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ArrowRight, Eye, EyeOff, KeyRound, Lock, Mail, ShieldCheck, User, X, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useBankingStore } from "@/lib/banking/banking-store";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, users, currentUser } = useBankingStore();

  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage("Please enter your account email or account number.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your account password.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = loginUser(identifier, password);
      setIsSubmitting(false);

      if (res.success) {
        router.push("/banking/transfer");
      } else {
        setErrorMessage(res.message);
      }
    }, 500);
  };

  const handleQuickFill = (email: string, pass: string) => {
    setIdentifier(email);
    setPassword(pass);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="w-full max-w-md space-y-4">
        {/* Quick Demo Credentials Assistant */}
        <div className="rounded-xl border bg-muted/40 p-3.5 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Zap className="size-3.5 text-amber-500 fill-amber-500" />
            Quick Demo Autofill (1-Click Test)
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            Click any account below to autofill its credentials and sign in:
          </p>
          <div className="flex flex-col gap-1.5 pt-1">
            {users.slice(0, 3).map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickFill(u.email, u.password)}
                className="flex items-center justify-between rounded-lg border bg-card px-2.5 py-1.5 text-left text-xs transition-colors hover:bg-muted"
              >
                <div className="flex items-center gap-2">
                  <User className="size-3 text-muted-foreground" />
                  <span className="font-medium text-foreground">{u.name}</span>
                  <span className="font-mono text-muted-foreground text-[10px]">({u.accountNumber})</span>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]"
                >
                  ${u.balance.toFixed(2)}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form Card */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-primary/30 text-primary">
                Step 2 of 3
              </Badge>
              <KeyRound className="size-4 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Secure Sign In</CardTitle>
            <CardDescription>Access your bank account to transfer funds or review balance.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
                  <X className="size-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Identifier */}
              <div className="space-y-1.5">
                <label htmlFor="login-identifier" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                  <Mail className="size-3.5 text-muted-foreground" />
                  Email or Account Number
                </label>
                <Input
                  id="login-identifier"
                  placeholder="e.g. amir@example.com or ACC-8801"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="h-9 text-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="login-password" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <Lock className="size-3.5 text-muted-foreground" />
                    Account Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                  >
                    {showPassword ? <EyeOff className="size-3" /> : <Eye className="size-3" />}
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-9 text-sm font-mono"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full gap-2 mt-2 font-medium">
                {isSubmitting ? "Authenticating..." : "Sign In & Access Dashboard"}
                <ArrowRight className="size-4" />
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>Don't have an account yet?</span>
                <Link href="/banking/register" className="text-primary font-medium hover:underline">
                  Register new account
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
