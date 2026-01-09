// src/pages/commande/hooks/useFiltersData.js
import { useMemo } from 'react';
import { useVarianteProduit } from '../../varianteProduit/hooks/useVarianteProduit';

export const useFiltersData = (filters) => {
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

    const filterOptions = useMemo(() => ({
        famille: familles?.map(({ id_famille, nom }) => ({ value: id_famille, label: nom })),
        marque: marques?.map(({ id_marque, nom }) => ({ value: id_marque, label: nom })),
        cible: cibles?.map(({ id_cible, nom_cible }) => ({ value: id_cible, label: nom_cible })),
        taille: tailles
            ?.sort((a, b) => a.id_taille - b.id_taille)
            .map(({ id_taille, taille }) => ({ value: id_taille, label: taille })),
        couleur: couleurs?.map(({ id_couleur, description }) => ({ value: id_couleur, label: description })),
        matiere: matieres?.map(({ id_matiere, nom_matiere }) => ({ value: id_matiere, label: nom_matiere })),
    }), [familles, marques, cibles, tailles, couleurs, matieres]);

    const filterValues = useMemo(() => ({
        famille: filterOptions.famille?.filter(opt => filters.famille.includes(opt.value)) || [],
        marque: filterOptions.marque?.filter(opt => filters.marque.includes(opt.value)) || [],
        cible: filterOptions.cible?.filter(opt => filters.cible.includes(opt.value)) || [],
        taille: filterOptions.taille?.filter(opt => filters.taille.includes(opt.value)) || [],
        couleur: filterOptions.couleur?.filter(opt => filters.couleur.includes(opt.value)) || [],
        matiere: filterOptions.matiere?.filter(opt => filters.matiere.includes(opt.value)) || [],
    }), [filters, filterOptions]);

    return {
        rawData,
        loading,
        filterOptions,
        filterValues
    };
};