import FilterSelect from '../../varianteProduit/composant/filterSelect/FilterSelect';

export const FilterSection = ({ filterConfigs, onFilterChange, onClearFilters, filters }) => {
    const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0);

    return (
        <section className="variant_top" aria-label="Filtres de produits">
            {filterConfigs.map((config) => (
                <FilterSelect
                    key={config.key}
                    filterKey={config.key}
                    label={config.label}
                    options={config.options}
                    value={config.value}
                    onChange={onFilterChange(config.key)}
                    placeholder="Sélectionner..."
                />
            ))}
            {hasActiveFilters && (
                <button
                    type="button"
                    className="clear-filters-button"
                    onClick={onClearFilters}
                >
                    Effacer les filtres
                </button>
            )}
        </section>
    );
};