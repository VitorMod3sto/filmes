import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function Pagina(props) {

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Filmes Revisão</Nav.Link>
                        <Nav.Link href="/filmes">Filmes</Nav.Link>
                        <Nav.Link href="/series">Series</Nav.Link>
                        <Nav.Link href="/atores">Atores</Nav.Link>
                        <NavDropdown title="Filmes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="./">
                                Principal
                            </NavDropdown.Item>
                            <NavDropdown.Item href="./disney/cards">Cards</NavDropdown.Item>

                            <NavDropdown.Item href="./disney/carrossel">
                                Carrossel
                            </NavDropdown.Item>

                            <NavDropdown.Item href="./disney/tabela">
                                Tabela
                            </NavDropdown.Item>
                            <NavDropdown.Divider />

                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <div className="bg-secondary text-white text-center p-3">
                <h1>{props.titulo}</h1>
            </div>
            <Container>
                {props.children}
            </Container>
        </>
    )
}
