import React, { useState, useRef } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Following.module.css';
import Navigator from './Navigator';


export default function Following() {

  const [loading, setLoading] = useState(false);
  const { links, addLink, deleteLink } = useAuth();
  const [error, setError] = useState('');
  const linkRef = useRef();

  // add link
  async function handleAddLink (e) {
    e.preventDefault();
    setError('');
    const l = linkRef.current.value;
    try {
      setLoading(true);
      if (links.includes(l)) {
        throw new Error('This link is already in your list');
      }
      await addLink(l);
      linkRef.current.value = '';
    } catch (e) {
      setError(`Could not add link: ${e.message}`);
    }

    setLoading(false);
  }

  // delete link
  async function handleDeleteLink (e, link) {
    e.preventDefault();
    setError('');
    try {
      await deleteLink(link);
    } catch (e) {
      setError(`Could not delete link: ${e.message}`);
    }
  }


  return (
    <div className={styles.Following}>
      <Navigator />
      <Form onSubmit={handleAddLink} className='w-100'>
        <div className={styles.AddLink}>
          <div>
            <Form.Group id="link">
              <Form.Control
                type='url'
                ref={linkRef}
                placeholder='Enter link'
                required />
            </Form.Group>
          </div>
          <Button className={styles.AddButton} disabled={loading} type="submit">Add</Button>
        </div>
      </Form>
      <div className="mt-2">
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div className={styles.Content}>
        {links.map((l, idx) => {
          return (
            <div className={styles.LinkItem} key={idx}>
              <div className={styles.LinkText}>
                {l.length < 40 ? l : l.slice(0, 35) + " ..."}
              </div>
              <Button variant='link' className={styles.DeleteButton} onClick={(e) => handleDeleteLink(e, l)}>Delete</Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
