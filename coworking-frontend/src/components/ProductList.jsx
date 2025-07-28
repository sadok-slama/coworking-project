import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductForm from '../components/ProductForm';


const ProductList = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });
  const [loading, setLoading] = useState(false);
const showMessage = (text) => {
  setMessage(text);
  setTimeout(() => setMessage(''), 3000); // disparaît après 3s
};

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        per_page: 5,
      };

      if (search.trim()) params.search = search;
      if (minPrice !== '') params.min_price = minPrice;
      if (maxPrice !== '') params.max_price = maxPrice;
      if (sortField) params.sort = sortField;
      if (sortOrder) params.order = sortOrder;

      const res = await api.get('/products', { params });
      setProducts(res.data.data || []);
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        next_page_url: res.data.next_page_url,
        prev_page_url: res.data.prev_page_url,
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des produits', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [search, minPrice, maxPrice, sortField, sortOrder, page]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const resetFilters = () => {
    setSearch('');
    setMinPrice('');
    setMaxPrice('');
    setSortField('name');
    setSortOrder('asc');
    setPage(1);
  };
 const handleCreate = async (newProduct) => {
  try {
    await api.post('/products', newProduct);
    fetchProducts();
    showMessage("✅ Produit ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit", error);
  }
};

const handleUpdate = async (updatedProduct) => {
  try {
    await api.put(`/products/${editingProduct.id}`, updatedProduct);
    setEditingProduct(null); // désactive le mode édition
    fetchProducts();
    showMessage("✅ Produit modifié avec succès !");
  } catch (error) {
    console.error("Erreur lors de la mise à jour", error);
  }
};
const handleDelete = async (id) => {
  if (!window.confirm("Confirmer la suppression ?")) return;
  try {
    await api.delete(`/products/${id}`);
    fetchProducts();
    showMessage("🗑️ Produit supprimé avec succès !");
  } catch (error) {
    console.error("Erreur lors de la suppression", error);
  }
};


  return (
    <div className="container mt-4">
              
            <h2>📦 Liste des produits</h2>
              <ProductForm
        onSubmit={editingProduct ? handleUpdate : handleCreate}
        initialData={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}


      {/* Barre de recherche + filtres */}
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher un produit"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Prix min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Prix max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-secondary w-100" onClick={resetFilters}>
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Tableau des produits */}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('name')}>
                Nom {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('price')}>
                Prix {sortField === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
            <td>{parseFloat(product.price).toFixed(2)} DT</td>
            <td>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => setEditingProduct(product)}
              >
                🖊 Modifier
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(product.id)}
              >
                🗑 Supprimer
              </button>
            </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Aucun produit trouvé</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;