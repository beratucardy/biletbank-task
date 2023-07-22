import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { Container } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { getCurrentLang } from "../../../helpers/locale-helper";
import Form1 from "./form";

const BookingForm = () => {
  const { cart } = useAppSelector((state) => state.cart);
  const currentLang = getCurrentLang();

  const columns = [
    {
      name: currentLang.code === "TR" ? "Nereden" : "From",
      selector: (row) => row.from,
      sortable: false,
      grow: 4,
    },
    {
      name: currentLang.code === "TR" ? "Nereye" : "To",
      selector: (row) => row.to,
      sortable: false,
      grow: 4,
    },
    {
      name: currentLang.code === "TR" ? "Gidiş Tarihi" : "Depart On Date",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: currentLang.code === "TR" ? "Gidiş Saati" : "Depart On Time",
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: currentLang.code === "TR" ? "Süreç" : "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: currentLang.code === "TR" ? "Fiyat" : "Price",
      cell: (row) => <span>${row.economy}</span>,
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
    },
  ];

  return (
    <>
      <Form1 />
      <Container className="details">
        <DataTable columns={columns} data={cart} />
      </Container>
    </>
  );
};

export default BookingForm;
