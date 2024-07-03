import { supabase } from "@/utils/supabase";
import { PropsWithChildren, useEffect } from "react";
import { Alert, AppState } from "react-native";
import { useAuthStore } from "../states/auth";
import { router } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function AuthSubscriber({ children }: PropsWithChildren) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      // console.log('event', event);
      // if (event == "PASSWORD_RECOVERY") {
      //   router.push("/auth/reset-password");
      // }

      setUser(session?.user || null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [setUser]);

  return children;
}
