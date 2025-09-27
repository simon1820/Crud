"use client";

import { useEffect, useState } from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientLayout({ children, className }: ClientLayoutProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <body className={className} suppressHydrationWarning>
      {mounted && children}
    </body>
  );
}
