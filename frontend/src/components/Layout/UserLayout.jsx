import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Main component */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}
