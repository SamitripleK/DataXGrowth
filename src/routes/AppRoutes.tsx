import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Flex, Spin } from "antd";
import { AdminLayout } from "@/layouts/AdminLayout";

const LoginPage = lazy(() => import("@/pages/Login"));
const ConnectPage = lazy(() => import("@/pages/Connect"));
const ClientsPage = lazy(() => import("@/pages/Clients"));
const ClientProfilePage = lazy(() => import("@/pages/ClientProfile"));
const UsersPage = lazy(() => import("@/pages/Users"));
const QueuePage = lazy(() => import("@/pages/Queue"));
const DigestReviewPage = lazy(() => import("@/pages/DigestReview"));

const RouteFallback = () => (
  <Flex align="center" justify="center" style={{ minHeight: "100vh" }}>
    <Spin size="large" />
  </Flex>
);

export const AppRoutes = () => (
  <Suspense fallback={<RouteFallback />}>
    <Routes>
      <Route path="/" element={<Navigate to="/clients" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/connect" element={<ConnectPage />} />

      <Route element={<AdminLayout />}>
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/clients/:id" element={<ClientProfilePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/queue" element={<QueuePage />} />
        <Route path="/queue/digest/:id" element={<DigestReviewPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/clients" replace />} />
    </Routes>
  </Suspense>
);
