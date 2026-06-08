import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './AdminCMS.css';

const AdminCMS = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [previewImage, setPreviewImage] = useState(null); // URL for full screen preview
    const [activeTab, setActiveTab] = useState('industrial'); // 'industrial' | 'wheels'
    const navigate = useNavigate();

    // Form states
    const [formData, setFormData] = useState({
        id: '',
        brand: '',
        category: '',
        name: '',
        original_link: '',
        image_file: null
    });

    useEffect(() => {
        checkSession();
        fetchProducts();
    }, []);

    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/admin');
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching products:', error);
        else setProducts(data);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    // Derived lists for dropdowns
    const uniqueBrands = [...new Set(products.map(p => p.brand))].sort();
    const uniqueCategories = [...new Set(products.map(p => p.category))].sort();

    const filteredProducts = products.filter(p => {
        if (activeTab === 'industrial') return p.category !== 'Car' && p.category !== 'Vehicle';
        return p.category === 'Car' || p.category === 'Vehicle';
    });

    const openCreate = () => {
        setFormData({ id: '', brand: '', category: activeTab === 'wheels' ? 'Car' : '', name: '', original_link: '', image_file: null });
        setEditingProduct(null);
        setIsCreating(true);
    };

    const openEdit = (product) => {
        setFormData({
            id: product.id,
            brand: product.brand,
            category: product.category,
            name: product.name,
            original_link: product.original_link || '',
            image_file: null
        });
        setEditingProduct(product);
        setIsCreating(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) alert('Error deleting: ' + error.message);
        else fetchProducts();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Prepare Data
        let imageUrl = editingProduct ? editingProduct.image_url : null;
        let productId = formData.id;

        // Auto-generate ID if creating new
        if (!editingProduct) {
            // Slugify: category-brand-name
            const slugParts = [formData.category, formData.brand, formData.name]
                .map(part => part.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            productId = slugParts.join('-');
        }

        // 2. Upload Image
        if (formData.image_file) {
            const file = formData.image_file;
            const fileExt = file.name.split('.').pop();
            const fileName = `${productId}-${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                alert('Image upload failed: ' + uploadError.message);
                return;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            imageUrl = publicUrl;
        }

        const productData = {
            id: productId,
            brand: formData.brand,
            category: formData.category,
            name: formData.name,
            original_link: formData.original_link,
            image_url: imageUrl
        };

        if (editingProduct) {
            const { error } = await supabase
                .from('products')
                .update(productData)
                .eq('id', editingProduct.id);
            if (error) alert('Error updating: ' + error.message);
        } else {
            const { error } = await supabase
                .from('products')
                .insert([productData]);
            if (error) alert('Error creating: ' + error.message);
        }

        setIsCreating(false);
        fetchProducts();
    };

    if (loading) return <div className="admin-loading">Loading CMS...</div>;

    return (
        <div className="admin-cms">
            <header className="cms-header">
                <h1>{activeTab === 'industrial' ? 'Product CMS' : 'Wheels CMS'}</h1>
                <div className="cms-tabs" style={{ display: 'flex', gap: '1rem', marginLeft: '2rem', flex: 1 }}>
                    <button style={{ padding: '0.5rem 1rem', background: activeTab === 'industrial' ? 'var(--color-accent-orange)' : 'transparent', color: activeTab === 'industrial' ? '#000' : '#fff', border: '1px solid var(--color-accent-orange)', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setActiveTab('industrial')}>Industrial</button>
                    <button style={{ padding: '0.5rem 1rem', background: activeTab === 'wheels' ? 'var(--color-accent-orange)' : 'transparent', color: activeTab === 'wheels' ? '#000' : '#fff', border: '1px solid var(--color-accent-orange)', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setActiveTab('wheels')}>ENE Wheels</button>
                </div>
                <div className="cms-actions">
                    <button onClick={openCreate} className="btn-primary">Add New {activeTab === 'industrial' ? 'Product' : 'Car'}</button>
                    <button onClick={handleLogout} className="btn-secondary">Logout</button>
                </div>
            </header>

            {/* Image Preview Modal */}
            {previewImage && (
                <div className="image-preview-overlay" onClick={() => setPreviewImage(null)}>
                    <div className="image-preview-content" onClick={e => e.stopPropagation()}>
                        <img src={previewImage} alt="Full Preview" />
                        <button className="close-preview" onClick={() => setPreviewImage(null)}>×</button>
                    </div>
                </div>
            )}

            {isCreating && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                        <form onSubmit={handleSubmit}>
                            {/* Brand - Datalist */}
                            <div className="form-group">
                                <label>Brand</label>
                                <input
                                    list="brands-list"
                                    type="text"
                                    value={formData.brand}
                                    onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                    required
                                    placeholder="Select or type brand..."
                                />
                                <datalist id="brands-list">
                                    {uniqueBrands.map(b => <option key={b} value={b} />)}
                                </datalist>
                            </div>

                            {/* Category - Datalist */}
                            <div className="form-group">
                                <label>Category</label>
                                <input
                                    list="categories-list"
                                    type="text"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                    placeholder="Select or type category..."
                                />
                                <datalist id="categories-list">
                                    {uniqueCategories.map(c => <option key={c} value={c} />)}
                                </datalist>
                            </div>

                            <div className="form-group">
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Original Link (Optional)</label>
                                <input
                                    type="text"
                                    value={formData.original_link}
                                    onChange={e => setFormData({ ...formData, original_link: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Product Image</label>
                                {editingProduct && editingProduct.image_url && (
                                    <div className="edit-image-preview" onClick={() => setPreviewImage(editingProduct.image_url)}>
                                        <img src={editingProduct.image_url} alt="Current" />
                                        <span>Click to preview</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setFormData({ ...formData, image_file: e.target.files[0] })}
                                />
                            </div>

                            {/* ID Field - Read Only and smaller, mostly for info */}
                            {editingProduct && (
                                <div className="form-group id-group">
                                    <label>ID</label>
                                    <input type="text" value={formData.id} disabled className="disabled-input" />
                                </div>
                            )}

                            <div className="modal-actions">
                                <button type="button" onClick={() => setIsCreating(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" className="btn-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="products-table-container">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th style={{ width: '80px' }}>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    {product.image_url && (
                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="table-img"
                                            onClick={() => setPreviewImage(product.image_url)}
                                        />
                                    )}
                                </td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button onClick={() => openEdit(product)} className="btn-icon">Edit</button>
                                        <button onClick={() => handleDelete(product.id)} className="btn-icon btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCMS;
