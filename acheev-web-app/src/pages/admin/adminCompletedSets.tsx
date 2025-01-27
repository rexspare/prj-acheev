// import React, { useState } from "react";
// import { gql } from "@apollo/client";
// import { PageHeader } from "components/PageHeader";
// import { Button, Modal, Form } from "react-bootstrap";
// import { TableContainer } from "shared/CommonStyles";
// import { GqlQueryRender } from "shared/gql/gqlQueryRender";
// import { TableWrapper } from "shared/tableWrapper";
// import { useCompletedSetsQuery } from "types/gqlReactTypings.generated.d";

// gql`
//   query CompletedSets {
//     completedSets {
//       id
//       templateId
//       programId
//       programFacetId
//       workoutId
//       circuitId
//       exerciseId
//       completedAt
//       startedAt
//       archived
//       order
//       durationSeconds
//       repCount
//       weight
//       weightRelative
//       weightUnit
//       distance
//       percentageMax
//       repsAvailable
//       maxPercAvailable
//       createdAt
//       program {
//         id
//         name
//       }
//       programFacet {
//         id
//         name
//       }
//     }
//   }
// `;

// export function AdminCompletedSets() {
//   const completedSetsQuery = useCompletedSetsQuery();
//   const [showModal, setShowModal] = React.useState(false);
//   const [selectedProgram, setSelectedProgram] = useState("none");
//   const [selectedProgramFacet, setSelectedProgramFacet] = useState("none");

//   const handleClose = () => setShowModal(false);
//   const handleShow = () => setShowModal(true);

//   const handleProgramChange = (e: any) => {
//     setSelectedProgram(e.target.value);
//   };

//   const handleProgramFacetChange = (e: any) => {
//     setSelectedProgramFacet(e.target.value);
//   };

//   const handleClearFilters = (e: any) => {
//     setSelectedProgram("none");
//     setSelectedProgramFacet("none");
//   };

//   return (
//     <>
//       <PageHeader
//         title={`Completed Workouts`}
//         rightItem={<Button onClick={handleShow}>Filter</Button>}
//       />
//       <TableContainer>
//         <TableWrapper
//           columns={[
//             "ID",
//             "Template ID",
//             "Program (ID)",
//             "Program Facet (ID)",
//             "Workout ID",
//             "Circuit ID",
//             "Exercise ID",
//             "Completed At",
//             "Started At",
//             "Archived",
//             "Order",
//             "Duration (Seconds)",
//             "Rep Count",
//             "Weight",
//             "Body Weight?",
//             "Weight Unit",
//             "Distance",
//             "Percentage Max",
//             "Use Distance?",
//             "Use Max%?",
//           ]}
//         >
//           <GqlQueryRender query={completedSetsQuery}>
//             {({ completedSets }) => {
//               // Filter completedSets based on selectedProgram
//               let filteredSets =
//                 selectedProgram !== "none"
//                   ? completedSets.filter(
//                       (set) => set.programId == selectedProgram
//                     )
//                   : completedSets;

//               // Filter completedSets based on selectedProgramFacets
//               filteredSets =
//                 selectedProgramFacet !== "none"
//                   ? filteredSets.filter(
//                       (set) => set.programFacetId == selectedProgramFacet
//                     )
//                   : filteredSets;

//               return (
//                 <tbody>
//                   {filteredSets.map((set) => (
//                     <tr key={set.id}>
//                       <td>{set.id}</td>
//                       <td>{set.templateId}</td>
//                       <td>{`${set.program.name} (${set.programId})`}</td>
//                       <td>{`${set.programFacet.name} (${set.programFacetId})`}</td>
//                       <td>{set.workoutId}</td>
//                       <td>{set.circuitId}</td>
//                       <td>{set.exerciseId}</td>
//                       <td>{set.completedAt}</td>
//                       <td>{set.startedAt}</td>
//                       <td>{set.archived ? "Yes" : "No"}</td>
//                       <td>{set.order}</td>
//                       <td>{set.durationSeconds}</td>
//                       <td>{set.repCount}</td>
//                       <td>{set.weight}</td>
//                       <td>{set.weightRelative}</td>
//                       <td>{set.weightUnit}</td>
//                       <td>{set.distance}</td>
//                       <td>{set.percentageMax}</td>
//                       <td>{set.repsAvailable}</td>
//                       <td>{set.maxPercAvailable}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               );
//             }}
//           </GqlQueryRender>
//         </TableWrapper>
//       </TableContainer>

//       {/* Modal for filtering */}
//       <Modal show={showModal} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Filter</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group controlId="programSelect">
//             <Form.Label>Select Program</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedProgram}
//               onChange={handleProgramChange}
//             >
//               <option value="none">None</option>
//               {completedSetsQuery.data?.completedSets.map((set) => (
//                 <option key={set.programId} value={set.programId}>
//                   {set.program.name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//           <Form.Group controlId="programFacetSelect">
//             <Form.Label>Select Program Facet</Form.Label>
//             <Form.Control
//               as="select"
//               value={selectedProgramFacet}
//               onChange={handleProgramFacetChange}
//             >
//               <option value="none">None</option>
//               {completedSetsQuery.data?.completedSets.map((set) => (
//                 <option key={set.programFacetId} value={set.programFacetId}>
//                   {set.programFacet.name}
//                 </option>
//               ))}
//             </Form.Control>
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClearFilters}>
//             Clear
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Finish
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
