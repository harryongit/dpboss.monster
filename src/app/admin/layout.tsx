"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Public admin route
  if (pathname === "/admin/dashboard_dpboss_login") {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute role="admin">
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
