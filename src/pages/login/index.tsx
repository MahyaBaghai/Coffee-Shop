"use client";

import { FC, useCallback, useEffect } from "react";
import LogoType from "@/components/modules/icons/LogoType";
import { useAuthStore } from "@/stores/authStore";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const Login: FC = () => {
  const { t } = useTranslation();

  // Extract state and actions from the auth store
  const {
    mode,
    email,
    password,
    confirmPassword,
    errors,
    loading,
    message,
    setMode,
    setEmail,
    setPassword,
    setConfirmPassword,
    validateEmail,
    validatePasswords,
    clearErrors,
    clearFieldError,
    signIn,
    signUp,
    signInWithGoogle,
  } = useAuthStore();

  const isSignIn = mode === "signin";

  // Handle form submission for both sign in and sign up
  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      clearErrors();
      if (isSignIn) {
        await signIn();
      } else {
        await signUp();
      }
    },
    [isSignIn, clearErrors, signIn, signUp]
  );

  // Show SweetAlert modal whenever a new message is set
  useEffect(() => {
    if (!message) return;

    const successKeys = ["login.welcomeBack", "login.accountCreated"];
    const isSuccess = successKeys.includes(message);
    const isDark = document.documentElement.classList.contains("dark");

    Swal.fire({
      icon: isSuccess ? "success" : message === "login.googleNotAvailable" ? "info" : "error",
      title: isSuccess ? t("Success") : t("Error"),
      text: t(message),
      background: isDark ? "#3f3f46" : "#ffffff",
      color: isDark ? "#ffffff" : "#1f2937",
      customClass: {
        title: "text-lg font-PoppinsBold",
        htmlContainer: "text-base font-PoppinsMedium",
        confirmButton:
          "px-8 py-2 bg-orange-300 text-zinc-700 rounded-lg font-PoppinsBold cursor-pointer",
      },
      buttonsStyling: false,
    }).then(() => {
      // Clear message after modal closes to avoid repeated triggers
      useAuthStore.getState().clearMessage();
    });
  }, [message, t]);

  return (
    <div className="@container min-h-[600px] w-full z-0 bg-[url(/Coffee-Shop/images/body-bg.png)] relative bg-no-repeat bg-cover md:mt-35 mb-12 mt-20">
      {/* Light mode overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-gray-100/65 to-gray-100/65 dark:hidden"></div>

      <div className="@8xl:w-[1260px] @8xl:mx-auto @3xl:mx-10 mx-4 relative z-10 mt-8">
        <div className="flex justify-center items-center">
          {/* Card container */}
          <div className="flex items-center justify-center py-10 px-6 bg-white dark:bg-zinc-700 
          md:w-95 w-88 rounded-2xl shadow-normal">
            <form
              className="flex flex-col items-center justify-center w-full"
              onSubmit={onSubmit}
              noValidate
            >
              {/* Logo */}
              <div className="mt-6 md:mt-8 md:w-38 md:h-20 w-30 h-15 text-orange-300 md:dark:text-orange-200">
                <LogoType />
              </div>

              <div className="flex flex-col w-full mt-4">
                {/* Email input */}
                <input
                  type="email"
                  placeholder={t("login.enterEmail")}
                  className="input-login text-login"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearFieldError("email");
                  }}
                  onBlur={validateEmail}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                />
                <span id="email-error" className={`error-login ${errors.email ? "" : "hidden"}`}>
                  {errors.email && t(errors.email)}
                </span>

                {/* Password input */}
                <input
                  type="password"
                  placeholder={t("login.enterPassword")}
                  className="input-login text-login"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearFieldError("password");
                  }}
                  onBlur={() => {
                    if (!isSignIn) validatePasswords();
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                />
                <span id="password-error" className={`error-login ${errors.password ? "" : "hidden"}`}>
                  {errors.password && t(errors.password)}
                </span>

                {/* Confirm password (only visible in sign up mode) */}
                <input
                  type="password"
                  placeholder={t("login.confirmPassword")}
                  className={`input-login text-login ${isSignIn ? "hidden" : ""}`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearFieldError("confirmPassword");
                  }}
                  onBlur={() => {
                    if (!isSignIn) validatePasswords();
                  }}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirm-error"
                />
                <span id="confirm-error" className={`error-login ${!isSignIn && errors.confirmPassword ? "" : "hidden"}`}>
                  {errors.confirmPassword && t(errors.confirmPassword)}
                </span>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full p-2 mt-16 mb-1 cursor-pointer font-PoppinsMedium md:text-xl text-lg text-zinc-700 rounded-lg shadow-normal bg-gradient-to-l from-orange-200 to-orange-300 disabled:opacity-60"
                  disabled={loading}
                >
                  {isSignIn ? t("Login") : t("Register")}
                </button>

                {/* Divider */}
                <div className="flex justify-center items-center my-1">
                  <span className="line-login"></span>
                  <span className="mx-2 md:text-base text-sm text-login">{t("login.or")}</span>
                  <span className="line-login"></span>
                </div>

                {/* Google sign-in (currently disabled, shows info modal) */}
                <div
                  className="md:text-xl text-lg mx-auto text-login cursor-pointer"
                  onClick={signInWithGoogle}
                >
                  {t("login.signinGoogle")}
                </div>
              </div>

              {/* Toggle between sign in and sign up */}
              <div className="mt-13 md:text-xl text-lg text-login">
                {isSignIn ? t("login.donotAccount") : t("login.alreadyAccount")}
                <button
                  type="button"
                  className="font-PoppinsBold text-orange-300 ml-1 mb-6 cursor-pointer"
                  onClick={() => setMode(isSignIn ? "signup" : "signin")}
                >
                  {isSignIn ? t("Register") : t("Login")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
