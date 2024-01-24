import React from "react";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import { Form } from "react-bootstrap";
import SButton from "../../components/Button";

export default function SForm({ form, handleChange, handleSubmit, isLoading }) {
  return (
    <Form>
      <TextInputWithLabel
        name="email"
        value={form?.email}
        type="email"
        label="Email address"
        placeholder="Enter email"
        onChange={handleChange}
      />

      <TextInputWithLabel
        name="password"
        value={form?.password}
        type="password"
        placeholder="Password"
        onChange={handleChange}
        label="Password"
      />

      <SButton
        loading={isLoading}
        disabled={isLoading}
        variant="primary"
        action={handleSubmit}
      >
        Submit
      </SButton>
    </Form>
  );
}
