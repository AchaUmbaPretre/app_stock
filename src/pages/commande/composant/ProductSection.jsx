import React from 'react';
import ReactPaginate from 'react-paginate';
import { renderSkeletons, renderProducts } from './ProductRenderer';

export const ProductSection = ({ 
    loading, 
    paginatedData, 
    totalPages, 
    currentPage, 
    onPageChange, 
    onVariantClick,
    clearAllFilters 
}) => {
    return (
        <div className="variant_bottom">
            {loading ? renderSkeletons() : renderProducts(paginatedData, onVariantClick, clearAllFilters)}
            
            {!loading && totalPages > 1 && (
                <ReactPaginate
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={onPageChange}
                    previousLabel={'Précédent'}
                    nextLabel={'Suivant'}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    forcePage={currentPage}
                />
            )}
        </div>
    );
};