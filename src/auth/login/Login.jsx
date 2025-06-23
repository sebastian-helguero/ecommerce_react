import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Form, Row } from "react-bootstrap"
import { AuthContext } from "../../services/authContext/Auth.context";
import { errorToast } from "../../utils/notification";
import { loginUser } from "./Login.services";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    userPassword: false,
  })

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { handleUserLogin } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      email: false
    }))
  }
  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value)
    setErrors(prevErrors => ({
      ...prevErrors,
      userPassword: false,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.length) {
      errorToast("¡El email está vacío!");
      emailRef.current.focus();
      setErrors(prevErrors => ({
        ...prevErrors,
        email: true,
      }))
      return;
    }

    if (!passwordRef.current.value.length) {
      errorToast("¡El userPassword esta vacío!");
      passwordRef.current.focus();
      setErrors(prevErrors => ({
        ...prevErrors,
        userPassword: true,
      }))
      return;
    }

    loginUser({ email, userPassword },
      (data) => {
        handleUserLogin(data.token, data.userRole);
        navigate("/products");
      },
      (error) => {
        errorToast(error.message || "Error al iniciar sesión");
      }
    )
  }

  const handleRegisterClick = () => {
    navigate("/register")
  }

  return (
    < >
      <Card className="mb-3" style={{ width: '20rem', margin: "auto", marginTop: "100px", alignContent: "center" }}>
        <Card.Header>Iniciar Sesión</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className={
                  `input-email  ${errors.email ? 'border border-danger' : ''}`
                }
                placeholder="Ingrese su email"
                value={email}
                onChange={handleEmailChange}
                ref={emailRef}
              />
              {errors.email && <p className="text-danger">El campo email es obligatorio</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="ingrese su contraseña"
                value={userPassword}
                onChange={handlePasswordChange}
                ref={passwordRef}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
            <Row className="mt-4">
              <Button onClick={handleRegisterClick}>Registrarse</Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default Login