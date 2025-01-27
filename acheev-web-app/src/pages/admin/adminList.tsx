import React from "react";
import { PageHeader } from "components/PageHeader";
import gql from "graphql-tag";
import { TableContainer } from "shared/CommonStyles";
import {
  AdminModifyUserInput,
  Pagination,
  useAdminChangePasswordMutation,
  useAdminModifyUserMutation,
  useAdminUsersQuery,
  useRegisterMutation,
} from "types/gqlReactTypings.generated.d";
import { isEmpty, orderBy } from "lodash";
import { GqlQueryRender } from "shared/gql/gqlQueryRender";
import { TableWrapper } from "shared/tableWrapper";
import { formatDate } from "shared/Utilities";
import { AdminPaginator } from "./components/adminPaginator";
import AppInput, { InputType } from "components/AppInput";
import { EditText } from "react-edit-text";
import { IoMdClose } from "react-icons/io";
import { Button, Modal } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";

interface IProps {
  match?: any;
}

export const AdminList: React.FC<IProps> = () => {
  const [pagination, setPagination] = React.useState<Pagination>();
  const usersQuery = useAdminUsersQuery({
    variables: { pagination: { ...pagination, limit: 200 } },
  });
  const [registerMutation] = useRegisterMutation();
  const [changePasswordMutation] = useAdminChangePasswordMutation();
  const [modifyAdminUser] = useAdminModifyUserMutation();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [showCreateAdmin, setShowCreateAdmin] = React.useState(false);

  // Handlers for opening and closing the modal
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setShowCreateAdmin(false);
    setShow(false);
  };

  const handleShowCreateAdmin = () => {
    setShowCreateAdmin(!showCreateAdmin);
  };

  const onRemoveAdmin = (userId: string)=>{
    modifyField("admin", userId)(false);
    toast("Admin Removed Successfully", {
      position: "bottom-center",
      style: { backgroundColor: "green", color: "white" },
    });
  }

  const onCreateAdmin = () => {
    const userInput = { firstName, lastName, phoneNumber, email, password };
    if (phoneNumber?.includes("-")) {
      return;
    }
    if (isEmpty(userInput.firstName) || isEmpty(userInput.lastName)) {
      return window.alert("Please fill out name");
    } else if (
      phoneNumber == null ||
      isEmpty(phoneNumber) ||
      phoneNumber.length < 10
    ) {
      return window.alert("Phone numbers have to be 10 digits long and valid");
    }

    registerMutation({ variables: { userInput } })
      .then(({ data }) => {
        if (!data) {
          throw Error("Registered but no data");
        }
        handleClose();

        console.log("Register successful", data.register);

        modifyField("admin", data.register.user.id)(true);
        modifyField("verified", data.register.user.id)(true);

        toast("Admin Created Successfully", {
          position: "bottom-center",
          style: { backgroundColor: "green", color: "white" },
        });
      })
      .catch((err) => {
        if (`${err}`.toLowerCase().includes("users_email_unique")) {
          return window.alert(
            "Email already exists. Please check email and try again."
          );
        }
        window.alert(`Failed to register. Please try again.  ${err}`);
      });
  };

  const modifyField =
    (field: keyof AdminModifyUserInput, userId: string) =>
      (value: string | number | boolean | Date) => {
        modifyAdminUser({
          variables: { userId, modifyUserInput: { [field]: value } },
        }).catch((err) => {
          console.error(err);
          window.alert("Failed to update value");
        });
      };

  return (
    <>
      <PageHeader
        title={`Admins List`}
        rightItem={
          <div className="d-flex">
            <Button variant="primary" onClick={handleShow}>
              Add Admin
            </Button>
            <AdminPaginator
              searchTerm="Users"
              pagination={pagination}
              onChange={setPagination}
            />
          </div>
        }
      />
      <TableContainer>
        <TableWrapper
          columns={[
            "ID",
            "First Name",
            "Last Name",
            "Email",
            "Phone",
            "Change Password",
            "Restricted Admin?",
            "Is Coach?",
            "Created At",
            "Actions",
          ]}
        >
          <GqlQueryRender query={usersQuery}>
            {({ adminUsers }) => {
              return (
                <tbody>
                  {orderBy(adminUsers, (item) => item.fullName, "asc")
                    .filter((item) => item.admin)
                    .map((user) => {
                      return (
                        <tr key={user.id}>
                          <td style={{ maxWidth: 200, wordWrap: "break-word" }}>
                            {user.id}
                          </td>
                          <td>
                            <EditText
                              style={{ minWidth: 75 }}
                              defaultValue={user.firstName}
                              onSave={({ value }) =>
                                modifyField("firstName", user.id)(value)
                              }
                            />
                          </td>
                          <td>
                            <EditText
                              style={{ minWidth: 75 }}
                              defaultValue={user.lastName}
                              onSave={({ value }) =>
                                modifyField("lastName", user.id)(value)
                              }
                            />
                          </td>
                          <td>
                            <EditText
                              type="email"
                              style={{ minWidth: 75 }}
                              defaultValue={user.email}
                              onSave={({ value }) =>
                                modifyField("email", user.id)(value)
                              }
                            />
                          </td>
                          <td>
                            <EditText
                              type="tel"
                              style={{ minWidth: 75 }}
                              defaultValue={user.phoneNumber}
                              onSave={({ value }) =>
                                modifyField("phoneNumber", user.id)(value)
                              }
                            />
                          </td>
                          <td>
                            <EditText
                              type="password"
                              style={{ minWidth: 75 }}
                              placeholder="New Password"
                              showEditButton={true}
                              inline={false}
                              onSave={({ value }) =>
                                changePasswordMutation({
                                  variables: {
                                    userId: user.id,
                                    newPassword: value,
                                  },
                                }).catch((err) => {
                                  console.error(err);
                                  window.alert("Failed to change password");
                                })
                              }
                            />
                          </td>
                          <td>
                            <AppInput
                              type={InputType.TOGGLE}
                              defaultValue={user.restrictedAdmin}
                              onChange={modifyField("restrictedAdmin", user.id)}
                            />
                          </td>
                          <td>
                            <AppInput
                              type={InputType.TOGGLE}
                              defaultValue={user.isCoach}
                              onChange={modifyField("isCoach", user.id)}
                            />
                          </td>
                          <td>{formatDate(user.createdAt)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-dark border-0"
                              onClick={() => onRemoveAdmin(user.id)}
                            >
                              <IoMdClose size={36} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              );
            }}
          </GqlQueryRender>
        </TableWrapper>
      </TableContainer>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          {!showCreateAdmin ? (
            <>
              <p>Click a user to add as an admin:</p>
              <AdminPaginator
                searchTerm="Users"
                pagination={pagination}
                onChange={setPagination}
              />
              <GqlQueryRender query={usersQuery}>
                {({ adminUsers }) => (
                  <div
                    style={{
                      overflowY: "scroll",
                      height: "200px",
                      width: "100%",
                      display: "inline-block",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {adminUsers
                      .filter((user) => !user.admin)
                      .map((user) => (
                        <div
                          key={user.id}
                          className="list-group-item list-group-item-action"
                          style={{ cursor: "pointer" }}
                          onClick={() => modifyField("admin", user.id)(true)}
                        >
                          {user.firstName} {user.lastName} ({user.phoneNumber})
                        </div>
                      ))}
                  </div>
                )}
              </GqlQueryRender>
            </>
          ) : (
            <div>
              <div className="form-group">
                <h6>First Name</h6>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control form-control-user"
                  id="exampleInputFirstName"
                  placeholder="First Name"
                />
                <br />
                <h6>Last Name</h6>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control form-control-user"
                  id="exampleInputLastName"
                  placeholder="Last Name"
                />
                <br />
                <h6>Email</h6>
                <input
                  type="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="form-control form-control-user"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="email"
                />
                <br />
                <h6>Phone</h6>
                <input
                  type="Phone"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  value={phoneNumber}
                  className="form-control form-control-user"
                  id="exampleInputPhone"
                  aria-describedby="phone"
                  placeholder="phone"
                />
                <br />
                <h6>Password</h6>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control form-control-user"
                  id="exampleInputPassword"
                  placeholder="Password"
                />
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onCreateAdmin}
                >
                  Create Admin
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShowCreateAdmin}>
            {showCreateAdmin ? "Select From Users" : "Create New Admin"}
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
};
