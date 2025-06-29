import { useState, useContext } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { validateEmail, validatePassword, validateString, validateUserAge } from "../../../auth/auth.helpers";
import { errorToast, successToast } from "../../../utils/notification";
import { AuthContext } from "../../../services/authContext/Auth.context";
import { registerUserByAdminService } from "./AdminCreateUser.services";
import { useNavigate } from "react-router";

const AdminCreateUser = () => {
  const { token } = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [userState, setUserState] = useState(true);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    fullName: false,
    birthDate: false,
    phone: false,
    areaCode: false,
    city: false,
    address: false,
    username: false,
    email: false,
    userPassword: false,
  });

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!fullName.length || !validateString(fullName, 3, 50)) {
      errorToast(`Debe ingresar su nombre completo`);
      setErrors(prev => ({ ...prev, fullName: true }));
      return;
    }
    if (!birthDate.length || !validateUserAge(birthDate)) {
      errorToast(`Debe ingresar una fecha de nacimiento válida (y ser mayor de 18 años)`);
      setErrors(prev => ({ ...prev, birthDate: true }));
      return;
    }
    if (!phone.length || !validateString(phone, 7, 15)) {
      errorToast(`Ingrese un número de teléfono válido`);
      setErrors(prev => ({ ...prev, phone: true }));
      return;
    }
    if (!areaCode.length || !validateString(areaCode, 4, 8)) {
      errorToast(`Ingrese un código de área correcto`);
      setErrors(prev => ({ ...prev, areaCode: true }));
      return;
    }
    if (!city.length || !validateString(city, 2, 50)) {
      errorToast(`Ingrese una ciudad correcta`);
      setErrors(prev => ({ ...prev, city: true }));
      return;
    }
    if (!address.length || !validateString(address, 6, 100)) {
      errorToast(`Ingrese una dirección correcta`);
      setErrors(prev => ({ ...prev, address: true }));
      return;
    }
    if (!username.length || !validateString(username, 6, 20)) {
      errorToast(`Ingrese un nombre de usuario`);
      setErrors(prev => ({ ...prev, username: true }));
      return;
    }
    if (!email.length || !validateEmail(email)) {
      errorToast(`Ingrese un email válido`);
      setErrors(prev => ({ ...prev, email: true }));
      return;
    }
    if (!userPassword.length || !validatePassword(userPassword, 7, null, false, true)) {
      errorToast(`Ingrese una contraseña válida (mínimo 7 caracteres y un número)`);
      setErrors(prev => ({ ...prev, userPassword: true }));
      return;
    }

    setErrors({
      fullName: false,
      birthDate: false,
      phone: false,
      areaCode: false,
      city: false,
      address: false,
      username: false,
      email: false,
      userPassword: false,
    });

    try {
      await registerUserByAdminService(
        fullName,
        birthDate,
        phone,
        city,
        address,
        areaCode,
        username,
        email,
        userPassword,
        userRole,
        userState,
        token
      );
      successToast("¡Usuario creado exitosamente!");
    } catch (err) {
      errorToast(err.message);
    }
  };

  const handleGoBack = () => {
    navigate("/products")
  }
  return (
    <>
      <Button variant="secondary" onClick={handleGoBack} style={{ margin: "20px" }}>volver a products</Button>
      <Card className="mb-3" style={{ width: "60%", alignContent: "center", margin: "auto", marginTop: "30px", background: "lightgray", minWidth: "350px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Registro de Usuario (Admin)</h2>
          <Form onSubmit={handleRegister}>
            <Row className="mb-3">
              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre y apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className={errors.fullName && "border border-danger"}
                  />
                  {errors.fullName && <p className="mt-2 text-danger">El nombre completo no puede estar vacío</p>}
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Ingrese su fecha de nacimiento"
                    min="1900-01-01"
                    max={new Date().toISOString().split("T")[0]}
                    value={birthDate}
                    onChange={e => setBirthDate(e.target.value)}
                    className={errors.birthDate && "border border-danger"}
                  />
                  {errors.birthDate && <p className="mt-2 text-danger">Debe ser mayor de 18 años</p>}
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su número de teléfono"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className={errors.phone && "border border-danger"}
                  />
                  {errors.phone && <p className="mt-2 text-danger">El teléfono no puede estar vacío</p>}
                </Form.Group>
              </Col>
              <Col md={7}>
                <Form.Group className="mb-3">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su ciudad"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className={errors.city && "border border-danger"}
                  />
                  {errors.city && <p className="mt-2 text-danger">La ciudad no puede estar vacía</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    value={address}
                    placeholder="Ingrese su dirección"
                    onChange={e => setAddress(e.target.value)}
                    className={errors.address && "border border-danger"}
                  />
                  {errors.address && <p className="mt-2 text-danger">La dirección no puede estar vacía</p>}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Código de Área</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su código de área"
                    className={errors.areaCode && "border border-danger"}
                    value={areaCode}
                    onChange={e => setAreaCode(e.target.value)}
                  />
                  {errors.areaCode && <p className="mt-2 text-danger">El código de área no puede estar vacío</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre de usuario"
                    className={errors.username && "border border-danger"}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                  {errors.username && <p className="mt-2 text-danger">El nombre de usuario no puede estar vacío</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className={errors.email && "border border-danger"}
                  />
                  {errors.email && <p className="mt-2 text-danger">El email no puede estar vacío</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    className={errors.userPassword && "border border-danger"}
                    value={userPassword}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {errors.userPassword && <p className="mt-2 text-danger">La contraseña no puede estar vacía</p>}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select value={userRole} onChange={e => setUserRole(e.target.value)}>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                    <option value="sysadmin">Super Admin</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-center">
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Usuario activo"
                    checked={userState}
                    onChange={e => setUserState(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" className="btn btn-primary">
              Registrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminCreateUser;