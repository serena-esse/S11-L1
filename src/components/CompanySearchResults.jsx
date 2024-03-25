import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

const CompanySearchResults = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState([]);
  const params = useParams();
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.company);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = (jobData) => {
    dispatch({
      type: "ADD_TO_FAVOURITES",
      payload: jobData,
    });
  };

  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job posting for: {params.company}</h1>
          {jobs.map((jobData) => (
            <div key={jobData._id}>
              <Job data={jobData} />
              <Button className="d-flex align-items-center" onClick={() => addToFavorites(jobData)}>
                Add to Favorites
              </Button>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;
