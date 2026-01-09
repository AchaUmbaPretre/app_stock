// src/pages/commande/hooks/usePaginationData.js
import { useMemo } from 'react';

export const usePaginationData = (rawData, currentPage, itemsPerPage) => {
    const { groupedData, paginatedData, totalPages } = useMemo(() => {
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

        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const firstItems = grouped.map(group => group.data[0]);
        const paginated = firstItems.slice(startIndex, endIndex);
        const pages = Math.ceil(grouped.length / itemsPerPage);

        return {
            groupedData: grouped,
            paginatedData: paginated,
            totalPages: pages,
        };
    }, [rawData, currentPage, itemsPerPage]);

    return {
        groupedData,
        paginatedData,
        totalPages
    };
};