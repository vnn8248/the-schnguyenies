import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from '../styles/Navbar.module.css';

function Navigation() {
  return (
    <Navbar expand="lg" className={styles.navbar}>
      <Container>
        <Navbar.Brand href="/" className={`navbar-brand ${styles.brand}`}>We are The Schnguyenies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about" className={styles.link}>Our Story</Nav.Link>
            <Nav.Link href="https://www.zola.com/registry/biandjessica" className={styles.link} target="_blank">Registry</Nav.Link>
            <Nav.Link href="/rsvp" className={styles.link}>RSVP</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;