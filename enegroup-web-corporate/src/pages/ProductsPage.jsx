import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import './ProductsPage.css';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeCategory, setActiveCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null); // For Modal
    const [products, setProducts] = useState([]);
    const [brandShowcaseData, setBrandShowcaseData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
        fetchBrandsShowcase();
    }, []);

    // Fetch brands for showcase (flat list, deduplicated by name)
    const fetchBrandsShowcase = async () => {
        const { data, error } = await supabase
            .from('brands')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching brands:', error);
            return;
        }

        // Deduplicate by brand name (same brand may appear in multiple categories)
        const seen = new Set();
        const uniqueBrands = data.filter(brand => {
            if (seen.has(brand.name)) return false;
            seen.add(brand.name);
            return true;
        });

        setBrandShowcaseData(uniqueBrands);
    };

    // Check if we are in "Brand Showcase" mode
    const showBrandShowcase = activeFilter === 'All' && !searchQuery && !activeCategory;

    useEffect(() => {
        const brandParam = searchParams.get('brand');
        if (brandParam) {
            setActiveFilter(brandParam);
        } else {
            setActiveFilter('All');
        }
    }, [searchParams]);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const closeProductModal = () => {
        setSelectedProduct(null);
    };

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    };

    // Calculate derived state from 'products' state
    const brands = ['All', ...new Set(products.map(item => item.brand))];
    const categoriesList = [...new Set(products.map(item => item.category))].filter(Boolean).sort();

    const filteredProducts = products.map(p => ({
        ...p,
        image: p.image_url,
        link: p.original_link
    })).filter(product => {
        let matchesBrand = true;

        if (activeFilter !== 'All') {
            // Handle multi-brand filters (e.g. "Alco, Sabre")
            const targetBrands = activeFilter.split(',').map(b => b.trim());
            // Check if the product's brand is in the target list
            matchesBrand = targetBrands.includes(product.brand);
        }

        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase());
            
        const matchesCat = activeCategory ? product.category === activeCategory : true;

        return matchesBrand && matchesSearch && matchesCat;
    });

    if (loading) {
        return <div className="products-loading">Loading products...</div>;
    }

    return (
        <div className="products-page">
            {/* Hero Section */}
            <section className="products-hero">
                <div className="products-hero-content">
                    <div className="accent-bar"></div>
                    <h1 className="products-hero-title">Our Products</h1>
                    <p className="products-hero-subtitle">
                        World-class valves, safety systems, and instrumentation for mission-critical applications.
                    </p>
                </div>
            </section>

            {/* Filter & Search Section */}
            <section className="filter-section">
                <div className="filter-container">
                    {/* Search Bar */}
                    <div className="search-wrapper">
                        <span className="material-symbols-outlined search-icon">search</span>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setActiveCategory(''); }}
                        />
                    </div>

                    {/* Brand Filters */}
                    <div className="brand-filters">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                className={`filter-btn ${activeFilter === brand ? 'active' : ''}`}
                                onClick={() => { setActiveFilter(brand); setActiveCategory(''); }}
                            >
                                {brand === 'Alco, Sabre' ? 'Alco & Sabre' : brand}  {/* Simple clean up for display logic */}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <section className="main-content-section">
                <div className="brand-showcase-layout">
                    {/* Category Sidebar (Persists across views) */}
                    <aside className="category-sidebar">
                        {/* Desktop List View */}
                        <div className="sidebar-desktop">
                            <h3 className="category-sidebar-title">Categories</h3>
                            <ul className="category-sidebar-list">
                                <li 
                                    className={`category-sidebar-item ${!activeCategory && showBrandShowcase ? 'active' : ''}`}
                                    onClick={() => { setActiveCategory(''); setActiveFilter('All'); setSearchQuery(''); }}
                                >
                                    <span className="material-symbols-outlined">grid_view</span>
                                    All Categories
                                </li>
                                {categoriesList.map(cat => (
                                    <li 
                                        key={cat} 
                                        className={`category-sidebar-item ${activeCategory === cat ? 'active' : ''}`}
                                        onClick={() => { setActiveCategory(cat); setActiveFilter('All'); setSearchQuery(''); }}
                                    >
                                        <span className="material-symbols-outlined">chevron_right</span>
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Mobile Dropdown View */}
                        <div className="sidebar-mobile">
                            <select 
                                className="mobile-category-select"
                                value={activeCategory}
                                onChange={(e) => {
                                    const cat = e.target.value;
                                    setActiveCategory(cat);
                                    setActiveFilter('All');
                                    setSearchQuery('');
                                }}
                            >
                                <option value="">All Categories</option>
                                {categoriesList.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </aside>

                    {/* Content Area (Switches between Brand Showcase and Product Grid) */}
                    <div className="brand-showcase-container">
                        {showBrandShowcase ? (
                            <>
                                <h2 className="section-heading">Browse our Brands</h2>
                                <div className="brand-grid">
                                    {brandShowcaseData.map((brand) => (
                                        <div
                                            key={brand.id}
                                            className="brand-card"
                                            onClick={() => { setActiveFilter(brand.name); setActiveCategory(''); }}
                                        >
                                            <div className="brand-logo-container">
                                                {brand.logo_url ? (
                                                    <img src={brand.logo_url} alt={brand.name} loading="lazy" />
                                                ) : (
                                                    <span className="material-symbols-outlined brand-placeholder-icon">category</span>
                                                )}
                                            </div>
                                            <div className="brand-info">
                                                <h3 className="brand-category-title">{brand.name}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="products-grid-wrapper">
                                <h2 className="section-heading" style={{ marginBottom: '2rem' }}>
                                    {activeCategory ? `Products: ${activeCategory}` : (searchQuery ? `Search Results: "${searchQuery}"` : 'All Products')}
                                </h2>
                                <div className="products-grid">
                                    <AnimatePresence mode='popLayout'>
                                        {filteredProducts.map((product) => (
                                            <motion.div
                                                key={product.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                                className="product-card"
                                            >
                                                <div className="product-image-wrapper">
                                                    <div className="product-brand-badge">{product.brand}</div>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="product-image"
                                                        loading="lazy"
                                                    />
                                                    <div className="product-overlay">
                                                        <button
                                                            className="view-details-btn"
                                                            onClick={() => handleProductClick(product)}
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="product-info">
                                                    <span className="product-category">{product.category}</span>
                                                    <span className="product-brand-name">{product.brand}</span>
                                                    <h3 className="product-title">{product.name}</h3>

                                                    <div className="product-actions">
                                                        <a
                                                            href={`/contact?subject=${encodeURIComponent(`Quote Request: ${product.name}`)}&details=${encodeURIComponent(`Product: ${product.name}, Brand: ${product.brand}, Category: ${product.category}`)}`}
                                                            className="get-quote-btn"
                                                        >
                                                            Get a Quote
                                                            <span className="material-symbols-outlined">arrow_forward</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                                {filteredProducts.length === 0 && (
                                    <div className="no-products-message" style={{ textAlign: 'center', padding: '3rem', color: '#888', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                                        <h3>No products found</h3>
                                        <p>Try adjusting your search or category filters.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="product-modal-overlay"
                        onClick={closeProductModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="product-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={closeProductModal}>
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="modal-body">
                                <div className="modal-image-col">
                                    <div className="modal-brand-badge">{selectedProduct.brand}</div>
                                    <img src={selectedProduct.image} alt={selectedProduct.name} loading="lazy" />
                                </div>
                                <div className="modal-info-col">
                                    <span className="modal-category">{selectedProduct.category}</span>
                                    <h2 className="modal-title">{selectedProduct.name}</h2>
                                    <p className="modal-description">
                                        {selectedProduct.description || `High-performance ${selectedProduct.category.toLowerCase()} designed for optimal reliability and safety in demanding industrial environments.`}
                                    </p>

                                    <div className="modal-actions">
                                        <a href={`/contact?subject=Quote Request: ${selectedProduct.name}`} className="modal-quote-btn">
                                            Request a Quote
                                            <span className="material-symbols-outlined">request_quote</span>
                                        </a>
                                        {selectedProduct.link && (
                                            <a href={selectedProduct.link} target="_blank" rel="noopener noreferrer" className="modal-datasheet-btn">
                                                Technical Datasheet
                                                <span className="material-symbols-outlined">description</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductsPage;
