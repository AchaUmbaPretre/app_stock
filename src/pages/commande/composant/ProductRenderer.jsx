import { Skeleton } from 'antd';
import config from '../../../config';

const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

export const renderSkeletons = () => (
    <div className="skeleton-container">
        {[...Array(4)].map((_, rowIndex) => (
            <div key={`skeleton-row-${rowIndex}`} className="skeleton-group">
                {[...Array(3)].map((_, colIndex) => (
                    <div key={`skeleton-${rowIndex}-${colIndex}`} className="skeleton-item">
                        <Skeleton.Image active style={{ width: 350, height: 350 }} />
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export const renderProducts = (paginatedData, onVariantClick, clearAllFilters) => {
    if (paginatedData.length === 0) {
        return (
            <div className="no-results">
                <p>Aucun produit trouvé avec les filtres sélectionnés.</p>
                <button 
                    type="button" 
                    className="clear-filters-btn"
                    onClick={clearAllFilters}
                >
                    Effacer tous les filtres
                </button>
            </div>
        );
    }

    return (
        <div className="variante-top-rows">
            {paginatedData.map((product) => (
                <ProductCard 
                    key={product.id_varianteProduit}
                    product={product}
                    onVariantClick={onVariantClick}
                />
            ))}
        </div>
    );
};

const ProductCard = ({ product, onVariantClick }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            onVariantClick(product.id_varianteProduit);
        }
    };

    const handleImageError = (e) => {
        e.target.src = '/placeholder-image.jpg';
        e.target.alt = 'Image non disponible';
    };

    return (
        <div
            className="variante-top-row"
            onClick={() => onVariantClick(product.id_varianteProduit)}
            role="button"
            tabIndex={0}
            onKeyPress={handleKeyPress}
        >
            <div className="cercle" />
            <img
                src={`${DOMAIN}${product.img}`}
                alt={product.nom_produit || 'Produit'}
                className="variante-img"
                loading="lazy"
                onError={handleImageError}
            />
        </div>
    );
};