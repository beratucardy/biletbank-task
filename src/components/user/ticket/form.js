import { useFormik } from "formik";
import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import ReactInputMask from "react-input-mask-next";
import InputMask from "react-input-mask-next";
import * as Yup from "yup";
import { checkExpireDate } from "../../../helpers/functions/date-time";
import { toast } from "../../../helpers/functions/swal";
import { $t, getCurrentLang } from "../../../helpers/locale-helper";
import { useNavigate } from "react-router-dom";
import "./form.scss";

const Form1 = () => {
  const currentLang = getCurrentLang();
  const navigate = useNavigate();

  const initialValues = {
    contactName: "",
    contactPhone: "",
    nameOnCard: "",
    cardNo: "",
    expireDate: "",
    CVC: "",
    agreement: false,
  };

  const validationSchema = Yup.object({
    contactName: Yup.string().required(
      currentLang.code === "TR"
        ? "Lütfen adınızı giriniz"
        : "Please enter your name"
    ),
    contactPhone: Yup.string()
      .required(
        currentLang.code === "TR"
          ? "Lütfen telefon numaranızı giriniz"
          : "Please enter your phone number"
      )
      .test(
        "is_includes_",
        currentLang.code === "TR"
          ? "Lütfen geçerli bir telefon numarası giriniz"
          : "Please enter a valid phone number",
        (val) => val && !val.includes("_")
      ),
    nameOnCard: Yup.string().required(
      currentLang.code === "TR"
        ? "Lütfen kartınızda yazan ismi giriniz"
        : "Please enter the name on the card"
    ),
    cardNo: Yup.string()
      .required(
        currentLang.code === "TR"
          ? "Lütfen kart numarasını giriniz"
          : "Please enter the card number"
      )
      .test(
        "includes_",
        currentLang.code === "TR"
          ? "Lütfen geçerli bir kart numarası giriniz"
          : "Please enter a valid card number",
        (val) => val && !val.includes("_")
      ),
    expireDate: Yup.string()
      .required(
        currentLang.code === "TR"
          ? "Lütfen son kullanma tarihini giriniz"
          : "Please enter the expire date"
      )
      .test(
        "month_check",
        currentLang.code === "TR"
          ? "Geçerli bir son kullanma tarihi girin (AA/YY)"
          : "Enter a valid expire date (MM/YY)",
        (val) => checkExpireDate(val)
      ),
    CVC: Yup.number()
      .typeError(currentLang.code === "TR" ? "Sayı olmalı" : "Must be number")
      .required()
      .min(1)
      .max(
        999,
        currentLang.code === "TR" ? "Lütfen CVC'yi giriniz" : "Please enter CVC"
      ),
    agreement: Yup.boolean().oneOf(
      [true],
      currentLang.code === "TR"
        ? "Lütfen sözleşmeyi okuyun ve kutucuğu işaretleyin"
        : "Please read the contract and check the box"
    ),
  });

  const onSubmit = async () => {
    try {
    } catch (err) {
      toast("center", err.response.data.message, "error");
    } finally {
      toast(
        "center",
        currentLang.code === "TR"
          ? "Biletinizi başarıyla satın aldınız"
          : "You have successfully purchased your ticket",
        "success"
      );
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const isInvalid = (field) => {
    return formik.touched[field] && formik.errors[field];
  };

  const isValid = (field) => {
    return formik.touched[field] && !formik.errors[field];
  };

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Container className="checkoutForm">
        <Row>
          <Col sm={6}>
            <Card className="form1">
              <Card.Body className="cart-body">
                <p>{$t("contactInformation")}</p>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={
                      currentLang.code === "TR" ? "Kişi Adı" : "Contact Name"
                    }
                    {...formik.getFieldProps("contactName")}
                    isValid={
                      formik.touched.contactName && !formik.errors.contactName
                    }
                    isInvalid={
                      formik.touched.contactName && !!formik.errors.contactName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.contactName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder={
                      currentLang.code === "TR"
                        ? "İletişim Numarası"
                        : "Contact Phone"
                    }
                    as={ReactInputMask}
                    mask="(999) 999-9999"
                    {...formik.getFieldProps("contactPhone")}
                    isValid={
                      formik.touched.contactPhone && !formik.errors.contactPhone
                    }
                    isInvalid={
                      formik.touched.contactPhone &&
                      !!formik.errors.contactPhone
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.contactPhone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <div className="form2">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={
                    currentLang.code === "TR"
                      ? "Kart üzerindeki isim"
                      : "Name on card"
                  }
                  {...formik.getFieldProps("nameOnCard")}
                  isInvalid={isInvalid("nameOnCard")}
                  isValid={isValid("nameOnCard")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.nameOnCard}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={
                    currentLang.code === "TR" ? "Kart Numarası" : "Card Number"
                  }
                  as={InputMask}
                  mask="9999-9999-9999-9999"
                  {...formik.getFieldProps("cardNo")}
                  isInvalid={isInvalid("cardNo")}
                  isValid={isValid("cardNo")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.cardNo}
                </Form.Control.Feedback>
              </Form.Group>
              <InputGroup className="mb-3 cart-date-cvc justify-content-between">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder={
                      currentLang.code === "TR"
                        ? "Son Kullanma Tarihi"
                        : "Expire Date"
                    }
                    as={InputMask}
                    mask="99/99"
                    {...formik.getFieldProps("expireDate")}
                    isInvalid={isInvalid("expireDate")}
                    isValid={isValid("expireDate")}
                  />
                  <Form.Control.Feedback type="invalid" className="pe-1">
                    {formik.errors.expireDate}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="CVC"
                    as={InputMask}
                    mask="999"
                    {...formik.getFieldProps("CVC")}
                    isInvalid={isInvalid("CVC")}
                    isValid={isValid("CVC")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.CVC}
                  </Form.Control.Feedback>
                </Form.Group>
              </InputGroup>
              <Form.Group className="mb-3">
                <Form.Check
                  label={
                    currentLang.code === "TR"
                      ? "Satış sözleşmesini okudum, anladım ve taahhüt ediyorum."
                      : "I read, understand and commit the sales contract"
                  }
                  id="agreement"
                  type="checkbox"
                  name="roles"
                  {...formik.getFieldProps("agreement")}
                  isInvalid={isInvalid("agreement")}
                  isValid={isValid("agreement")}
                />
              </Form.Group>
              <div className="checkout-btn">
                <Button
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid)}
                >
                  {$t("checkout")}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default Form1;
