import React, { useState, useEffect } from "react";
import { PageHeader } from "components/PageHeader";
import { Button, Modal, Form } from "react-bootstrap";
import { TableContainer } from "shared/CommonStyles";
import { TableWrapper } from "shared/tableWrapper";
import { Spinner } from 'react-bootstrap';
import { firestore } from '../../firebaseConfig'
import { getDocs, collection } from "firebase/firestore";
export const ALL_COMPLETED_WORKOUTS_COOLECTIONS = 'allCompletedworkouts'

export function AdminCompletedWorkouts() {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | number>("none");
  const [selectedProgramFacet, setSelectedProgramFacet] = useState<string | number>("none");
  const [selectedSkillLevel, setselectedSkillLevel] = useState<string | number>("none")
  const [data, setdata] = useState<any[]>([])
  const [filteredDataSource, setfilteredDataSource] = useState<any[]>([])
  const [isLoading, setisLoading] = useState(false)

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleProgramChange = (e: any) => {
    setSelectedProgram(e.target.value);
  };

  const handleProgramFacetChange = (e: any) => {
    setSelectedProgramFacet(e.target.value);
  };

  const handleSkillLevelChange = (e: any) => {
    setselectedSkillLevel(e.target.value);
  };

  const handleClearFilters = (e: any) => {
    setSelectedProgram("none");
    setSelectedProgramFacet("none");
    setselectedSkillLevel("none");
  };

  const getCompletedWorkouts = async () => {
    try {
      setisLoading(true)
      const querySnapshot = await getDocs(collection(firestore, ALL_COMPLETED_WORKOUTS_COOLECTIONS))
      const newData = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), docId: doc.id }));
      setdata(newData);
      setfilteredDataSource(newData)
    } catch (error) {
      console.log({ error });
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    getCompletedWorkouts()
  }, [])


  const PROGRAMS = [...new Set(data.map(workout => workout.programId))]
  const PROGRAM_FACETS = [...new Set(data.map(workout => workout.programFacetId))]
  const SKILL_LEVEL = [...new Set(data.map(workout => workout.skillLevel))]

  useEffect(() => {
    getFilteredData();
  }, [selectedProgram, selectedProgramFacet, selectedSkillLevel]);

  // Implement the filtering logic
  const getFilteredData = () => {
    let filteredData = data;

    if (selectedProgram !== "none") {
      filteredData = filteredData.filter(workout => workout.programId == selectedProgram);
    }

    if (selectedProgramFacet !== "none") {
      filteredData = filteredData.filter(workout => workout.programFacetId == selectedProgramFacet);
    }

    if (selectedSkillLevel !== "none") {
      filteredData = filteredData.filter(workout => workout.skillLevel == selectedSkillLevel);
    }

    setfilteredDataSource(filteredData);
  };

  return (
    <>
      <PageHeader
        title={`Completed Workouts`}
        rightItem={<Button onClick={handleShow}>Filter</Button>}
      />
      <TableContainer>
        <TableWrapper
          columns={[
            "ID",
            "User (ID)",
            "Workout (ID)",
            "Skill Level",
            "Program (ID)",
            "Program Facet (ID)",
            "Week",
            "Order",
            "Completed At",
            // "Duration (minutes)",
          ]}
        >
          {
            isLoading ?
              <Spinner animation='grow' />
              :
              <tbody>
                {filteredDataSource.map((workout, index) => (
                  <tr key={index}>
                    <td>{workout.docId}</td>
                    <td>{workout.user_id}</td>
                    <td>{workout.id}</td>
                    <td>{workout.skillLevel}</td>
                    <td>{workout.programId}</td>
                    <td>{workout.programFacetId}</td>
                    <td>{workout.week}</td>
                    <td>{workout.order}</td>
                    <td>{workout.completedAt}</td>
                    {/* <td>{workout.durationMinutes}</td> */}
                  </tr>
                ))}
              </tbody>
          }

        </TableWrapper>
      </TableContainer>

      {/* Modal for filtering */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filter</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="programSelect">
            <Form.Label>Select Program ID</Form.Label>
            <Form.Control
              as="select"
              value={selectedProgram}
              onChange={handleProgramChange}
            >
              <option value="none">None</option>
              {
                PROGRAMS.map((workout, index) => (
                  <option key={index} value={workout}>
                    {workout}
                  </option>
                ))
              }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="programFacetSelect">
            <Form.Label>Select Program Facet ID</Form.Label>
            <Form.Control
              as="select"
              value={selectedProgramFacet}
              onChange={handleProgramFacetChange}
            >
              <option value="none">None</option>
              {
                PROGRAM_FACETS.map((workout, index) => (
                  <option key={index} value={workout}>
                    {workout}
                  </option>
                ))
              }
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="programFacetSelect">
            <Form.Label>Select Skill Level</Form.Label>
            <Form.Control
              as="select"
              value={selectedSkillLevel}
              onChange={handleSkillLevelChange}
            >
              <option value="none">None</option>
              {
                SKILL_LEVEL.map((workout, index) => (
                  <option key={index} value={workout}>
                    {workout}
                  </option>
                ))
              }
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Finish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
