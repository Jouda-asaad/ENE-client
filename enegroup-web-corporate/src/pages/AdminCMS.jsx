import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './AdminCMS.css';

const SortableGalleryItem = ({ img, editingGalleryImage, editGalleryTitle, setEditGalleryTitle, handleEditGalleryImage, setEditingGalleryImage, startEditGalleryImage, handleDeleteGalleryImage, setPreviewImage }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: img.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <li ref={setNodeRef} style={style} className="manage-list-item">
            <span {...attributes} {...listeners} className="material-symbols-outlined drag-handle" style={{ cursor: 'grab', marginRight: '0.5rem', color: '#888' }}>
                drag_indicator
            </span>
            <img src={img.src} alt={img.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setPreviewImage(img.src)} />
            {editingGalleryImage?.id === img.id ? (
                <form onSubmit={handleEditGalleryImage} className="inline-edit-form" style={{ marginLeft: '1rem', flex: 1, display: 'flex', gap: '0.25rem' }}>
                    <input
                        type="text"
                        value={editGalleryTitle}
                        onChange={e => setEditGalleryTitle(e.target.value)}
                        autoFocus
                        required
                        style={{ flex: 1, padding: '0.25rem' }}
                    />
                    <button type="submit" className="btn-icon-sm" title="Save">
                        <span className="material-symbols-outlined">check</span>
                    </button>
                    <button type="button" className="btn-icon-sm" onClick={() => setEditingGalleryImage(null)} title="Cancel">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </form>
            ) : (
                <>
                    <span className="item-name" style={{ marginLeft: '1rem', flex: 1 }}>{img.title}</span>
                    <div style={{ display: 'flex', gap: '0.25rem', marginLeft: 'auto' }}>
                        <button className="btn-icon-sm" onClick={() => startEditGalleryImage(img)} title="Edit">
                            <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="btn-icon-sm btn-danger-sm" onClick={() => handleDeleteGalleryImage(img.id)} title="Delete">
                            <span className="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </>
            )}
        </li>
    );
};

const AdminCMS = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [services, setServices] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isCreatingService, setIsCreatingService] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [activeTab, setActiveTab] = useState('industrial'); // 'industrial' | 'wheels'
    const [activePanel, setActivePanel] = useState('products'); // 'products' | 'manage' | 'services' | 'content' | 'gallery'
    const navigate = useNavigate();

    // Category/Brand management states
    const [newCategoryName, setNewCategoryName] = useState('');
    const [editingCategory, setEditingCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [newBrandName, setNewBrandName] = useState('');
    const [selectedManageCategory, setSelectedManageCategory] = useState(null);

    // Gallery management states
    const [newGallerySrc, setNewGallerySrc] = useState('');
    const [newGalleryTitle, setNewGalleryTitle] = useState('');
    const [newGalleryFile, setNewGalleryFile] = useState(null);
    const [editingGalleryImage, setEditingGalleryImage] = useState(null);
    const [editGalleryTitle, setEditGalleryTitle] = useState('');

    // Services/Content management states
    const [editingService, setEditingService] = useState(null);
    const [serviceForm, setServiceForm] = useState({
        title: '', description: '', sort_order: 0, is_active: true,
        image_url: '', partner_name: '', partner_logo_url: '', sub_services: '', gallery_urls: '',
        image_file: null, partner_logo_file: null, gallery_files: []
    });
    const [servicePreviewUrl, setServicePreviewUrl] = useState(null);
    const [partnerLogoPreviewUrl, setPartnerLogoPreviewUrl] = useState(null);

    // Form states
    const [formData, setFormData] = useState({
        id: '',
        brand: '',
        category: '',
        name: '',
        description: '',
        original_link: '',
        image_file: null
    });
    const [filePreviewUrl, setFilePreviewUrl] = useState(null);
    const [brandLogoPreview, setBrandLogoPreview] = useState(null);

    useEffect(() => {
        checkSession();
        fetchAll();
    }, []);

    const checkSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/admin');
        }
    };

    const fetchAll = async () => {
        setLoading(true);
        await Promise.all([fetchProducts(), fetchCategories(), fetchBrands(), fetchServices(), fetchGalleryImages()]);
        setLoading(false);
    };

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) console.error('Error fetching products:', error);
        else setProducts(data);
    };

    const fetchCategories = async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name');
        if (error) console.error('Error fetching categories:', error);
        else setCategories(data);
    };

    const fetchBrands = async () => {
        const { data, error } = await supabase
            .from('brands')
            .select('*, categories(name)')
            .order('name');
        if (error) console.error('Error fetching brands:', error);
        else setBrands(data);
    };

    const fetchServices = async () => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .order('sort_order');
        if (error) console.error('Error fetching services:', error);
        else setServices(data);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin');
    };

    const fetchGalleryImages = async () => {
        const { data, error } = await supabase
            .from('gallery_images')
            .select('*')
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: true });
        if (error) console.error('Error fetching gallery images:', error);
        else setGalleryImages(data);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEndGallery = async (event) => {
        const { active, over } = event;
        
        if (over && active.id !== over.id) {
            setGalleryImages((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                
                // Update sort_order in database for all items
                updateGalleryOrder(newItems);
                
                return newItems;
            });
        }
    };

    const updateGalleryOrder = async (items) => {
        const updates = items.map((item, index) => {
            return supabase.from('gallery_images').update({ sort_order: index }).eq('id', item.id);
        });
        await Promise.all(updates);
    };

    // --- Gallery Management ---
    const handleAddGalleryImage = async (e) => {
        e.preventDefault();
        if ((!newGallerySrc.trim() && !newGalleryFile) || !newGalleryTitle.trim()) return;

        let imageUrl = newGallerySrc.trim();

        if (newGalleryFile) {
            const file = newGalleryFile;
            const fileExt = file.name.split('.').pop();
            const fileName = `gallery-${Date.now()}.${fileExt}`;
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

        const maxSortOrder = galleryImages.length > 0 ? Math.max(...galleryImages.map(i => i.sort_order || 0)) : 0;
        const { error } = await supabase.from('gallery_images').insert([{ src: imageUrl, title: newGalleryTitle.trim(), sort_order: maxSortOrder + 1 }]);
        if (error) alert('Error adding gallery image: ' + error.message);
        else {
            setNewGallerySrc('');
            setNewGalleryTitle('');
            setNewGalleryFile(null);
            fetchGalleryImages();
        }
    };

    const handleDeleteGalleryImage = async (id) => {
        if (!window.confirm('Delete this gallery image?')) return;
        const { error } = await supabase.from('gallery_images').delete().eq('id', id);
        if (error) alert('Error deleting gallery image: ' + error.message);
        else fetchGalleryImages();
    };

    const handleEditGalleryImage = async (e) => {
        e.preventDefault();
        if (!editGalleryTitle.trim()) return;
        const { error } = await supabase
            .from('gallery_images')
            .update({ title: editGalleryTitle.trim() })
            .eq('id', editingGalleryImage.id);
        if (error) alert('Error updating gallery image: ' + error.message);
        else {
            setEditingGalleryImage(null);
            setEditGalleryTitle('');
            fetchGalleryImages();
        }
    };

    const startEditGalleryImage = (img) => {
        setEditingGalleryImage(img);
        setEditGalleryTitle(img.title);
    };

    // --- Category Management ---
    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        const { error } = await supabase.from('categories').insert([{ name: newCategoryName.trim() }]);
        if (error) alert('Error adding category: ' + error.message);
        else {
            setNewCategoryName('');
            fetchCategories();
        }
    };

    const handleEditCategory = async (e) => {
        e.preventDefault();
        if (!editCategoryName.trim()) return;
        const { error } = await supabase
            .from('categories')
            .update({ name: editCategoryName.trim() })
            .eq('id', editingCategory.id);
        if (error) alert('Error updating category: ' + error.message);
        else {
            setEditingCategory(null);
            setEditCategoryName('');
            fetchCategories();
            fetchBrands();
        }
    };

    const startEditCategory = (cat) => {
        setEditingCategory(cat);
        setEditCategoryName(cat.name);
    };

    const handleDeleteCategory = async (catId) => {
        if (!window.confirm('Delete this category? Note: Make sure no brands or products are depending on it.')) return;
        const { error } = await supabase.from('categories').delete().eq('id', catId);
        if (error) alert('Error deleting category: ' + error.message);
        else {
            if (selectedManageCategory && selectedManageCategory.id === catId) {
                setSelectedManageCategory(null);
            }
            fetchCategories();
        }
    };

    // --- Brand Management ---
    const handleAddBrand = async (e) => {
        e.preventDefault();
        if (!newBrandName.trim()) return;
        const { error } = await supabase.from('brands').insert([{
            name: newBrandName.trim(),
            category_id: selectedManageCategory ? selectedManageCategory.id : null
        }]);
        if (error) alert('Error adding brand: ' + error.message);
        else {
            setNewBrandName('');
            fetchBrands();
        }
    };

    const handleDeleteBrand = async (brandId) => {
        if (!window.confirm('Delete this brand?')) return;
        const { error } = await supabase.from('brands').delete().eq('id', brandId);
        if (error) alert('Error deleting brand: ' + error.message);
        else fetchBrands();
    };

    // Brands filtered for the selected management category (show all, deduplicated, if none selected)
    const manageCategoryBrands = selectedManageCategory
        ? brands.filter(b => b.category_id === selectedManageCategory.id)
        : brands.filter((b, i, arr) => arr.findIndex(x => x.name === b.name) === i);

    // --- Product CRUD ---
    const filteredProducts = products.filter(p => {
        const isWheelCategory = ['Car', 'Cars', 'Vehicle', 'Vehicles'].includes(p.category);
        if (activeTab === 'industrial') return !isWheelCategory;
        return isWheelCategory;
    });

    // Brands filtered for the selected form category
    const formCategoryObj = categories.find(c => c.name === formData.category);
    const availableBrands = formCategoryObj
        ? brands.filter(b => b.category_id === formCategoryObj.id)
        : [];

    const openCreate = () => {
        const wheelCategoryMatch = categories.find(c => ['Car', 'Cars', 'Vehicle', 'Vehicles'].includes(c.name));
        const defaultCategory = activeTab === 'wheels' ? (wheelCategoryMatch ? wheelCategoryMatch.name : 'Cars') : '';
        setFormData({ id: '', brand: '', category: defaultCategory, name: '', description: '', original_link: '', image_file: null });
        setFilePreviewUrl(null);
        setEditingProduct(null);
        setIsCreating(true);
    };

    const openEdit = (product) => {
        setFormData({
            id: product.id,
            brand: product.brand,
            category: product.category,
            name: product.name,
            description: product.description || '',
            original_link: product.original_link || '',
            image_file: null
        });
        setFilePreviewUrl(null);
        setEditingProduct(product);
        setIsCreating(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) alert('Error deleting: ' + error.message);
        else fetchProducts();
    };

    const handleDeleteService = async (id) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) alert('Error deleting: ' + error.message);
        else fetchServices();
    };

    const handleServiceSubmit = async (e) => {
        e.preventDefault();
        let imageUrl = serviceForm.image_url;
        let partnerLogoUrl = serviceForm.partner_logo_url;
        
        let galleryUrls = serviceForm.gallery_urls ? (typeof serviceForm.gallery_urls === 'string' ? serviceForm.gallery_urls.split('\n').filter(s => s.trim()) : serviceForm.gallery_urls) : [];

        const uploadFile = async (file, prefix) => {
            const fileExt = file.name.split('.').pop();
            const fileName = `service-${prefix}-${Date.now()}.${fileExt}`;
            const filePath = `public/${fileName}`;
            const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, file);
            if (uploadError) throw uploadError;
            const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(filePath);
            return publicUrl;
        };

        try {
            if (serviceForm.image_file) {
                imageUrl = await uploadFile(serviceForm.image_file, 'main');
            }
            if (serviceForm.partner_logo_file) {
                partnerLogoUrl = await uploadFile(serviceForm.partner_logo_file, 'partner');
            }
            if (serviceForm.gallery_files && serviceForm.gallery_files.length > 0) {
                for (let i = 0; i < serviceForm.gallery_files.length; i++) {
                    const url = await uploadFile(serviceForm.gallery_files[i], `gallery-${i}`);
                    galleryUrls.push(url);
                }
            }

            const subArr = serviceForm.sub_services ? (typeof serviceForm.sub_services === 'string' ? serviceForm.sub_services.split('\n').filter(s => s.trim()) : serviceForm.sub_services) : [];

            const serviceData = {
                title: serviceForm.title,
                description: serviceForm.description,
                sort_order: parseInt(serviceForm.sort_order),
                is_active: serviceForm.is_active,
                image_url: imageUrl,
                partner_name: serviceForm.partner_name,
                partner_logo_url: partnerLogoUrl,
                sub_services: subArr,
                gallery_urls: galleryUrls
            };

            if (editingService) {
                const { error } = await supabase.from('services').update(serviceData).eq('id', editingService.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('services').insert([serviceData]);
                if (error) throw error;
            }

            setIsCreatingService(false);
            setEditingService(null);
            fetchServices();
        } catch (error) {
            alert('Error saving service: ' + error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = editingProduct ? editingProduct.image_url : null;
        let productId = formData.id;

        if (!editingProduct) {
            const slugParts = [formData.category, formData.brand, formData.name]
                .map(part => part.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
            productId = slugParts.join('-');
        }

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
            description: formData.description,
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
                <div className="cms-header-left">
                    <h1>ENE Admin</h1>
                    <nav className="cms-nav">
                        <button
                            className={`cms-nav-btn ${activePanel === 'products' ? 'active' : ''}`}
                            onClick={() => setActivePanel('products')}
                        >
                            <span className="material-symbols-outlined">inventory_2</span>
                            Products
                        </button>
                        <button
                            className={`cms-nav-btn ${activePanel === 'manage' ? 'active' : ''}`}
                            onClick={() => setActivePanel('manage')}
                        >
                            <span className="material-symbols-outlined">category</span>
                            Categories & Brands
                        </button>
                        <button
                            className={`cms-nav-btn ${activePanel === 'services' ? 'active' : ''}`}
                            onClick={() => setActivePanel('services')}
                        >
                            <span className="material-symbols-outlined">design_services</span>
                            Services
                        </button>
                        <button
                            className={`cms-nav-btn ${activePanel === 'gallery' ? 'active' : ''}`}
                            onClick={() => setActivePanel('gallery')}
                        >
                            <span className="material-symbols-outlined">photo_library</span>
                            Gallery
                        </button>
                    </nav>
                </div>
                <div className="cms-actions">
                    <button onClick={handleLogout} className="btn-secondary">
                        <span className="material-symbols-outlined" style={{ fontSize: '1rem', marginRight: '0.3rem' }}>logout</span>
                        Logout
                    </button>
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

            {/* ===== PRODUCTS PANEL ===== */}
            {activePanel === 'products' && (
                <>
                    <div className="panel-toolbar">
                        <div className="cms-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'industrial' ? 'active' : ''}`}
                                onClick={() => setActiveTab('industrial')}
                            >Industrial</button>
                            <button
                                className={`tab-btn ${activeTab === 'wheels' ? 'active' : ''}`}
                                onClick={() => setActiveTab('wheels')}
                            >ENE Wheels</button>
                        </div>
                        <button onClick={openCreate} className="btn-primary">
                            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>add</span>
                            Add {activeTab === 'industrial' ? 'Product' : 'Car'}
                        </button>
                    </div>

                    {/* Product Form Modal */}
                    {isCreating && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
                                <form onSubmit={handleSubmit}>
                                    {/* Category - Dropdown */}
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value, brand: '' })}
                                            required
                                        >
                                            <option value="">Select category...</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.name}>{c.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Brand - Dropdown (filtered by category) */}
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <select
                                            value={formData.brand}
                                            onChange={e => setFormData({ ...formData, brand: e.target.value })}
                                            required
                                            disabled={!formData.category}
                                        >
                                            <option value="">{formData.category ? 'Select brand...' : 'Select a category first'}</option>
                                            {availableBrands.map(b => (
                                                <option key={b.id} value={b.name}>{b.name}</option>
                                            ))}
                                        </select>
                                        {formData.category && availableBrands.length === 0 && (
                                            <span className="form-hint">No brands in this category. Add one in Categories & Brands.</span>
                                        )}
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
                                        <label>Description (Optional)</label>
                                        <textarea
                                            rows="3"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Product description..."
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
                                            onChange={e => {
                                                const file = e.target.files[0];
                                                setFormData({ ...formData, image_file: file });
                                                if (file) {
                                                    setFilePreviewUrl(URL.createObjectURL(file));
                                                } else {
                                                    setFilePreviewUrl(null);
                                                }
                                            }}
                                        />
                                        {filePreviewUrl && (
                                            <div className="file-preview">
                                                <img src={filePreviewUrl} alt="Preview" />
                                                <span className="file-preview-label">Selected image preview</span>
                                            </div>
                                        )}
                                    </div>

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
                                {filteredProducts.length === 0 && (
                                    <tr><td colSpan="5" className="empty-state">No products yet. Click "Add" to create one.</td></tr>
                                )}
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
                                        <td><span className="category-badge">{product.category}</span></td>
                                        <td>
                                            <div className="action-buttons">
                                                <button onClick={() => openEdit(product)} className="btn-icon" title="Edit">
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button onClick={() => handleDelete(product.id)} className="btn-icon btn-danger" title="Delete">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ===== CATEGORIES & BRANDS PANEL ===== */}
            {activePanel === 'manage' && (
                <div className="manage-panel">
                    <div className="manage-grid">
                        {/* Left: Categories */}
                        <div className="manage-card">
                            <div className="manage-card-header">
                                <h3>
                                    <span className="material-symbols-outlined">category</span>
                                    Categories
                                </h3>
                            </div>
                            <form className="manage-add-form" onSubmit={handleAddCategory}>
                                <input
                                    type="text"
                                    placeholder="New category name..."
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn-primary btn-sm">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </form>
                            <ul className="manage-list">
                                {categories.map(cat => (
                                    <li
                                        key={cat.id}
                                        className={`manage-list-item ${selectedManageCategory?.id === cat.id ? 'selected' : ''}`}
                                        onClick={() => { setSelectedManageCategory(prev => prev?.id === cat.id ? null : cat); setEditingCategory(null); }}
                                    >
                                        {editingCategory?.id === cat.id ? (
                                            <form onSubmit={handleEditCategory} className="inline-edit-form" onClick={e => e.stopPropagation()}>
                                                <input
                                                    type="text"
                                                    value={editCategoryName}
                                                    onChange={e => setEditCategoryName(e.target.value)}
                                                    autoFocus
                                                    required
                                                />
                                                <button type="submit" className="btn-icon-sm" title="Save">
                                                    <span className="material-symbols-outlined">check</span>
                                                </button>
                                                <button type="button" className="btn-icon-sm" onClick={(e) => { e.stopPropagation(); setEditingCategory(null); }} title="Cancel">
                                                    <span className="material-symbols-outlined">close</span>
                                                </button>
                                            </form>
                                        ) : (
                                            <>
                                                <span className="item-name">{cat.name}</span>
                                                <span className="item-count">{brands.filter(b => b.category_id === cat.id).length} brands</span>
                                                <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                    <button className="btn-icon-sm" onClick={(e) => { e.stopPropagation(); startEditCategory(cat); }} title="Edit">
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button className="btn-icon-sm btn-danger-sm" onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat.id); }} title="Delete">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                                {categories.length === 0 && (
                                    <li className="empty-list">No categories yet</li>
                                )}
                            </ul>
                        </div>

                        {/* Right: Brands in selected category */}
                        <div className="manage-card">
                            <div className="manage-card-header">
                                <h3>
                                    <span className="material-symbols-outlined">label</span>
                                    {selectedManageCategory
                                        ? `Brands in "${selectedManageCategory.name}"`
                                        : 'All Brands'}
                                </h3>
                            </div>
                            <form className="manage-add-form" onSubmit={handleAddBrand}>
                                <input
                                    type="text"
                                    placeholder={selectedManageCategory ? `Add brand to "${selectedManageCategory.name}"...` : "Add new brand..."}
                                    value={newBrandName}
                                    onChange={e => setNewBrandName(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn-primary btn-sm">
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </form>
                            <ul className="manage-list">
                                {manageCategoryBrands.length > 0 ? (
                                    manageCategoryBrands.map(brand => (
                                        <li key={brand.id} className="manage-list-item brand-list-manage-item">
                                            <div className="brand-manage-info">
                                                {brand.logo_url ? (
                                                    <img 
                                                        src={brand.logo_url} 
                                                        alt={brand.name} 
                                                        className="brand-manage-logo" 
                                                        onClick={() => setBrandLogoPreview(brand.logo_url)}
                                                        style={{ cursor: 'pointer' }}
                                                        title="Click to preview logo"
                                                    />
                                                ) : (
                                                    <span className="material-symbols-outlined brand-no-logo">image</span>
                                                )}
                                                <span className="item-name">{brand.name}</span>
                                            </div>
                                            <div className="brand-manage-actions">
                                                <label className="btn-icon-sm" title="Upload logo">
                                                    <span className="material-symbols-outlined">upload</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        style={{ display: 'none' }}
                                                    onChange={async (e) => {
                                                        const file = e.target.files[0];
                                                        if (!file) return;
                                                        const fileExt = file.name.split('.').pop();
                                                        const fileName = `brand-${brand.id}.${fileExt}`;
                                                        const filePath = `public/${fileName}`;
                                                        const { error: uploadError } = await supabase.storage
                                                            .from('product-images')
                                                            .upload(filePath, file, { upsert: true });
                                                        if (uploadError) {
                                                            alert('Upload failed: ' + uploadError.message);
                                                            return;
                                                        }
                                                        const { data: { publicUrl } } = supabase.storage
                                                            .from('product-images')
                                                            .getPublicUrl(filePath);
                                                        await supabase.from('brands').update({ logo_url: publicUrl }).eq('id', brand.id);
                                                        fetchBrands();
                                                    }}
                                                    />
                                                </label>
                                                <button
                                                    className="btn-icon-sm btn-danger-sm"
                                                    onClick={() => handleDeleteBrand(brand.id)}
                                                    title="Delete brand"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li className="empty-list">No brands yet</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
            {/* Brand Logo Preview Modal */}
            {brandLogoPreview && (
                <div className="modal-overlay" onClick={() => setBrandLogoPreview(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                        <div className="modal-header">
                            <h2>Logo Preview</h2>
                            <button className="btn-icon" onClick={() => setBrandLogoPreview(null)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="modal-body" style={{ textAlign: 'center', padding: '2rem', background: '#f8f9fa', borderRadius: '0 0 12px 12px' }}>
                            <img src={brandLogoPreview} alt="Brand Logo Preview" style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                        </div>
                    </div>
                </div>
            )}

            {/* ===== SERVICES PANEL ===== */}
            {activePanel === 'services' && (
                <div className="manage-panel">
                    <div className="panel-toolbar">
                        <h2>Manage Services</h2>
                        <button className="btn-primary" onClick={() => {
                            setServiceForm({
                                title: '', description: '', sort_order: services.length + 1, is_active: true,
                                image_url: '', partner_name: '', partner_logo_url: '', sub_services: '', gallery_urls: '',
                                image_file: null, partner_logo_file: null, gallery_files: []
                            });
                            setServicePreviewUrl(null);
                            setPartnerLogoPreviewUrl(null);
                            setEditingService(null);
                            setIsCreatingService(true);
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>add</span>
                            Add Service
                        </button>
                    </div>

                    {(editingService || isCreatingService) && (
                        <div className="modal-overlay">
                            <div className="modal-content" style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                                <h2>{editingService ? 'Edit Service' : 'Add Service'}</h2>
                                <form onSubmit={handleServiceSubmit}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input type="text" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea rows="3" value={serviceForm.description} onChange={e => setServiceForm({...serviceForm, description: e.target.value})} />
                                    </div>
                                    <div className="form-group" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ flex: 1 }}>
                                            <label>Sort Order</label>
                                            <input type="number" value={serviceForm.sort_order} onChange={e => setServiceForm({...serviceForm, sort_order: e.target.value})} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem', cursor: 'pointer' }}>
                                                <input type="checkbox" checked={serviceForm.is_active} onChange={e => setServiceForm({...serviceForm, is_active: e.target.checked})} style={{ width: 'auto' }} />
                                                Is Active
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Main Image</label>
                                        {(servicePreviewUrl || serviceForm.image_url) && (
                                            <div className="edit-image-preview" onClick={() => setPreviewImage(servicePreviewUrl || serviceForm.image_url)}>
                                                <img src={servicePreviewUrl || serviceForm.image_url} alt="Main Image Preview" />
                                                <span>Click to preview</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={e => {
                                            const file = e.target.files[0];
                                            setServiceForm({...serviceForm, image_file: file});
                                            setServicePreviewUrl(file ? URL.createObjectURL(file) : null);
                                        }} />
                                        <div className="form-hint" style={{ marginTop: '0.5rem' }}>Or provide an image URL directly:</div>
                                        <input type="text" value={serviceForm.image_url} onChange={e => setServiceForm({...serviceForm, image_url: e.target.value})} placeholder="https://..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Partner Name</label>
                                        <input type="text" value={serviceForm.partner_name} onChange={e => setServiceForm({...serviceForm, partner_name: e.target.value})} />
                                    </div>
                                    <div className="form-group">
                                        <label>Partner Logo</label>
                                        {(partnerLogoPreviewUrl || serviceForm.partner_logo_url) && (
                                            <div className="edit-image-preview" onClick={() => setPreviewImage(partnerLogoPreviewUrl || serviceForm.partner_logo_url)}>
                                                <img src={partnerLogoPreviewUrl || serviceForm.partner_logo_url} alt="Partner Logo Preview" style={{ objectFit: 'contain' }} />
                                                <span>Click to preview</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={e => {
                                            const file = e.target.files[0];
                                            setServiceForm({...serviceForm, partner_logo_file: file});
                                            setPartnerLogoPreviewUrl(file ? URL.createObjectURL(file) : null);
                                        }} />
                                        <div className="form-hint" style={{ marginTop: '0.5rem' }}>Or provide a logo URL directly:</div>
                                        <input type="text" value={serviceForm.partner_logo_url} onChange={e => setServiceForm({...serviceForm, partner_logo_url: e.target.value})} placeholder="https://..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Sub Services (One per line)</label>
                                        <textarea rows="4" value={serviceForm.sub_services} onChange={e => setServiceForm({...serviceForm, sub_services: e.target.value})} placeholder="e.g. Pre-commissioning&#10;Overhaul&#10;Testing" />
                                    </div>
                                    <div className="form-group">
                                        <label>Gallery Images</label>
                                        {serviceForm.gallery_files && serviceForm.gallery_files.length > 0 && (
                                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                                                {Array.from(serviceForm.gallery_files).map((f, i) => (
                                                    <div key={i} style={{ width: '50px', height: '50px', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                                                        <img src={URL.createObjectURL(f)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Gallery Preview" />
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" multiple onChange={e => {
                                            setServiceForm({...serviceForm, gallery_files: e.target.files});
                                        }} />
                                        <div className="form-hint" style={{ marginTop: '0.5rem' }}>Or provide image URLs directly (One per line):</div>
                                        <textarea rows="4" value={serviceForm.gallery_urls} onChange={e => setServiceForm({...serviceForm, gallery_urls: e.target.value})} placeholder="https://...&#10;https://..." />
                                    </div>
                                    <div className="modal-actions">
                                        <button type="button" onClick={() => { setIsCreatingService(false); setEditingService(null); }} className="btn-secondary">Cancel</button>
                                        <button type="submit" className="btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="products-table-container">
                        <table className="products-table">
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map(service => (
                                    <tr key={service.id}>
                                        <td>{service.sort_order}</td>
                                        <td>{service.title}</td>
                                        <td>{service.is_active ? 'Active' : 'Inactive'}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" title="Edit Service" onClick={() => {
                                                    setServiceForm({
                                                        title: service.title || '',
                                                        description: service.description || '',
                                                        sort_order: service.sort_order || 0,
                                                        is_active: service.is_active,
                                                        image_url: service.image_url || '',
                                                        partner_name: service.partner_name || '',
                                                        partner_logo_url: service.partner_logo_url || '',
                                                        sub_services: (service.sub_services || []).join('\n'),
                                                        gallery_urls: (service.gallery_urls || []).join('\n'),
                                                        image_file: null,
                                                        partner_logo_file: null,
                                                        gallery_files: []
                                                    });
                                                    setServicePreviewUrl(null);
                                                    setPartnerLogoPreviewUrl(null);
                                                    setEditingService(service);
                                                    setIsCreatingService(false);
                                                }}>
                                                    <span className="material-symbols-outlined">edit</span>
                                                </button>
                                                <button onClick={() => handleDeleteService(service.id)} className="btn-icon btn-danger" title="Delete">
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ===== GALLERY PANEL ===== */}
            {activePanel === 'gallery' && (
                <div className="manage-panel">
                    <div className="manage-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="manage-card">
                            <div className="manage-card-header">
                                <h3>
                                    <span className="material-symbols-outlined">photo_library</span>
                                    Gallery Images
                                </h3>
                            </div>
                            <form className="manage-add-form" onSubmit={handleAddGalleryImage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={e => {
                                            setNewGalleryFile(e.target.files[0]);
                                            if (e.target.files[0]) setNewGallerySrc('');
                                        }}
                                        style={{ flex: 1 }}
                                    />
                                    <span>OR</span>
                                    <input
                                        type="text"
                                        placeholder="Image URL or Path (e.g. /assets/...)"
                                        value={newGallerySrc}
                                        onChange={e => setNewGallerySrc(e.target.value)}
                                        disabled={!!newGalleryFile}
                                        style={{ flex: 1 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <input
                                        type="text"
                                        placeholder="Image Title"
                                        value={newGalleryTitle}
                                        onChange={e => setNewGalleryTitle(e.target.value)}
                                        required
                                        style={{ flex: 1 }}
                                    />
                                    <button type="submit" className="btn-primary btn-sm">
                                        <span className="material-symbols-outlined">add</span>
                                        Add Image
                                    </button>
                                </div>
                            </form>
                            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEndGallery}>
                                <SortableContext items={galleryImages.map(i => i.id)} strategy={verticalListSortingStrategy}>
                                    <ul className="manage-list">
                                        {galleryImages.map(img => (
                                            <SortableGalleryItem
                                                key={img.id}
                                                img={img}
                                                editingGalleryImage={editingGalleryImage}
                                                editGalleryTitle={editGalleryTitle}
                                                setEditGalleryTitle={setEditGalleryTitle}
                                                handleEditGalleryImage={handleEditGalleryImage}
                                                setEditingGalleryImage={setEditingGalleryImage}
                                                startEditGalleryImage={startEditGalleryImage}
                                                handleDeleteGalleryImage={handleDeleteGalleryImage}
                                                setPreviewImage={setPreviewImage}
                                            />
                                        ))}
                                        {galleryImages.length === 0 && (
                                            <li className="empty-list">No gallery images yet</li>
                                        )}
                                    </ul>
                                </SortableContext>
                            </DndContext>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminCMS;
