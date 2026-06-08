import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';
import './ProductsPage.css';

const ProductsPage = () => {
    const [searchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null); // For Modal
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    // Brand grouping helper
    const getBrandsByCategory = () => {
        const brandsByCategory = {};
        // We need productCategories from HeaderCorp or similar source of truth.
        // Since it's not exported, let's redefine the mapping here or pass it in.
        // For now preventing prop drilling, we'll redefine the categories mapping which matches the header
        const majorCategories = [
            { name: 'Pressure Safety Valve', brand: 'Farris', image: '/assets/suppliers/farris.png' },
            { name: 'Control Valve', brand: 'Dyna-Flo', image: '/assets/suppliers/dyna-flo.png' },
            { name: 'DBB / Instrument Valve', brand: 'Alco, Sabre', image: '/assets/suppliers/alco-sabre.png' },
            { name: 'Rupture Disk', brand: 'Continental Disc', image: '/assets/suppliers/continental-disc.png' },
            { name: 'Fire & Gas Detector', brand: 'Honeywell', image: '/assets/suppliers/honeywell.png' },
            { name: 'Pressure Regulator', brand: 'Pressure Tech', image: '/assets/suppliers/pressure-tech.png' },
            { name: 'Corrosion Monitoring', brand: 'Cosasco, Groth', image: '/assets/suppliers/cosasco.png' },
            { name: 'Gauges', brand: 'Badotherm', image: '/assets/suppliers/badotherm.png' },
            { name: 'MPFM', brand: 'Pietro Fiorentini', image: '/assets/suppliers/pietro-fiorentini.png' },
            { name: 'WHCP / CI Skid', brand: 'Wilmax', image: '/assets/suppliers/wilmax.png' },
            { name: 'Flare System', brand: 'Flare Internusa', image: '/assets/suppliers/flare-internusa.png' },
            { name: 'Valves', brand: 'Fitok', image: '/assets/suppliers/fitok.png' },
        ];
        return majorCategories;
    };

    const brandGroups = getBrandsByCategory();

    // Check if we are in "Brand Showcase" mode (Active Filter is 'All' AND no search query)
    const showBrandShowcase = activeFilter === 'All' && !searchQuery;

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
            .order('created_at', { ascending: true }); // Keep roughly original order? Or brand?

        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        }
        setLoading(false);
    };

    // Calculate derived state from 'products' state
    const brands = ['All', ...new Set(products.map(item => item.brand))];

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

        return matchesBrand && matchesSearch;
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
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Brand Filters */}
                    <div className="brand-filters">
                        {brands.map((brand) => (
                            <button
                                key={brand}
                                className={`filter-btn ${activeFilter === brand ? 'active' : ''}`}
                                onClick={() => setActiveFilter(brand)}
                            >
                                {brand === 'Alco, Sabre' ? 'Alco & Sabre' : brand}  {/* Simple clean up for display logic */}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            {/* Brand Showcase Section (Shown only when 'All' is selected and no search) */}
            {showBrandShowcase && (
                <section className="brand-showcase-section">
                    <div className="brand-showcase-container">
                        <h2 className="section-heading">Browse our Brands</h2>
                        <div className="brand-grid">
                            {brandGroups.map((group, index) => (
                                <div
                                    key={index}
                                    className="brand-card"
                                    onClick={() => setActiveFilter(group.brand)}
                                >
                                    <div className="brand-logo-container">
                                        <img src={group.image} alt={group.brand} loading="lazy" />
                                    </div>
                                    <div className="brand-info">
                                        <h3 className="brand-category-title">{group.name}</h3>
                                        <div className="brand-list">
                                            {group.brand.split(',').map((brand, bIndex) => (
                                                <span key={bIndex} className="brand-list-item">
                                                    {brand.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Products Grid - Only shown when NOT in showcase mode */}
            {!showBrandShowcase && (
                <section className="products-grid-section">
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
                </section>
            )}
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
                                        High-performance {selectedProduct.category.toLowerCase()} designed for optimal reliability and safety in demanding industrial environments.
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
