"use client";
import AdminNav from "../components/admin/AdminNav";

export const metadata = {
  title: "Online Shop Admin",
  description: "Online Shop App Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
}
