"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BankingUser {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  password: string;
  balance: number;
  avatar?: string;
  createdAt: string;
}

export interface BankingTransaction {
  id: string;
  senderAccount: string;
  senderName: string;
  recipientAccount: string;
  recipientName: string;
  amount: number;
  note: string;
  timestamp: string;
  status: "Completed" | "Pending" | "Failed";
  referenceId: string;
}

interface BankingState {
  users: BankingUser[];
  currentUser: BankingUser | null;
  transactions: BankingTransaction[];

  // Actions
  registerUser: (data: { name: string; email: string; password: string; initialDeposit: number }) => {
    success: boolean;
    message: string;
    user?: BankingUser;
  };

  loginUser: (
    identifier: string,
    password: string,
  ) => {
    success: boolean;
    message: string;
    user?: BankingUser;
  };

  logoutUser: () => void;

  transferFunds: (data: { recipientAccountOrEmail: string; amount: number; note: string }) => {
    success: boolean;
    message: string;
    transaction?: BankingTransaction;
    newBalance?: number;
  };

  resetToDefault: () => void;
}

const defaultUsers: BankingUser[] = [
  {
    id: "usr_1",
    name: "Amir Khokhar",
    email: "amir@example.com",
    accountNumber: "ACC-8801",
    password: "Password@123",
    balance: 5450.0,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "usr_2",
    name: "Dr. Sarah Bennett",
    email: "sarah.bennett@hospital.org",
    accountNumber: "ACC-4402",
    password: "Password@123",
    balance: 3200.0,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&auto=format&fit=crop&q=80",
    createdAt: "2026-02-01T12:00:00.000Z",
  },
  {
    id: "usr_3",
    name: "David Chen",
    email: "david.chen@fintech.io",
    accountNumber: "ACC-9931",
    password: "Password@123",
    balance: 1850.0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    createdAt: "2026-02-10T14:30:00.000Z",
  },
];

const defaultTransactions: BankingTransaction[] = [
  {
    id: "tx_1",
    senderAccount: "ACC-4402",
    senderName: "Dr. Sarah Bennett",
    recipientAccount: "ACC-8801",
    recipientName: "Amir Khokhar",
    amount: 750.0,
    note: "Clinical IT Consultation Fee",
    timestamp: "2026-11-15T14:20:00.000Z",
    status: "Completed",
    referenceId: "TXN-984120",
  },
  {
    id: "tx_2",
    senderAccount: "ACC-8801",
    senderName: "Amir Khokhar",
    recipientAccount: "ACC-9931",
    recipientName: "David Chen",
    amount: 200.0,
    note: "Software License Share",
    timestamp: "2026-11-16T09:15:00.000Z",
    status: "Completed",
    referenceId: "TXN-984121",
  },
];

export const useBankingStore = create<BankingState>()(
  persist(
    (set, get) => ({
      users: defaultUsers,
      currentUser: defaultUsers[0], // default logged in as Amir for seamless preview
      transactions: defaultTransactions,

      registerUser: ({ name, email, password, initialDeposit }) => {
        const { users, transactions } = get();
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

        if (existingUser) {
          return {
            success: false,
            message: "An account with this email address already exists.",
          };
        }

        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newAccountNo = `ACC-${randomNum}`;
        const newId = `usr_${Date.now()}`;

        const newUser: BankingUser = {
          id: newId,
          name: name.trim(),
          email: normalizedEmail,
          accountNumber: newAccountNo,
          password,
          balance: Number(initialDeposit) || 0,
          createdAt: new Date().toISOString(),
        };

        const initialTx: BankingTransaction = {
          id: `tx_${Date.now()}`,
          senderAccount: "CENTRAL_RESERVE",
          senderName: "Initial Deposit",
          recipientAccount: newAccountNo,
          recipientName: newUser.name,
          amount: Number(initialDeposit) || 0,
          note: "Account Opening Deposit",
          timestamp: new Date().toISOString(),
          status: "Completed",
          referenceId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        };

        set({
          users: [...users, newUser],
          currentUser: newUser,
          transactions: [initialTx, ...transactions],
        });

        return {
          success: true,
          message: `Account created successfully! Your Account Number is ${newAccountNo}.`,
          user: newUser,
        };
      },

      loginUser: (identifier, password) => {
        const { users } = get();
        const trimmed = identifier.trim().toLowerCase();

        const user = users.find((u) => u.email.toLowerCase() === trimmed || u.accountNumber.toLowerCase() === trimmed);

        if (!user) {
          return {
            success: false,
            message: "No account found matching this email or account number.",
          };
        }

        if (user.password !== password) {
          return {
            success: false,
            message: "Incorrect password. Please verify and try again.",
          };
        }

        set({ currentUser: user });
        return {
          success: true,
          message: `Welcome back, ${user.name}!`,
          user,
        };
      },

      logoutUser: () => {
        set({ currentUser: null });
      },

      transferFunds: ({ recipientAccountOrEmail, amount, note }) => {
        const { users, currentUser, transactions } = get();

        if (!currentUser) {
          return {
            success: false,
            message: "You must be signed in to execute a money transfer.",
          };
        }

        const transferAmt = Number(amount);
        if (isNaN(transferAmt) || transferAmt <= 0) {
          return {
            success: false,
            message: "Please specify a valid transfer amount greater than $0.00.",
          };
        }

        if (currentUser.balance < transferAmt) {
          return {
            success: false,
            message: `Insufficient funds. Your available balance is $${currentUser.balance.toFixed(2)}.`,
          };
        }

        const target = recipientAccountOrEmail.trim().toLowerCase();
        const recipient = users.find(
          (u) => u.accountNumber.toLowerCase() === target || u.email.toLowerCase() === target,
        );

        if (!recipient) {
          return {
            success: false,
            message: `Recipient account '${recipientAccountOrEmail}' was not found. Please verify the account number or email.`,
          };
        }

        if (recipient.id === currentUser.id) {
          return {
            success: false,
            message: "You cannot transfer funds to your own account.",
          };
        }

        // Execute Transaction
        const updatedSender: BankingUser = {
          ...currentUser,
          balance: currentUser.balance - transferAmt,
        };

        const updatedRecipient: BankingUser = {
          ...recipient,
          balance: recipient.balance + transferAmt,
        };

        const newTx: BankingTransaction = {
          id: `tx_${Date.now()}`,
          senderAccount: currentUser.accountNumber,
          senderName: currentUser.name,
          recipientAccount: recipient.accountNumber,
          recipientName: recipient.name,
          amount: transferAmt,
          note: note.trim() || "Peer-to-Peer Transfer",
          timestamp: new Date().toISOString(),
          status: "Completed",
          referenceId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        };

        const updatedUsers = users.map((u) => {
          if (u.id === currentUser.id) return updatedSender;
          if (u.id === recipient.id) return updatedRecipient;
          return u;
        });

        set({
          users: updatedUsers,
          currentUser: updatedSender,
          transactions: [newTx, ...transactions],
        });

        return {
          success: true,
          message: `Successfully transferred $${transferAmt.toFixed(2)} to ${recipient.name} (${recipient.accountNumber}).`,
          transaction: newTx,
          newBalance: updatedSender.balance,
        };
      },

      resetToDefault: () => {
        set({
          users: defaultUsers,
          currentUser: defaultUsers[0],
          transactions: defaultTransactions,
        });
      },
    }),
    {
      name: "studio-banking-store",
    },
  ),
);
