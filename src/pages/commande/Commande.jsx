import React from 'react';
import { useLocation } from 'react-router-dom';
import './commande.scss';
import { useCommandeData } from './hooks/useCommandeData';
import { useFilters } from './hooks/useFilters';
import { usePagination } from './hooks/usePagination';
import { useFiltersData } from './hooks/useFiltersData';
import { usePaginationData } from './hooks/usePaginationData';
import { useModal } from './hooks/useModal';
import { CommandeHeader } from './composant/CommandeHeader';
import { FilterSection } from './composant/FilterSection';
import { ProductSection } from './composant/ProductSection';
import { ProductModal } from './composant/ProductModal';

const Commande = () => {
    const ITEMS_PER_PAGE = 12;
    const { pathname } = useLocation();
    const id = pathname.split('/')[2];

    // Hooks personnalisés
    const { getCommande } = useCommandeData(id);
    const { filters, handleFilterChange, clearAllFilters } = useFilters();
    const { currentPage, handlePageChange } = usePagination();
    const { 
        rawData, 
        loading, 
        filterOptions,
        filterValues 
    } = useFiltersData(filters);
    
    const { paginatedData, totalPages } = usePaginationData(rawData, currentPage, ITEMS_PER_PAGE);
    const { open, idVariante, tailleDetail, handleVariantClick, closeModal } = useModal();

    // Configuration des filtres
    const filterConfigs = [
        { key: 'famille', label: 'Catégorie', options: filterOptions.famille, value: filterValues.famille },
        { key: 'marque', label: 'Marque', options: filterOptions.marque, value: filterValues.marque },
        { key: 'cible', label: 'Cible', options: filterOptions.cible, value: filterValues.cible },
        { key: 'taille', label: 'Pointure', options: filterOptions.taille, value: filterValues.taille },
        { key: 'couleur', label: 'Couleur', options: filterOptions.couleur, value: filterValues.couleur },
        { key: 'matiere', label: 'Matière', options: filterOptions.matiere, value: filterValues.matiere },
    ];

    return (
        <div className="varianteProduit">
            <div className="varianteProduit-wrapper">
                <CommandeHeader commande={getCommande} commandId={id} />
                
                <div className="variant-container-bottom">
                    <FilterSection 
                        filterConfigs={filterConfigs}
                        onFilterChange={handleFilterChange}
                        onClearFilters={clearAllFilters}
                        filters={filters}
                    />
                    
                    <ProductSection 
                        loading={loading}
                        paginatedData={paginatedData}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onVariantClick={handleVariantClick}
                        clearAllFilters={clearAllFilters}
                    />
                    
                    <ProductModal 
                        open={open}
                        onClose={closeModal}
                        idVariante={idVariante}
                        commandId={id}
                        tailleDetail={tailleDetail}
                        setTailleDetail={tailleDetail.set}
                    />
                </div>
            </div>
        </div>
    );
};

export default Commande;