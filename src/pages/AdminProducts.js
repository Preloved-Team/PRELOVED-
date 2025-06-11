import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Alert, Spinner } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import PreLovedServices from '../services/PreLovedServices';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'products'));
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(items);
      } catch (err) {
        console.error(err);
        setError('Failed to load products.');
      }
      setLoading(false);
    };
    fetchProducts();
  }, [refresh]);

  const handleToggleDisable = async (product) => {
    const confirm = window.confirm(
      product.disabled
        ? "Do you want to enable this product?"
        : "Do you want to disable this product?"
    );
    if (!confirm) return;

    try {
      await PreLovedServices.disableData(product.id, !product.disabled);
      toast.success(`Product ${product.disabled ? "enabled" : "disabled"} successfully!`);
      setRefresh(!refresh);
    } catch (err) {
      console.error("Disable Error:", err);
      toast.error("Action failed. Try again.");
    }
  };

  return (
    <Container className="mt-4">
      <h2>Admin Products Control</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Condition</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.condition}</td>
                <td>
                  {product.disabled ? (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>DISABLED</span>
                  ) : (
                    "Active"
                  )}
                </td>
                <td>
                  <Button
                    variant={product.disabled ? "success" : "danger"}
                    onClick={() => handleToggleDisable(product)}
                  >
                    {product.disabled ? "Enable" : "Disable"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default AdminProducts;
