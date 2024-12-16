"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export function SetupStatusMessage() {
  const searchParams = useSearchParams();
  const setup = searchParams.get("setup");

  useEffect(() => {
    if (setup === "success") {
      toast.success("Provider setup completed successfully!");
    } else if (setup === "error") {
      toast.error("There was an error completing the provider setup");
    }
  }, [setup]);

  return null;
}
