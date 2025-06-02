import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { validateEmail, validatePassword, validateString, validateUserAge } from "../auth.helpers";
import { errorToast, successToast } from "../../utils/notification";
import { registerUser } from "./Register.services";


const Register = () => {
    const [fullName, setFullName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [areaCode, setAreaCode] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userPassword, setPassword] = useState("");

    const [errors, setErrors] = useState({
        name: false,
        birthDate: false,
        fullName: false,
        phone: false,
        areaCode: false,
        city: false,
        address: false,
        username: false,
        email: false,
        userPassword: false
    });

    const navigate = useNavigate();
    const handleGoLogin = () => {
        navigate("/login");
    }

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
    }
    const handleBirthDateChange = (e) => {
        setBirthDate(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }
    const handleAreaCodeChange = (e) => {
        setAreaCode(e.target.value);
    }
    const handleCityChange = (e) => {
        setCity(e.target.value);
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        setErrors(prevErrors => ({
            ...prevErrors,
            email: false
        }));
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleRegister = (event) => {
        event.preventDefault();

        if (!fullName.length || !validateString(fullName, 3, 50)) {
            errorToast(`Debe ingresar su nombre completo`);
            setErrors({ ...errors, fullName: true });
            return;
        }
        if (!birthDate.length || !validateUserAge(birthDate)) {
            errorToast(`Debe ingresar una fecha de nacimiento válida (y ser mayor de 18 años)`);
            setErrors({ ...errors, birthDate: true });
            return;
        }
        if (!phone.length || !validateString(phone, 7, 15)) {
            errorToast(`Ingrese un número de teléfono válido`);
            setErrors({ ...errors, phone: true });
            return;
        }
        if (!areaCode.length || !validateString(areaCode, 4, 8)) {
            errorToast(`Ingrese un código de área correcto`);
            setErrors({ ...errors, areaCode: true });
            return;
        }
        if (!city.length || !validateString(city, 2, 50)) {
            errorToast(`Ingrese una ciudad correcta`);
            setErrors({ ...errors, city: true });
            return;
        }
        if (!address.length || !validateString(address, 6, 100)) {
            errorToast(`Ingrese una dirección correcta`);
            setErrors({ ...errors, address: true });
            return;
        }
        if (!username.length || !validateString(username, 6, 20)) {
            errorToast(`Ingrese un nombre de usuario`);
            setErrors({ ...errors, username: true });
            return;
        }
        if (!email.length || !validateEmail(email)) {
            errorToast(`Ingrese un email válido`);
            setErrors({ ...errors, email: true });
            return;
        }
        else if (!userPassword.length || !validatePassword(userPassword, 7, null, false, true)) {
            errorToast(`Ingrese una contraseña válida (mínimo 7 caracteres y un número)`);
            setErrors({ ...errors, userPassword: true });
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
            userPassword: false
        });

        registerUser(
            fullName,
            birthDate,
            phone,
            city,
            address,
            areaCode,
            username,
            email,
            userPassword,
            () => {
                successToast("¡Usuario creado exitosamente!")
            },
            err => errorToast(err.message)
        )
    }
    return (
        <>
            <div>
                <Button onClick={handleGoLogin} style={{ margin: "20px" }}>Login</Button>
            </div>
            <Card className="mb-3" style={{ width: "60%", alignContent: "center", margin: "auto", marginTop: "30px", background: "lightgray", minWidth: "350px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Registro de Usuario</h2>
                    <Form>
                        <Row className="mb-3">
                            <Col md={7}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre y apellido</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su nombre completo"
                                        value={fullName}
                                        onChange={handleFullNameChange}
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
                                        onChange={handleBirthDateChange}
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
                                        onChange={handlePhoneChange}
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
                                        onChange={handleCityChange}
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
                                        onChange={handleAddressChange}
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
                                        onChange={handleAreaCodeChange}
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
                                        onChange={handleUsernameChange}
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
                                        onChange={handleEmailChange}
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
                                        onChange={handlePasswordChange}
                                    />
                                    {errors.userPassword && <p className="mt-2 text-danger">La contraseña no puede estar vacía</p>}
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button type="submit" className="btn btn-primary" onClick={handleRegister}>
                            Registrarse
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    );
}
export default Register