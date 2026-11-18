"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ArrowLeft, ArrowRightLeft, CheckCircle2, Lock, ShieldCheck, UserCheck, UserPlus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBankingStore } from "@/lib/banking/banking-store";

export default function BankingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentUser, logoutUser } = useBankingStore();

  const steps = [
    { name: "1. Registration", href: "/banking/register", icon: UserPlus },
    { name: "2. Sign In", href: "/banking/login", icon: UserCheck },
    { name: "3. Transfer Amount", href: "/banking/transfer", icon: ArrowRightLeft },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      {/* Top Banking Navbar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/default"
              className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">Admin Dashboard</span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg shadow-xs">
                <ShieldCheck className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm leading-tight tracking-tight">Apex Secure Bank</span>
                <span className="text-muted-foreground text-[10px] hidden sm:inline">
                  C++ Logic Transpiled Web Interface
                </span>
              </div>
            </div>
          </div>

          {/* Current Auth / Session State */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-medium text-foreground">{currentUser.name}</span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ${currentUser.balance.toFixed(2)}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] gap-1"
                >
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {currentUser.accountNumber}
                </Badge>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={logoutUser}
                  className="text-xs text-muted-foreground hover:text-destructive h-7 px-2"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Badge variant="secondary" className="gap-1 text-xs">
                <Lock className="size-3" />
                Guest Mode
              </Badge>
            )}
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="border-t bg-card/60">
          <div className="container mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-2 sm:px-6">
            {steps.map((step) => {
              const isActive = pathname === step.href;
              const Icon = step.icon;

              return (
                <Link
                  key={step.href}
                  href={step.href}
                  className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{step.name}</span>
                  {isActive && <CheckCircle2 className="size-3 text-primary-foreground/90 ml-1" />}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="container mx-auto max-w-6xl flex-1 px-4 py-8 sm:px-6">{children}</main>

      {/* Security Footer */}
      <footer className="border-t bg-background py-4 text-center text-xs text-muted-foreground">
        <div className="container mx-auto flex max-w-6xl flex-col sm:flex-row items-center justify-between px-4 gap-2">
          <span>🔒 256-bit Encrypted Transaction Ledger Simulation</span>
          <span>C++ Core Banking Architecture (Account &amp; Mutex Logic Equivalent)</span>
        </div>
      </footer>
    </div>
  );
}
