"use client";

import { ClerkProvider } from "@clerk/nextjs";

interface ClerkProviderWrapperProps {
	children: React.ReactNode;
	signInFallbackRedirectUrl: string;
	signInForceRedirectUrl: string;
	signUpFallbackRedirectUrl: string;
	signUpForceRedirectUrl: string;
	afterSignOutUrl: string;
}

export const ClerkProviderWrapper = ({
	children,
	signInFallbackRedirectUrl,
	signInForceRedirectUrl,
	signUpFallbackRedirectUrl,
	signUpForceRedirectUrl,
	afterSignOutUrl,
}: ClerkProviderWrapperProps) => {
	return (
		<ClerkProvider
			signInFallbackRedirectUrl={signInFallbackRedirectUrl}
			signInForceRedirectUrl={signInForceRedirectUrl}
			signUpFallbackRedirectUrl={signUpFallbackRedirectUrl}
			signUpForceRedirectUrl={signUpForceRedirectUrl}
			afterSignOutUrl={afterSignOutUrl}
		>
			{children}
		</ClerkProvider>
	);
};
