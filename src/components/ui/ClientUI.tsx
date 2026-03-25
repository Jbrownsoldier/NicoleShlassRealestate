"use client";

import dynamic from "next/dynamic";

const CustomCursor     = dynamic(() => import("@/components/ui/CustomCursor").then(m => ({ default: m.CustomCursor })), { ssr: false });
const ScrollProgress   = dynamic(() => import("@/components/ui/ScrollProgress").then(m => ({ default: m.ScrollProgress })), { ssr: false });
const Chatbot          = dynamic(() => import("@/components/ui/Chatbot").then(m => ({ default: m.Chatbot })), { ssr: false });
const EmailCapturePopup = dynamic(() => import("@/components/ui/EmailCapturePopup").then(m => ({ default: m.EmailCapturePopup })), { ssr: false });

export function ClientUI() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Chatbot />
      <EmailCapturePopup />
    </>
  );
}
