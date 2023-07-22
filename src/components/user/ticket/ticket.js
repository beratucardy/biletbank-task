import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../helpers/functions/swal";
import {
  checkDates,
  getCurrentDate,
} from "../../../helpers/functions/date-time";
import { getAirports, searchFlights } from "../../../api/user-service";
import { useNavigate } from "react-router-dom";
import { flightAdded } from "../../../store/slices/cart-slice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { $t, getCurrentLang } from "../../../helpers/locale-helper";
import "./ticket.scss";

const Ticket = () => {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const navigate = useNavigate();
  const currentLang = getCurrentLang();

  const columns = [
    {
      name: currentLang.code === "TR" ? "Nereden" : "From",
      selector: (row) => row.from,
      sortable: false,
    },
    {
      name: currentLang.code === "TR" ? "Nereye" : "To",
      selector: (row) => row.to,
      sortable: false,
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
  ];

  const initialValues = {
    from: "",
    to: "",
    departOn: "",
    returnOn: "",
  };

  const validationSchema = Yup.object({
    from: Yup.string().required(
      currentLang.code === "TR"
        ? "Hangi ülkede olduğunuzu seçin"
        : "Choose which country you are in"
    ),
    to: Yup.string().required(
      currentLang.code === "TR"
        ? "Hangi ülkeye gideceğinizi seçin"
        : "Choose which country you are going to"
    ),
    departOn: Yup.string().required(
      currentLang.code === "TR"
        ? "Ne zaman gideceğinizi seçin"
        : "Choose when to go"
    ),
    returnOn: Yup.string().required(
      currentLang.code === "TR"
        ? "Ne zaman geleceğinizi seçin"
        : "Choose when to come"
    ),
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const resp = await getAirports();
      setAirports(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      if (!checkDates(values))
        throw new Error(
          currentLang.code === "TR"
            ? "Gidiş saati, dönüş saatinden en az 1 saat sonra olmalıdır."
            : "The depart on time must be at least 1 hour after the return on time."
        );
      const resp = await searchFlights({
        fromCode: values.from,
        toCode: values.to,
        departure: values.departOn,
        return: values.reportOn,
      });
      if (!resp.data)
        throw new Error(
          currentLang.code === "TR"
            ? "Seçtiğiniz tercihlerde bilet bulunmamaktadır."
            : "There are no tickets available for the preferences you selected."
        );
      const resp2 = resp.data.map((data) => {
        return {
          ...data,
          startDate: data.start.substring(0, 10),
          startTime: data.start.substring(11, 16),
        };
      });
      setFlights(resp2);
    } catch (err) {
      toast("center", err.message || err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const handleChange = ({ selectedRows }) => {
    dispatch(flightAdded(selectedRows));
  };

  const handleBooking = () => {
    if (cart.length === 0) {
      toast(
        "center",
        currentLang.code === "TR"
          ? "Lütfen bir bilet seçiniz"
          : "Please select a ticket",
        "error"
      );
    } else navigate("/booking");
  };

  useEffect(() => {
    loadData();
    //eslint-disable-next-line
  }, []);

  return (
    <Container className="ticket">
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>{$t("from")}</Form.Label>
              <Form.Select
                {...formik.getFieldProps("from")}
                isValid={formik.touched.from && !formik.errors.from}
                isInvalid={formik.touched.from && !!formik.errors.from}
              >
                <option>{$t("select")}</option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.from}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>{$t("to")}</Form.Label>
              <Form.Select
                {...formik.getFieldProps("to")}
                isValid={formik.touched.to && !formik.errors.to}
                isInvalid={formik.touched.to && !!formik.errors.to}
              >
                <option>{$t("select")}</option>
                {airports.map((airport) => (
                  <option key={airport.code} value={airport.code}>
                    {airport.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {formik.errors.to}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <InputGroup className="mb-3">
              <FloatingLabel
                label={currentLang.code === "TR" ? "Gidiş" : "Depart on"}
              >
                <Form.Control
                  type="datetime-local"
                  placeholder="Depart on"
                  min={getCurrentDate()}
                  {...formik.getFieldProps("departOn")}
                  isValid={formik.touched.departOn && !formik.errors.departOn}
                  isInvalid={
                    formik.touched.departOn && !!formik.errors.departOn
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.departOn}
                </Form.Control.Feedback>
              </FloatingLabel>
            </InputGroup>
          </Col>
          <Col lg={6}>
            <InputGroup className="mb-3">
              <FloatingLabel
                label={currentLang.code === "TR" ? "Dönüş" : "Return on"}
              >
                <Form.Control
                  type="datetime-local"
                  placeholder="Return on"
                  min={getCurrentDate()}
                  {...formik.getFieldProps("returnOn")}
                  isValid={formik.touched.returnOn && !formik.errors.returnOn}
                  isInvalid={
                    formik.touched.returnOn && !!formik.errors.returnOn
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.returnOn}
                </Form.Control.Feedback>
              </FloatingLabel>
            </InputGroup>
          </Col>
        </Row>
        <div className="text-end">
          <Button
            type="submit"
            className="check"
            disabled={!(formik.dirty && formik.isValid)}
          >
            {loading && <Spinner animation="border" size="sm" />}{" "}
            {$t("checkAvailability")}
          </Button>
        </div>
      </Form>
      <hr />
      <DataTable
        columns={columns}
        data={flights}
        selectableRows
        progressPending={loading}
        onSelectedRowsChange={handleChange}
      />
      <Button onClick={handleBooking} className="text-end">
        {$t("bookNow")}
      </Button>
    </Container>
  );
};

export default Ticket;
