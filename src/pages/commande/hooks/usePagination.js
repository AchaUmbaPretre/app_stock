// src/pages/commande/hooks/usePagination.js
import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 0) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const handlePageChange = useCallback(({ selected }) => {
        setCurrentPage(selected);
    }, []);

    const resetPage = useCallback(() => {
        setCurrentPage(0);
    }, []);

    return {
        currentPage,
        setCurrentPage,
        handlePageChange,
        resetPage
    };
};