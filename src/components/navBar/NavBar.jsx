import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from "react-router";
import { AuthContext } from '../../services/authContext/Auth.context';
import { useContext, useState } from 'react';
import ToggleTheme from '../../ui/ToggleTheme';
import { CartContext } from '../../services/cartContext/Cart.context';

const NavBar = () => {
    const { handleUserLogout, token, userRole } = useContext(AuthContext);

    const { clearCart } = useContext(CartContext)

    const navigate = useNavigate();

    const handleProductList = () => {
        navigate("/products");
    }
    const handleGoCart = () => {
        navigate("/cart")
    }
    const handleAddProduct = () => {
        navigate("/add-product");
    }
    const handleRecoverProduct = () => {
        navigate("/recover-product");
    }
    const handleRegister = () => {
        navigate("/register");
    }
    const handleLogin = () => {
        navigate("/login");
    }
    const handleGoAdministrateUsers = () => {
        navigate("/users")
    }
    const handleUserOrders = () => {
        navigate("/user/orders");
    }
    const handleAllOrders = () => {
        navigate("/orders")
    }
    const handleAdminRegisterUser = () => {
        navigate("/admin/register")
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary sticky-top w-100 position-fixed" style={{ zIndex: "1000" }} data-bs-theme="dark">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll>
                        <Nav.Link onClick={handleProductList}>Productos</Nav.Link>
                        <Nav.Link onClick={handleGoCart}>Carrito</Nav.Link>
                        {((userRole === "admin" || userRole === "sysadmin") &&
                            <>
                                <Nav.Link onClick={handleAllOrders}>Administrar Ordenes</Nav.Link>
                                <NavDropdown title="Administrar Productos" id="navbarScrollingDropdown">
                                    <NavDropdown.Item onClick={handleAddProduct}>Agregar producto</NavDropdown.Item>
                                    <NavDropdown.Item onClick={handleRecoverProduct}>Recuperar producto eliminado</NavDropdown.Item>
                                </NavDropdown>
                            </>)}
                        {(userRole === "sysadmin" &&
                            <NavDropdown title="Administrar Usuarios" id="navbarScrollingDropdown">
                                <Nav.Link onClick={handleGoAdministrateUsers}>Administrar rol de usuario</Nav.Link>
                                <Nav.Link onClick={handleAdminRegisterUser}>Crear cuenta a un usuario</Nav.Link>
                            </NavDropdown>)}
                    </Nav>
                    {!token ?
                        <Nav>
                            <Nav.Link onClick={handleRegister}>Registrarse</Nav.Link>
                            <Nav.Link onClick={handleLogin}>Iniciar Sesión</Nav.Link>
                        </Nav>
                        :
                        <Nav>
                            <NavDropdown title="opciones" id="navbarScrollingDropdown">
                                <NavDropdown.Item >Tema: <ToggleTheme /></NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link onClick={handleUserOrders}>Mis Pedidos</Nav.Link>
                            <Nav.Link onClick={() => {
                                handleUserLogout();
                                clearCart();
                                navigate("/login");
                            }}>Cerrar sesión</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar