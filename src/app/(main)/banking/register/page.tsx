"use client";

import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  DollarSign,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  User,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useBankingStore } from "@/lib/banking/banking-store";

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser } = useBankingStore();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    initialDeposit: "1000",
  });

  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successResult, setSuccessResult] = React.useState<{
    accountNo: string;
    name: string;
    deposit: number;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Live Password Validation Criteria
  const passwordCriteria = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter (A-Z)", met: /[A-Z]/.test(formData.password) },
    { label: "One lowercase letter (a-z)", met: /[a-z]/.test(formData.password) },
    { label: "One number (0-9)", met: /[0-9]/.test(formData.password) },
    { label: "One special character (!@#$%^&*)", met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) },
  ];

  const metCount = passwordCriteria.filter((c) => c.met).length;
  const passwordStrengthPercent = (metCount / passwordCriteria.length) * 100;

  // Email validation regex
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isPasswordMatch = formData.password.length > 0 && formData.password === formData.confirmPassword;
  const isDepositValid = Number(formData.initialDeposit) >= 50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (formData.name.trim().length < 3) {
      setErrorMessage("Please enter a valid full name (minimum 3 characters).");
      return;
    }

    if (!isEmailValid) {
      setErrorMessage("Please enter a valid email address (e.g., user@domain.com).");
      return;
    }

    if (metCount < passwordCriteria.length) {
      setErrorMessage("Password does not meet all the security strength requirements.");
      return;
    }

    if (!isPasswordMatch) {
      setErrorMessage("Passwords do not match. Please verify your confirm password.");
      return;
    }

    if (!isDepositValid) {
      setErrorMessage("Minimum opening account deposit is $50.00.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const res = registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        initialDeposit: Number(formData.initialDeposit),
      });

      setIsSubmitting(false);

      if (res.success && res.user) {
        setSuccessResult({
          accountNo: res.user.accountNumber,
          name: res.user.name,
          deposit: res.user.balance,
        });
      } else {
        setErrorMessage(res.message);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="w-full max-w-xl">
        {successResult ? (
          /* Success Screen */
          <Card className="border-emerald-500/30 bg-emerald-500/5 shadow-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-2 flex size-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-8" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Account Successfully Created!</CardTitle>
              <CardDescription className="text-sm">
                Your high-security C++ banking profile has been initialized.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-xl border bg-card p-5 space-y-3">
                <div className="flex items-center justify-between border-b pb-2 text-sm">
                  <span className="text-muted-foreground">Account Holder</span>
                  <span className="font-semibold text-foreground">{successResult.name}</span>
                </div>
                <div className="flex items-center justify-between border-b pb-2 text-sm">
                  <span className="text-muted-foreground">Assigned Account Number</span>
                  <span className="font-mono font-bold text-primary text-base">{successResult.accountNo}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Initial Balance</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-lg">
                    ${successResult.deposit.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="flex-1 gap-2" onClick={() => router.push("/banking/transfer")}>
                  Proceed to Transfer Amount
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="outline" onClick={() => router.push("/banking/login")}>
                  Go to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Registration Form */
          <Card className="shadow-lg">
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    Step 1 of 3
                  </Badge>
                  <span className="text-xs text-muted-foreground">Security Tiers Active</span>
                </div>
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Open a Bank Account</CardTitle>
              <CardDescription>Register with password validation and instant account generation.</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
                    <X className="size-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                    <User className="size-3.5 text-muted-foreground" />
                    Full Legal Name
                  </label>
                  <Input
                    id="reg-name"
                    placeholder="e.g. Amir Shahzad"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-9 text-sm"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reg-email" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <Mail className="size-3.5 text-muted-foreground" />
                      Email Address
                    </label>
                    {formData.email && (
                      <span
                        className={`text-[11px] font-mono ${isEmailValid ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"}`}
                      >
                        {isEmailValid ? "Valid email format" : "Invalid email"}
                      </span>
                    )}
                  </div>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={`h-9 text-sm ${formData.email && !isEmailValid ? "border-destructive/60" : ""}`}
                  />
                </div>

                {/* Password with Strength Indicators */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reg-password" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <Lock className="size-3.5 text-muted-foreground" />
                      Create Secure Password
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
                    id="reg-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="h-9 text-sm font-mono"
                  />

                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Password Strength:</span>
                        <span
                          className={`font-semibold ${
                            metCount === 5
                              ? "text-emerald-600 dark:text-emerald-400"
                              : metCount >= 3
                                ? "text-amber-500"
                                : "text-destructive"
                          }`}
                        >
                          {metCount === 5 ? "Strong (100%)" : metCount >= 3 ? "Moderate" : "Weak"}
                        </span>
                      </div>
                      <Progress
                        value={passwordStrengthPercent}
                        className={`h-1.5 ${
                          metCount === 5
                            ? "[&>div]:bg-emerald-500"
                            : metCount >= 3
                              ? "[&>div]:bg-amber-500"
                              : "[&>div]:bg-destructive"
                        }`}
                      />

                      {/* Criteria Checklist */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1 text-[11px]">
                        {passwordCriteria.map((c, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-1.5 ${
                              c.met ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-muted-foreground"
                            }`}
                          >
                            {c.met ? (
                              <Check className="size-3" />
                            ) : (
                              <span className="size-3 block rounded-full border" />
                            )}
                            <span>{c.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reg-confirm-password" className="text-xs font-medium text-foreground">
                      Confirm Password
                    </label>
                    {formData.confirmPassword && (
                      <span
                        className={`text-[11px] ${isPasswordMatch ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-destructive"}`}
                      >
                        {isPasswordMatch ? "Passwords match" : "Does not match"}
                      </span>
                    )}
                  </div>
                  <Input
                    id="reg-confirm-password"
                    type="password"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className={`h-9 text-sm font-mono ${formData.confirmPassword && !isPasswordMatch ? "border-destructive/60" : ""}`}
                  />
                </div>

                {/* Opening Deposit */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="reg-deposit" className="text-xs font-medium text-foreground flex items-center gap-1.5">
                      <DollarSign className="size-3.5 text-muted-foreground" />
                      Opening Deposit Amount ($)
                    </label>
                    <span className="text-[11px] text-muted-foreground">Min: $50.00</span>
                  </div>
                  <div className="relative">
                    <span className="text-muted-foreground absolute left-3 top-2 text-sm">$</span>
                    <Input
                      id="reg-deposit"
                      type="number"
                      step="0.01"
                      min="50"
                      placeholder="1000.00"
                      value={formData.initialDeposit}
                      onChange={(e) => setFormData({ ...formData, initialDeposit: e.target.value })}
                      required
                      className="h-9 pl-7 text-sm font-mono"
                    />
                  </div>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full gap-2 mt-4 font-medium">
                  {isSubmitting ? "Creating Account..." : "Create Account & Generate Number"}
                  <ArrowRight className="size-4" />
                </Button>

                <p className="text-center text-xs text-muted-foreground pt-2">
                  Already registered?{" "}
                  <Link href="/banking/login" className="text-primary font-medium hover:underline">
                    Sign in to your account
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
