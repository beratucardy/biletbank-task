import React from "react";
import UserTemplate from "../../templates/user-template";
import Spacer from "../../components/common/spacer/spacer";
import BookingForm from "../../components/user/ticket/booking-form";

const BookingTicketPage = () => {
  return (
    <UserTemplate>
      <Spacer height={65} />
      <BookingForm />
      <Spacer height={100} />
    </UserTemplate>
  );
};

export default BookingTicketPage;
