import { useState, useMemo, useCallback } from 'react';
import './varianteProduit.scss';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import config from '../../config';
import ReactPaginate from 'react-paginate';
import { Modal, Skeleton } from 'antd';
import PageDetails from '../PageDetails/PageDetails';
import { useVarianteProduit } from './hooks/useVarianteProduit';
import FilterSelect from './composant/filterSelect/FilterSelect';

const ITEMS_PER_PAGE = 12;

const VarianteProduit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  
  const [filters, setFilters] = useState({
    matiere: [],
    couleur: [],
    famille: [],
    marque: [],
    cible: [],
    taille: [],
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState(null);

  const { 
    getMarque: marques, 
    getCible: cibles, 
    getTaille: tailles, 
    getMatiere: matieres, 
    getFamille: familles, 
    getCouleur: couleurs, 
    data: rawData, 
    loading 
  } = useVarianteProduit(filters);

  // Regroupement et pagination des données
  const { paginatedData, totalPages } = useMemo(() => {
    // Regroupement par code_variant
    const grouped = Object.values(
      rawData.reduce((acc, item) => {
        const { code_variant, ...rest } = item;
        if (!acc[code_variant]) {
          acc[code_variant] = { code_variant, data: [] };
        }
        acc[code_variant].data.push(rest);
        return acc;
      }, {})
    );

    // Pagination
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const firstItems = grouped.map(group => group.data[0]);
    const paginated = firstItems.slice(startIndex, endIndex);
    const pages = Math.ceil(grouped.length / ITEMS_PER_PAGE);

    return {
      groupedData: grouped,
      paginatedData: paginated,
      totalPages: pages,
    };
  }, [rawData, currentPage]);

  // Gestionnaires d'événements
  const handleFilterChange = useCallback((filterName) => (selectedOptions) => {
    const values = selectedOptions?.map(option => option.value) || [];
    setFilters(prev => ({
      ...prev,
      [filterName]: values,
    }));
    setCurrentPage(0); // Reset à la première page lors du filtrage
  }, []);

  const handlePageChange = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  const handleVariantClick = useCallback((variantId) => {
    setSelectedVariantId(variantId);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedVariantId(null);
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({
      matiere: [],
      couleur: [],
      famille: [],
      marque: [],
      cible: [],
      taille: [],
    });
    setCurrentPage(0);
  }, []);

  // Options pour les filtres Select
  const filterOptions = useMemo(() => ({
    famille: familles?.map(({ id_famille, nom }) => ({ 
      value: id_famille, 
      label: nom 
    })),
    marque: marques?.map(({ id_marque, nom }) => ({ 
      value: id_marque, 
      label: nom 
    })),
    cible: cibles?.map(({ id_cible, nom_cible }) => ({ 
      value: id_cible, 
      label: nom_cible 
    })),
    taille: tailles
      ?.sort((a, b) => a.id_taille - b.id_taille)
      .map(({ id_taille, taille }) => ({ 
        value: id_taille, 
        label: taille 
      })),
    couleur: couleurs?.map(({ id_couleur, description }) => ({ 
      value: id_couleur, 
      label: description 
    })),
    matiere: matieres?.map(({ id_matiere, nom_matiere }) => ({ 
      value: id_matiere, 
      label: nom_matiere 
    })),
  }), [familles, marques, cibles, tailles, couleurs, matieres]);

  // Valeurs actuelles des filtres
  const filterValues = useMemo(() => ({
    famille: filterOptions.famille?.filter(opt => 
      filters.famille.includes(opt.value)
    ) || [],
    marque: filterOptions.marque?.filter(opt => 
      filters.marque.includes(opt.value)
    ) || [],
    cible: filterOptions.cible?.filter(opt => 
      filters.cible.includes(opt.value)
    ) || [],
    taille: filterOptions.taille?.filter(opt => 
      filters.taille.includes(opt.value)
    ) || [],
    couleur: filterOptions.couleur?.filter(opt => 
      filters.couleur.includes(opt.value)
    ) || [],
    matiere: filterOptions.matiere?.filter(opt => 
      filters.matiere.includes(opt.value)
    ) || [],
  }), [filters, filterOptions]);

  // Configuration des filtres
  const filterConfigs = [
    { 
      key: 'famille', 
      label: 'Catégorie', 
      options: filterOptions.famille,
      value: filterValues.famille,
    },
    { 
      key: 'marque', 
      label: 'Marque', 
      options: filterOptions.marque,
      value: filterValues.marque,
    },
    { 
      key: 'cible', 
      label: 'Cible', 
      options: filterOptions.cible,
      value: filterValues.cible,
    },
    { 
      key: 'taille', 
      label: 'Pointure', 
      options: filterOptions.taille,
      value: filterValues.taille,
    },
    { 
      key: 'couleur', 
      label: 'Couleur', 
      options: filterOptions.couleur,
      value: filterValues.couleur,
    },
    { 
      key: 'matiere', 
      label: 'Matière', 
      options: filterOptions.matiere,
      value: filterValues.matiere,
    },
  ];

  // Rendu des squelettes de chargement
  const renderSkeletons = () => (
    <div className="skeleton-container">
      {[...Array(4)].map((_, rowIndex) => (
        <div key={`skeleton-row-${rowIndex}`} className="skeleton-group">
          {[...Array(3)].map((_, colIndex) => (
            <div key={`skeleton-${rowIndex}-${colIndex}`} className="skeleton-item">
              <Skeleton.Image 
                active 
                style={{ width: 350, height: 350 }} 
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  // Rendu des produits
  const renderProducts = () => {
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
          <div
            key={product.id_varianteProduit}
            className="variante-top-row"
            onClick={() => handleVariantClick(product.id_varianteProduit)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleVariantClick(product.id_varianteProduit);
              }
            }}
          >
            <div className="cercle" />
            <img
              src={`${DOMAIN}${product.img}`}
              alt={product.nom_produit || 'Produit'}
              className="variante-img"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
                e.target.alt = 'Image non disponible';
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="varianteProduit">
      <div className="varianteProduit-wrapper">
        <header className="varianteProduit-container-top">
          <div className="varianteProduit-left">
            <h1 className="varianteProduit-h2">Notre catalogue</h1>
          </div>
        </header>

        <div className="variant-container-bottom">
          {/* Section des filtres */}
          <section className="variant_top" aria-label="Filtres de produits">
            {filterConfigs.map((config) => (
              <FilterSelect
                key={config.key}
                filterKey={config.key}
                label={config.label}
                options={config.options}
                value={config.value}
                onChange={handleFilterChange(config.key)}
                placeholder={`Sélectionner...`}
              />
            ))}
          </section>

          {/* Section des produits */}
          <section className="variant_bottom">
            {loading ? renderSkeletons() : renderProducts()}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <ReactPaginate
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                previousLabel={<LeftOutlined aria-label="Page précédente" />}
                nextLabel={<RightOutlined aria-label="Page suivante" />}
                containerClassName="pagination"
                activeClassName="active"
                pageClassName="pagination-page"
                breakClassName="pagination-break"
                previousClassName="pagination-previous"
                nextClassName="pagination-next"
                disabledClassName="pagination-disabled"
                forcePage={currentPage}
              />
            )}

            {/* Modal des détails */}
            <Modal
              title="Détails du produit"
              centered
              open={isModalOpen}
              onCancel={closeModal}
              width={1100}
              footer={null}
              destroyOnClose
            >
              {selectedVariantId && <PageDetails id={selectedVariantId} />}
            </Modal>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VarianteProduit;