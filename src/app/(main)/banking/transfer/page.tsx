"use client";

import * as React from "react";

import Link from "next/link";

import {
  ArrowDownLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  DollarSign,
  History,
  Lock,
  Receipt,
  RotateCcw,
  Send,
  ShieldCheck,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type BankingTransaction, useBankingStore } from "@/lib/banking/banking-store";

export default function TransferPage() {
  const { currentUser, users, transactions, transferFunds, resetToDefault } = useBankingStore();

  const [recipient, setRecipient] = React.useState("ACC-4402"); // default to Sarah
  const [amount, setAmount] = React.useState("250");
  const [note, setNote] = React.useState("Medical Consultation Payment");

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [errorText, setErrorText] = React.useState<string | null>(null);
  const [lastReceipt, setLastReceipt] = React.useState<BankingTransaction | null>(null);

  // Quick preset amounts
  const presetAmounts = [50, 100, 250, 500, 1000];

  // Eligible other accounts to transfer to
  const availableRecipients = users.filter((u) => u.id !== currentUser?.id);

  const transferNum = Number(amount) || 0;
  const isBalanceSufficient = currentUser ? currentUser.balance >= transferNum : false;
  const isValidAmount = transferNum > 0 && isBalanceSufficient;
  const projectedBalance = currentUser ? currentUser.balance - transferNum : 0;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText(null);

    if (!currentUser) {
      setErrorText("Please sign in first to execute a transaction.");
      return;
    }

    if (!recipient.trim()) {
      setErrorText("Please select or specify a recipient account number or email.");
      return;
    }

    if (!isValidAmount) {
      setErrorText("Invalid transfer amount or insufficient account balance.");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const res = transferFunds({
        recipientAccountOrEmail: recipient,
        amount: transferNum,
        note,
      });

      setIsProcessing(false);

      if (res.success && res.transaction) {
        setLastReceipt(res.transaction);
        setAmount("");
        setNote("");
      } else {
        setErrorText(res.message);
      }
    }, 600);
  };

  // If not logged in
  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
        <div className="size-14 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
          <Lock className="size-7" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Authentication Required</h2>
        <p className="text-muted-foreground text-sm max-w-md">
          You need an active session to initiate an account-to-account funds transfer.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <Button asChild>
            <Link href="/banking/login">Sign In with Existing Account</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/banking/register">Open New Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Banner: User Balance & Status */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-8 shadow-sm border-primary/20 bg-gradient-to-r from-card via-card to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2.5">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xs">
                <Wallet className="size-5" />
              </div>
              <div className="flex flex-col">
                <CardTitle className="text-base font-semibold">{currentUser.name}</CardTitle>
                <CardDescription className="text-xs">
                  Primary Checking Account •{" "}
                  <span className="font-mono font-bold text-foreground">{currentUser.accountNumber}</span>
                </CardDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 gap-1 text-xs"
            >
              <ShieldCheck className="size-3.5" />
              Active &amp; Verified
            </Badge>
          </CardHeader>

          <CardContent className="pt-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Available Liquid Balance
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-foreground">
                ${currentUser.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready for instant domestic &amp; peer-to-peer wire transfers.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="xs"
                onClick={resetToDefault}
                className="text-xs h-8 gap-1.5 text-muted-foreground"
              >
                <RotateCcw className="size-3.5" />
                Reset Demo Balances
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Contacts / Recipient Directory */}
        <Card className="lg:col-span-4 shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                <Users className="size-4 text-primary" />
                Quick Beneficiaries
              </CardTitle>
              <span className="text-[11px] text-muted-foreground">Click to select</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {availableRecipients.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => setRecipient(rec.accountNumber)}
                className={`w-full flex items-center justify-between rounded-lg border p-2 text-left text-xs transition-all ${
                  recipient === rec.accountNumber
                    ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary"
                    : "bg-muted/30 hover:bg-muted"
                }`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{rec.name}</span>
                  <span className="font-mono text-muted-foreground text-[10px]">{rec.accountNumber}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground font-mono block">Balance</span>
                  <span className="text-xs font-semibold font-mono text-foreground">${rec.balance.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Transfer Form + Recent Transaction Table */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Transfer Form (Col 5) */}
        <Card className="lg:col-span-5 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="border-primary/30 text-primary">
                Step 3 of 3
              </Badge>
              <ArrowRightLeft className="size-4 text-primary" />
            </div>
            <CardTitle className="text-xl font-bold tracking-tight">Initiate Funds Transfer</CardTitle>
            <CardDescription className="text-xs">
              Direct account-to-account funds transfer with atomic execution.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleTransfer} className="space-y-4">
              {errorText && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive flex items-center gap-2">
                  <X className="size-4 shrink-0" />
                  <span>{errorText}</span>
                </div>
              )}

              {/* Recipient Account Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="transfer-recipient" className="text-xs font-medium text-foreground">
                    Recipient Account or Email
                  </label>
                  <span className="text-[11px] text-muted-foreground">e.g. ACC-4402</span>
                </div>
                <Input
                  id="transfer-recipient"
                  placeholder="ACC-XXXX or email@domain.com"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  required
                  className="h-9 text-sm font-mono"
                />
              </div>

              {/* Amount Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="transfer-amount" className="text-xs font-medium text-foreground">
                    Amount to Send ($)
                  </label>
                  <span
                    className={`text-[11px] ${
                      transferNum > 0 && !isBalanceSufficient
                        ? "text-destructive font-semibold"
                        : "text-muted-foreground"
                    }`}
                  >
                    Max Available: ${currentUser.balance.toFixed(2)}
                  </span>
                </div>
                <div className="relative">
                  <span className="text-muted-foreground absolute left-3 top-2 text-sm">$</span>
                  <Input
                    id="transfer-amount"
                    type="number"
                    step="0.01"
                    min="1"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className={`h-9 pl-7 text-sm font-mono font-medium ${
                      transferNum > 0 && !isBalanceSufficient ? "border-destructive focus-visible:ring-destructive" : ""
                    }`}
                  />
                </div>

                {/* Preset Amount Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {presetAmounts.map((preset) => (
                    <Button
                      key={preset}
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => setAmount(String(preset))}
                      className="text-xs h-6 px-2 text-muted-foreground font-mono"
                    >
                      ${preset}
                    </Button>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="xs"
                    onClick={() => setAmount(String(Math.floor(currentUser.balance)))}
                    className="text-xs h-6 px-2 text-primary font-medium"
                  >
                    Max
                  </Button>
                </div>
              </div>

              {/* Transfer Note / Reference */}
              <div className="space-y-1.5">
                <label htmlFor="transfer-note" className="text-xs font-medium text-foreground">
                  Payment Purpose / Note
                </label>
                <Input
                  id="transfer-note"
                  placeholder="e.g. Medical bill, Consultation, Rent"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="h-9 text-sm"
                />
              </div>

              {/* Breakdown Ledger */}
              <div className="rounded-xl border bg-muted/30 p-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Transfer Principal:</span>
                  <span className="font-mono text-foreground font-medium">${transferNum.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Network Fee:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    $0.00 (Zero Fee)
                  </span>
                </div>
                <div className="flex justify-between border-t pt-1 font-semibold text-foreground">
                  <span>Projected Balance:</span>
                  <span
                    className={`font-mono ${
                      projectedBalance < 0 ? "text-destructive" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    ${projectedBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isValidAmount || isProcessing}
                className="w-full gap-2 font-medium h-10 shadow-xs"
              >
                {isProcessing ? (
                  "Processing Transaction..."
                ) : (
                  <>
                    <Send className="size-4" />
                    Confirm &amp; Transfer Funds
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Col: Instant Confirmation & Transaction History (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Successful Receipt Card */}
          {lastReceipt && (
            <Card className="border-emerald-500/40 bg-emerald-500/5 shadow-sm animate-in fade-in duration-300">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-foreground font-semibold">Transaction Completed</CardTitle>
                    <CardDescription className="text-xs">
                      Reference: <span className="font-mono font-medium">{lastReceipt.referenceId}</span>
                    </CardDescription>
                  </div>
                </div>

                <Badge className="bg-emerald-600 text-white text-[10px]">Verified on Ledger</Badge>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="rounded-lg border bg-card p-3 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[11px]">Recipient</span>
                    <span className="font-semibold text-foreground">{lastReceipt.recipientName}</span>
                    <span className="block font-mono text-[10px] text-muted-foreground">
                      {lastReceipt.recipientAccount}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-muted-foreground block text-[11px]">Amount Debited</span>
                    <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
                      -${lastReceipt.amount.toFixed(2)}
                    </span>
                  </div>

                  <div className="col-span-2 border-t pt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Note: {lastReceipt.note}</span>
                    <span>
                      {new Date(lastReceipt.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transaction History Statement */}
          <Card className="shadow-sm">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="size-4 text-primary" />
                <CardTitle className="text-base font-semibold">Transaction Statement</CardTitle>
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                {transactions.length} Records
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/40">
                    <TableRow>
                      <TableHead className="text-xs">Type &amp; Counterparty</TableHead>
                      <TableHead className="text-xs">Reference &amp; Note</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-right text-xs">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((tx) => {
                      const isOutgoing = tx.senderAccount === currentUser.accountNumber;
                      const isIncoming = tx.recipientAccount === currentUser.accountNumber;

                      return (
                        <TableRow key={tx.id} className="text-xs hover:bg-muted/30">
                          {/* Counterparty */}
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`flex size-6 items-center justify-center rounded-full ${
                                  isOutgoing
                                    ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                    : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                }`}
                              >
                                {isOutgoing ? (
                                  <ArrowUpRight className="size-3.5" />
                                ) : (
                                  <ArrowDownLeft className="size-3.5" />
                                )}
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground">
                                  {isOutgoing ? `To ${tx.recipientName}` : `From ${tx.senderName}`}
                                </span>
                                <span className="text-[10px] font-mono text-muted-foreground">
                                  {isOutgoing ? tx.recipientAccount : tx.senderAccount}
                                </span>
                              </div>
                            </div>
                          </TableCell>

                          {/* Reference & Note */}
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-mono text-[11px] text-foreground">{tx.referenceId}</span>
                              <span className="text-[10px] text-muted-foreground line-clamp-1">{tx.note}</span>
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] h-5"
                            >
                              {tx.status}
                            </Badge>
                          </TableCell>

                          {/* Amount */}
                          <TableCell className="text-right">
                            <span
                              className={`font-mono font-semibold ${
                                isOutgoing
                                  ? "text-rose-600 dark:text-rose-400"
                                  : "text-emerald-600 dark:text-emerald-400"
                              }`}
                            >
                              {isOutgoing ? `-$${tx.amount.toFixed(2)}` : `+$${tx.amount.toFixed(2)}`}
                            </span>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
