import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import './BuyerDashboard.css';
import Top from '../components/AdminBodySection/TopSection/Top';
import Footer from '../components/footer/Footer';
import Hero from '../components/hero/Hero';
import HighLights from '../components/highlighs/HighLights';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';

const BuyerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(product => !product.disabled); // 🛑 Hide disabled products
      setProducts(list);
      setFiltered(list);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filteredData = products;

    if (searchTerm)
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (category)
      filteredData = filteredData.filter(item => item.category === category);

    if (condition)
      filteredData = filteredData.filter(item => item.condition === condition);

    setFiltered(filteredData);
  }, [searchTerm, category, condition, products]);

  return (
    <div>
      <Top />
      <Navbar />
      <Hero />

      {/* 🔍 Search and Filters */}
      <Container className="my-4">
        <h2 className="mb-3">Browse Products</h2>
        <Form className="mb-4">
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <Form.Select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="">All Categories</option>
                <option value="Clothing_Accessories">Clothing</option>
                <option value="Electronics_Gadgets">Electronics</option>
                <option value="Home_Garden">Home & Garden</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select onChange={(e) => setCondition(e.target.value)} value={condition}>
                <option value="">All Conditions</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* 🧾 Filtered Products Display */}
        <Row>
          {filtered.length === 0 ? (
            <p>No matching items found.</p>
          ) : (
            filtered.map((item) => (
              <Col md={4} key={item.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>${item.price}</Card.Text>
                    <Card.Text>{item.condition}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <HighLights />
      <Footer />
    </div>
  );
};

export default BuyerDashboard;
