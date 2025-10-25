"use client";

import { create } from "zustand";

type Mode = "signin" | "signup";

type Errors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type AuthState = {
  mode: Mode;
  email: string;
  password: string;
  confirmPassword: string;
  errors: Errors;
  loading: boolean;
  message: string;
  // actions
  setMode: (mode: Mode) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (value: string) => void;
  clearErrors: () => void;
  clearFieldError: (field: keyof Errors) => void;
  resetForm: () => void;
  clearMessage: () => void;
  validateEmail: () => Promise<boolean>;
  validatePasswords: () => boolean;
  signIn: () => Promise<void>;
  signUp: () => Promise<void>;
  signInWithGoogle: () => void; // placeholder action
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Zustand store definition
export const useAuthStore = create<AuthState>((set, get) => ({
  // --- Core state ---
  mode: "signin",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {},
  loading: false,
  message: "",

  // --- State setters ---
  setMode: (mode) => set({ mode, errors: {}, message: "" }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (value) => set({ confirmPassword: value }),

  // --- Error & message helpers ---
  clearErrors: () => set({ errors: {} }),
  clearFieldError: (field) =>
    set((s) => ({ errors: { ...s.errors, [field]: undefined } })),
  resetForm: () =>
    set({
      email: "",
      password: "",
      confirmPassword: "",
      errors: {},
    }),
  clearMessage: () => set({ message: "" }),

  // --- Email validation: required, format, and existence check ---
  validateEmail: async () => {
    const { email } = get();
    if (!email.trim()) {
      set((s) => ({ errors: { ...s.errors, email: "login.emailRequired" } }));
      return false;
    }
    if (!emailRegex.test(email)) {
      set((s) => ({
        errors: { ...s.errors, email: "login.emailInvalid" },
      }));
      return false;
    }

    try {
      const url = `${SUPABASE_URL}/rest/v1/users?select=id&email=eq.${encodeURIComponent(
        email
      )}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data: Array<{ id: string }> = await res.json();

      // For sign-in: user must exist
      if (get().mode === "signin" && data.length === 0) {
        set({ message: "login.userNotExist", errors: {} });
        setTimeout(() => {
          get().clearMessage();
          get().resetForm();
        }, 5000);
        return false;
      }

      // For sign-up: user must not already exist
      if (get().mode === "signup" && data.length > 0) {
        set((s) => ({
          errors: { ...s.errors, email: "login.emailExists" },
        }));
        return false;
      }
    } catch (err) {
      console.error("login.emailValidationFailed", err);
    }

    // Clear error if valid
    set((s) => ({ errors: { ...s.errors, email: undefined } }));
    return true;
  },

  // --- Password validation: required, length, and match ---
  validatePasswords: () => {
    const { password, confirmPassword, mode } = get();
    let valid = true;
    const nextErrors: Errors = {};

    if (!password) {
      nextErrors.password = "login.passwordRequired";
      valid = false;
    } else if (mode === "signup" && password.length < 6) {
      nextErrors.password = "login.passwordMin";
      valid = false;
    }

    if (mode === "signup") {
      if (!confirmPassword) {
        nextErrors.confirmPassword = "login.confirmPasswordRequired";
        valid = false;
      } else if (password !== confirmPassword) {
        nextErrors.confirmPassword = "login.passwordsMustMatch";
        valid = false;
      }
    }

    set((s) => ({ errors: { ...s.errors, ...nextErrors } }));
    if (valid) {
      set((s) => ({
        errors: { ...s.errors, password: undefined, confirmPassword: undefined },
      }));
    }
    return valid;
  },

  // --- Sign in flow: validate, fetch user, check password ---
  signIn: async () => {
    const { email, password, validateEmail, resetForm, clearMessage } = get();
    set({ message: "" });

    const emailOk = await validateEmail();
    if (!emailOk) return;

    if (!password) {
      set((s) => ({
        errors: { ...s.errors, password: "login.passwordEmpty" },
      }));
      return;
    }

    try {
      set({ loading: true });
      const url = `${SUPABASE_URL}/rest/v1/users?select=id,email,password&email=eq.${encodeURIComponent(
        email
      )}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data: Array<{ id: string; email: string; password: string }> =
        await res.json();

      if (data.length === 1) {
        const user = data[0];
        if (user.password === password) {
          set({ message: "login.welcomeBack", errors: {} });
          setTimeout(() => {
            clearMessage();
            resetForm();
          }, 5000);
        } else {
          set((s) => ({
            errors: { ...s.errors, password: "login.passwordIncorrect" },
          }));
        }
      }
    } catch (err) {
      set({ message: "login.unexpectedError" });
    } finally {
      set({ loading: false });
    }
  },

  // --- Sign up flow: validate, insert user, reset form ---
  signUp: async () => {
    const { email, password, confirmPassword, validateEmail, validatePasswords, resetForm, setMode } =
      get();
    set({ message: "" });

    const emailOk = await validateEmail();
    if (!emailOk) return;

    const passOk = validatePasswords();
    if (!passOk) return;

    try {
      set({ loading: true });
      const insertUrl = `${SUPABASE_URL}/rest/v1/users`;
      const res = await fetch(insertUrl, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("login.failedCreateUser");

      const created = await res.json();
      if (Array.isArray(created) && created.length > 0) {
        set({ message: "login.accountCreated" });
        setTimeout(() => {
          resetForm();
          setMode("signin");
          get().clearMessage();
        }, 5000);
      } else {
        set({ message: "login.signupFailed" });
      }
    } catch (err) {
      set({ message: "login.unexpectedError" });
    } finally {
      set({ loading: false });
    }
  },

  // --- Google sign-in placeholder (currently disabled) ---
  signInWithGoogle: () => {
    set({ message: "login.googleNotAvailable" });
  },
}));
