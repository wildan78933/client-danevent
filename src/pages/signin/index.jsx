import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

import SAlert from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { postData } from "../../utils/fetch";
import SForm from "./form";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/actions";

function PageSignin() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    message: "",
    type: "danger",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = await postData(`/cms/auth/signin`, form);

    if (res?.data?.data) {
      dispatch(
        userLogin(
          res.data.data.token,
          res.data.data.role,
          res.data.data.email,
          res.data.data.refreshToken
        )
      );

      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      setAlert({
        status: true,
        message: res?.response?.data?.msg ?? "internal server error",
        type: "danger",
      });
    }
  };

  return (
    <Container md={12}>
      <div className="m-auto" style={{ width: "50" }}>
        {alert.status && <SAlert type={alert.type} message={alert.message} />}
      </div>

      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title>Form Signin</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
