import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function Pagina(props) {

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/filmes">Filmes Revisão</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/filmes">Filmes Revisão</Nav.Link>
                        <Nav.Link href="/filmes">Filmes</Nav.Link>
                        <Nav.Link href="/series">Series</Nav.Link>
                        <Nav.Link href="/atores">Atores</Nav.Link>
                        <NavDropdown title="Séries" id="basic-nav-dropdown"> 
                            <NavDropdown.Item href="/series">
                                Populares
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Filmes" id="basic-nav-dropdown">
                            <NavDropdown.Item href="./filmes">
                                Em cartaz
                            </NavDropdown.Item>
                            
                            <NavDropdown.Divider />

                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <div className="bg-white text-black text-center p-3">
                <h1>{props.titulo}</h1>
            </div>
            <Container>
                {props.children}
            </Container>
        </>
    )
}
