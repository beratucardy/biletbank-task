import React from "react";
import UserTemplate from "../../templates/user-template";
import Ticket from "../../components/user/ticket/ticket";
import Spacer from "../../components/common/spacer/spacer";

const HomePage = () => {
  return (
    <UserTemplate>
      <Spacer height={65} />
      <Ticket />
      <Spacer height={100} />
    </UserTemplate>
  );
};

export default HomePage;
