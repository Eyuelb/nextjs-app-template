import { PropsWithChildren } from "react";
import RootStyleRegistry from "./mantine";
import { QueryClientProvider } from "./queryClient.client";
import { AuthProvider } from "@/lib/auth/auth.provider";
import { getSession } from "@/lib/auth/auth.service";
import AppProgressBar from "@/components/common/progress-bar";
import { I18nProvider } from "@/core/i18n/provider";

async function GlobalProviders({ children }: PropsWithChildren) {
  const session = await getSession();

  return (
    <I18nProvider>
      <QueryClientProvider>
        <RootStyleRegistry>
          <AppProgressBar>
            <AuthProvider session={session}>{children}</AuthProvider>
          </AppProgressBar>
        </RootStyleRegistry>
      </QueryClientProvider>
    </I18nProvider>
  );
}

export { GlobalProviders };
