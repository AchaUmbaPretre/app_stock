import React from 'react';
import Select from 'react-select';
import { FilterOutlined } from '@ant-design/icons';

const FilterSelect = React.memo(({ 
  label, 
  options = [], 
  value = [], 
  onChange, 
  filterKey,
  isLoading = false,
  placeholder = "Sélectionner...",
  isMulti = true,
  className = "variant-select"
}) => (
  <div className="variant-top-left">
    <div className="variant-top-row">
      <FilterOutlined className="variant-icon" aria-hidden="true" />
      <span>{label}</span>
    </div>
    <Select
      name={`id_${filterKey}`}
      className={className}
      options={options}
      isMulti={isMulti}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={`Filtrer par ${label.toLowerCase()}`}
      isClearable
      isSearchable
      isLoading={isLoading}
      noOptionsMessage={() => "Aucune option disponible"}
      loadingMessage={() => "Chargement..."}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: '35px',
          borderColor: '#d9d9d9',
          '&:hover': {
            borderColor: '#40a9ff',
          },
        }),
      }}
    />
  </div>
));

FilterSelect.displayName = 'FilterSelect';

export default FilterSelect;