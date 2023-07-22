import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/common/scroll-to-top/scroll-to-top";
import NotFoundPage from "../pages/common/not-found-page";
import HomePage from "../pages/user/home-page";
import BookingTicketPage from "../pages/user/booking-ticket-page";
import ProtectedRoute from "./protected-route";

const CustomRoutes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route
            path=":booking"
            element={
              <ProtectedRoute>
                <BookingTicketPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default CustomRoutes;
