import React, { useRef, useState } from 'react';
import { Card, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';


export default function Signup() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const history = useHistory();


  // handle sign up submission
  async function handleSubmit (e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push('/');
    } catch (e) {
      setError(`Sign Up failed: ${e.message}`);
    }
    setLoading(false);
  }


  return (
    <div className="w-100" style={{ maxWidth:"400px",  margin: "auto" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Feeds Sign Up</h2>
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
            <Form.Group id="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmationRef} required />
            </Form.Group>

            <Button disabled={loading} variant="success" type="submit" className="w-100 mt-2">Sign Up</Button>
          </Form>
          <div className="w-100 text-center mt-2">
            Have an account? <Link to="/login" style={{ textDecoration: 'none'}}>Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}
