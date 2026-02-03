'use client';

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="w-full max-w-sm px-4">
            <SignIn
                appearance={{
                    baseTheme: undefined,
                    layout: {
                        logoPlacement: "inside",
                        socialButtonsPlacement: "bottom",
                        socialButtonsVariant: "iconButton",
                    },
                    variables: {
                        colorPrimary: "#f7f58b",
                        colorText: "#111827",
                        colorTextSecondary: "#6b7280",
                        colorBackground: "#ffffff",
                        colorInputBackground: "#ffffff",
                        colorInputText: "#111827",
                        colorBorder: "#e5e7eb",
                        colorSuccess: "#10b981",
                        colorDanger: "#ef4444",
                        colorWarning: "#f59e0b",
                        colorNeutral: "#f3f4f6",
                        fontSize: "0.9375rem",
                        borderRadius: "0.375rem",
                    },
                    elements: {
                        rootBox: {
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "0.5rem",
                            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
                            padding: "2.5rem 2rem",
                        },
                        card: {
                            backgroundColor: "transparent",
                            border: "none",
                            boxShadow: "none",
                            padding: "0",
                        },
                        headerTitle: {
                            fontSize: "1.5rem",
                            fontWeight: "700",
                            color: "#111827",
                            letterSpacing: "-0.01em",
                            marginBottom: "0.25rem",
                        },
                        headerSubtitle: {
                            fontSize: "0.875rem",
                            color: "#6b7280",
                            fontWeight: "400",
                            marginBottom: "1.5rem",
                            lineHeight: "1.5",
                        },
                        formFieldLabel: {
                            fontSize: "0.8125rem",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "0.375rem",
                        },
                        formFieldInput: {
                            backgroundColor: "#ffffff",
                            borderColor: "#e5e7eb",
                            borderRadius: "0.375rem",
                            borderWidth: "1px",
                            padding: "0.5625rem 0.75rem",
                            fontSize: "0.9375rem",
                            color: "#111827",
                            transition: "all 0.2s ease",
                            "&:focus": {
                                borderColor: "#d1d5db",
                                backgroundColor: "#ffffff",
                                boxShadow: "0 0 0 2px rgba(241, 245, 139, 0.1)",
                                outline: "none",
                            },
                        },
                        formFieldInputPlaceholder: {
                            color: "#9ca3af",
                        },
                        formButtonPrimary: {
                            backgroundColor: "#f7f58b",
                            color: "#111827",
                            fontSize: "0.9375rem",
                            fontWeight: "600",
                            borderRadius: "0.375rem",
                            padding: "0.625rem 1rem",
                            border: "1px solid #f7f58b",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: "#f1f074",
                                borderColor: "#f1f074",
                            },
                            "&:active": {
                                backgroundColor: "#e8ed61",
                            },
                        },
                        footerActionLink: {
                            color: "#111827",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            "&:hover": {
                                color: "#374151",
                            },
                        },
                        footerActionText: {
                            color: "#6b7280",
                            fontSize: "0.875rem",
                        },
                        dividerLine: {
                            backgroundColor: "#e5e7eb",
                        },
                        dividerText: {
                            color: "#9ca3af",
                            fontSize: "0.8125rem",
                            fontWeight: "500",
                        },
                        socialButtonsBlockButton: {
                            borderColor: "#e5e7eb",
                            color: "#374151",
                            backgroundColor: "#ffffff",
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            border: "1px solid #e5e7eb",
                            padding: "0.5625rem 0.75rem",
                            transition: "all 0.2s ease",
                            "&:hover": {
                                backgroundColor: "#f9fafb",
                                borderColor: "#d1d5db",
                            },
                        },
                        formFieldSuccessIcon: {
                            color: "#10b981",
                        },
                        formFieldErrorIcon: {
                            color: "#ef4444",
                        },
                        formFieldWarningIcon: {
                            color: "#f59e0b",
                        },
                    },
                }}
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
            />
        </div>
    );
}
