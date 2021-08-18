import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



export default function Navigator() {

  const { logout } = useAuth();
  const history = useHistory();


  async function handleLogout (selectedKey) {
    if (selectedKey === 'logout') {
      try {
        await logout();
        history.push('/login');
      } catch (err) {
        alert(`Log out failed: ${err.message}`);
      }
    }
  }
 

  return (
    <Navbar bg="dark" fixed="top" variant="dark" expand="sm" style={{ padding: "10px"}}>
      <Navbar.Brand href="/">Feeds</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav onSelect={(selectedKey) => handleLogout(selectedKey)}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/following">Following</Nav.Link>
          <Nav.Link eventKey="logout">Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
