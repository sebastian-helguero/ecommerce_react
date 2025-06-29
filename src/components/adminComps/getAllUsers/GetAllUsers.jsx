import { useContext, useEffect, useState } from "react";
import { Container, Table, InputGroup, Form, Modal, Button } from "react-bootstrap";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { errorToast } from "../../../utils/notification";
import { getAllUsersService } from "./GetAllUsers.services";

const GetAllUsers = ({ onChangeRole, onDeleteUser, onRecoverUser, selectedAction }) => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showStateModal, setShowStateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [stateAction, setStateAction] = useState(null);

    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getAllUsersService(token);
                setUsers(data);
            } catch (err) {
                errorToast(err.message || "No se pudo cargar la lista de usuarios");
            }
        };
        fetchUsers();
    }, [token]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-AR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const filteredUsers = users
        .filter((user) => user.fullName.toLowerCase().includes(filter.toLowerCase()))
        .filter((user) => {
            if (selectedAction === "deleteUser") {
                return user.userState === true && user.userRole !== "sysadmin";
            }
            if (selectedAction === "recoverUser") {
                return user.userState === false;
            }
            return true;
        });

    const handleOpenRoleModal = (user) => {
        setSelectedUser(user);
        setShowRoleModal(true);
    };

    const handleCloseRoleModal = () => {
        setSelectedUser(null);
        setShowRoleModal(false);
    };

    const handleConfirmChangeRole = async () => {
        if (!selectedUser) return;
        const newRole = selectedUser.userRole === "admin" ? "user" : "admin";
        try {
            await onChangeRole(selectedUser.userId, newRole, selectedUser.userRole);
            setUsers((prev) =>
                prev.map((u) =>
                    u.userId === selectedUser.userId ? { ...u, userRole: newRole } : u
                )
            );
        } catch (err) {
            errorToast(err.message || "No se pudo cambiar el rol");
        } finally {
            handleCloseRoleModal();
        }
    };

    const handleOpenStateModal = (user, action) => {
        setSelectedUser(user);
        setStateAction(action);
        setShowStateModal(true);
    };

    const handleCloseStateModal = () => {
        setSelectedUser(null);
        setStateAction(null);
        setShowStateModal(false);
    };

    const handleConfirmStateChange = async () => {
        if (!selectedUser || !stateAction) return;

        try {
            if (stateAction === "delete") {
                await onDeleteUser(selectedUser.userId);
                setUsers((prev) =>
                    prev.map((u) =>
                        u.userId === selectedUser.userId ? { ...u, userState: false } : u
                    )
                );
            } else if (stateAction === "recover") {
                await onRecoverUser(selectedUser.userId);
                setUsers((prev) =>
                    prev.map((u) =>
                        u.userId === selectedUser.userId ? { ...u, userState: true } : u
                    )
                );
            }
        } catch (err) {
            errorToast(err.message || "Error al modificar estado del usuario");
        } finally {
            handleCloseStateModal();
        }
    };

    return (
        <Container style={{ marginTop: "30px" }}>
            <h2 className="mb-3">Lista de usuarios</h2>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Buscar por nombre"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </InputGroup>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre completo</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Ciudad</th>
                        <th>Dirección</th>
                        <th>Código postal</th>
                        <th>Fecha de nacimiento</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.city}</td>
                                <td>{user.address}</td>
                                <td>{user.areaCode}</td>
                                <td>{formatDate(user.birthDate)}</td>
                                <td>
                                    {user.userRole === "user"
                                        ? "Usuario"
                                        : user.userRole === "admin"
                                            ? "Administrador"
                                            : "Administrador Principal"}
                                </td>
                                <td>{user.userState ? "Activo" : "Inactivo"}</td>
                                <td className="text-center">
                                    {selectedAction === "changeRole" &&
                                        (user.userRole === "user" || user.userRole === "admin") && (
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleOpenRoleModal(user)}
                                            >
                                                Modificar rol
                                            </Button>
                                        )}
                                    {selectedAction === "deleteUser" &&
                                        user.userState &&
                                        user.userRole !== "sysadmin" && (
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleOpenStateModal(user, "delete")}
                                            >
                                                Dar de baja
                                            </Button>
                                        )}

                                    {selectedAction === "recoverUser" && !user.userState && (
                                        <Button
                                            size="sm"
                                            variant="success"
                                            onClick={() => handleOpenStateModal(user, "recover")}
                                        >
                                            Recuperar usuario
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">
                                No se encontraron usuarios
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={showRoleModal} onHide={handleCloseRoleModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <>
                            <p>
                                Usuario: <strong>{selectedUser.fullName}</strong>
                            </p>
                            <p>
                                Rol actual:{" "}
                                <strong>
                                    {selectedUser.userRole === "user" ? "Usuario" : "Administrador"}
                                </strong>
                            </p>
                            <p>
                                Nuevo rol:{" "}
                                <strong>
                                    {selectedUser.userRole === "admin" ? "Usuario" : "Administrador"}
                                </strong>
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRoleModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleConfirmChangeRole}>
                        Cambiar rol
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showStateModal} onHide={handleCloseStateModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {stateAction === "delete" && "Confirmar eliminación"}
                        {stateAction === "recover" && "Confirmar recuperación"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <p>
                            {stateAction === "delete" &&
                                `¿Seguro que desea dar de baja a "${selectedUser.fullName}"?`}
                            {stateAction === "recover" &&
                                `¿Seguro que desea recuperar a "${selectedUser.fullName}"?`}
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStateModal}>
                        Cancelar
                    </Button>
                    <Button
                        variant={stateAction === "delete" ? "danger" : "success"}
                        onClick={handleConfirmStateChange}
                    >
                        {stateAction === "delete" ? "Eliminar" : "Recuperar"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default GetAllUsers;
