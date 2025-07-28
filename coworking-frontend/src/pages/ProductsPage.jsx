import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/api';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des produits", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await createProduct(productData);
      }
      await loadProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce produit?")) {
      try {
        await deleteProduct(id);
        await loadProducts();
      } catch (error) {
        console.error("Erreur lors de la suppression", error);
      }
    }
  };

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestion des Produits</h2>
        <Link to="/dashboard" className="btn btn-outline-secondary">
          Retour au Dashboard
        </Link>
      </div>

      <div className="row">
            <div className="container py-4" style={{ width: '100vw' }}>

          <div className="card">
            <div className="card-header bg-success text-white">
              Liste des Produits
            </div>
            <div className="card-body">
              <ProductList 
                products={products} 
                onEdit={setEditingProduct}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;