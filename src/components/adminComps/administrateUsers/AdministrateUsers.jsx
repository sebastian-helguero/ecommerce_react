import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { errorToast, successToast } from "../../../utils/notification";

import {
  changeUserRoleService,
  deleteUserService,
  recoverUserService,
} from "./AdministrateUsers.services";

import GetAllUsers from "../getAllUsers/GetAllUsers";

const AdministrateUsers = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState("changeRole"); 

  const handleGoBack = () => navigate("/products");

  const handleChangeRole = async (userId, newRole, currentRole) => {
    if (newRole === currentRole) return;
    try {
      await changeUserRoleService(userId, newRole, token);
      successToast(`Rol cambiado correctamente a "${newRole === "admin" ? "Administrador" : "Usuario"}"`);
    } catch (err) {
      errorToast(err.message || "Hubo un error al cambiar el rol");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUserService(userId, token);
      successToast("Usuario dado de baja correctamente");
    } catch (err) {
      errorToast(err.message || "Error al dar de baja al usuario");
    }
  };

  const handleRecoverUser = async (userId) => {
    try {
      await recoverUserService(userId, token);
      successToast("Usuario recuperado correctamente");
    } catch (err) {
      errorToast(err.message || "Error al recuperar al usuario");
    }
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={handleGoBack}>
          Volver a productos
        </Button>

        <DropdownButton
          title="Seleccionar acción"
          variant="primary"
          onSelect={(action) => setSelectedAction(action)}
        >
          <Dropdown.Item eventKey="changeRole">Modificar rol</Dropdown.Item>
          <Dropdown.Item eventKey="deleteUser">Eliminar usuario</Dropdown.Item>
          <Dropdown.Item eventKey="recoverUser">Recuperar usuario</Dropdown.Item>
        </DropdownButton>
      </div>

      <h2 className="mt-3">Administrar usuarios</h2>

      <GetAllUsers
        onChangeRole={handleChangeRole}
        onDeleteUser={handleDeleteUser}
        onRecoverUser={handleRecoverUser}
        selectedAction={selectedAction}
      />
    </Container>
  );
};

export default AdministrateUsers;