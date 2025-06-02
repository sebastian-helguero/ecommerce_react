import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { AuthContext } from '../../services/authContext/Auth.context';
import { useContext, useState } from 'react';
const tokenSaved = localStorage.getItem("book-champions-token")

const NavBar = (onSearch) => {

    const [token, setToken] = useState(tokenSaved);
    const { handleUserLogout } = useContext(AuthContext);

    const navigate = useNavigate();
    const handleProductList = () => {
        navigate("/products");
    }
    const handleAddProduct = () => {
        navigate("/add-product");
    }
    const handleRegister = () => {
        navigate("/register");
    }
    const handleLogin = () => {
        navigate("/login");
    }


    return (
        <Navbar expand="lg" className="bg-body-tertiary  w-100 position-fixed" style={{ zIndex: "1000" }} data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand >HOLA</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={handleProductList}>Productos</Nav.Link>
                        <Nav.Link >Carrito</Nav.Link>
                        <NavDropdown title="Administrar Productos" id="navbarScrollingDropdown">
                            <NavDropdown.Item onClick={handleAddProduct}>Agregar producto</NavDropdown.Item>
                            <NavDropdown.Item >Modificar producto</NavDropdown.Item>
                            <NavDropdown.Item >Eliminar producto</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {!token ?
                        <Nav>
                            <Nav.Link onClick={handleRegister}>Registrarse</Nav.Link>
                            <Nav.Link onClick={handleLogin}>Iniciar Sesión</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link onClick={handleUserLogout}>Cerrar sesión</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar