import React, { useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  // handle log in submission
  async function handleSubmit (e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (e) {
      setError(`Sign In failed: ${e.message}`);
    }
    setLoading(false);
  }

  return (
    <div className="w-100" style={{ maxWidth: "400px", margin: "auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Feeds Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} variant="success" type="submit" className="w-100 mt-2">Log In</Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/signup" style={{ textDecoration: 'none'}}>Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

