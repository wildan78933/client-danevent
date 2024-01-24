import React, { useEffect, useState } from "react";
import { Container, Table, Spinner } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import SButton from "../../components/Button";
import SBreadcrumb from "../../components/Breadcrumb";
import SNavbar from "../../components/Navbar";
import { config } from "../../configs";
import axios from "axios";

export default function PageCategories() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate([]);

  const [data, setData] = useState([]);

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const getCategoriesAPI = async () => {
      try {
        const res = await axios.get(`${config.api_host_dev}/cms/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // const res = await axios.get(
        //   "http://localhost:9000/api/v1/cms/categories",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        setIsloading(false);
        setData(res.data.data);
      } catch (err) {
        setIsloading(false);
        console.log(err);
      }
    };
    getCategoriesAPI();
  }, []);

  if (!token) return <Navigate to="/signin" replace={true} />;

  return (
    <>
      {console.log("render")}
      <SNavbar />
      <Container className="mt-3">
        <SBreadcrumb textSecound="Categories" />

        <SButton action={() => navigate("/categories/create")}>Tambah</SButton>

        <Table className="mt-3" striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={data.length + 1} style={{ textAlign: "center" }}>
                  <div className="flex items-center justify-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                </td>
              </tr>
            ) : (
              data.map((data, index) => (
                <tr key={index}>
                  <td>{(index += 1)}</td>
                  <td>{data.name}</td>
                  <td>Otto</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
