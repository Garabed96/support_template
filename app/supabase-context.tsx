// IMPORTANT
// React Context Provider
import type { SupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = React.createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [supabase] = useState(() => createPagesBrowserClient());

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

// export react hook oto use supabase ...
export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  }

  return context;
};
