// src/pages/commande/hooks/useFilters.js
import { useState, useCallback } from 'react';

const initialFilters = {
    matiere: [],
    couleur: [],
    famille: [],
    marque: [],
    cible: [],
    taille: [],
};

export const useFilters = () => {
    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = useCallback((filterName) => (selectedOptions) => {
        const values = selectedOptions?.map(option => option.value) || [];
        setFilters(prev => ({
            ...prev,
            [filterName]: values,
        }));
    }, []);

    const clearAllFilters = useCallback(() => {
        setFilters(initialFilters);
    }, []);

    return {
        filters,
        setFilters,
        handleFilterChange,
        clearAllFilters
    };
};