// src/pages/commande/hooks/useModal.js
import { useState, useCallback } from 'react';

export const useModal = () => {
    const [open, setOpen] = useState(false);
    const [idVariante, setIdVariante] = useState(null);
    const [tailleDetail, setTailleDetail] = useState([]);

    const handleVariantClick = useCallback((variantId) => {
        setIdVariante(variantId);
        setOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setOpen(false);
        setIdVariante(null);
        setTailleDetail([]);
    }, []);

    return {
        open,
        idVariante,
        tailleDetail,
        setTailleDetail,
        handleVariantClick,
        closeModal
    };
};