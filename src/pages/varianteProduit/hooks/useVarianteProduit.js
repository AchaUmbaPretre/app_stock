import { useEffect, useState, useCallback } from "react";
import config from "../../../config";
import axios from "axios";

export const useVarianteProduit = ({famille, marque, cible, taille, couleur, matiere}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getFamille, setGetFamille] = useState([]);
    const [getMarque, setGetMarque] = useState([]);
    const [getCible, setGetCible] = useState([]);
    const [getTaille, setGetTaille] = useState([]);
    const [getCouleur, setGetCouleur] = useState([]);
    const [getMatiere, setGetMatiere] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fonction pour récupérer les données des filtres
    const fetchFilterData = useCallback(async (endpoint, setter) => {
        try {
            const { data } = await axios.get(`${DOMAIN}${endpoint}`);
            setter(data);
        } catch (error) {
            console.error(`Erreur lors de la récupération des données ${endpoint}:`, error);
        }
    }, [DOMAIN]);

    // Récupérer les données des filtres au montage
    useEffect(() => {
        const fetchAllFilterData = async () => {
            await Promise.all([
                fetchFilterData('/api/produit/marque', setGetMarque),
                fetchFilterData('/api/produit/cible', setGetCible),
                fetchFilterData('/api/produit/tailleAll', setGetTaille),
                fetchFilterData('/api/produit/matiere', setGetMatiere),
                fetchFilterData('/api/produit/famille', setGetFamille),
                fetchFilterData('/api/produit/couleur', setGetCouleur),
            ]);
        };
        
        fetchAllFilterData();
    }, [fetchFilterData]);

    // Récupérer les produits filtrés
    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Construire les paramètres de manière sécurisée
                const params = {};
                
                if (famille && famille.length > 0) params.id_famille = famille.join(',');
                if (marque && marque.length > 0) params.id_marque = marque.join(',');
                if (cible && cible.length > 0) params.id_cible = cible.join(',');
                if (taille && taille.length > 0) params.id_taille = taille.join(',');
                if (couleur && couleur.length > 0) params.id_couleur = couleur.join(',');
                if (matiere && matiere.length > 0) params.id_matiere = matiere.join(',');
                
                // Ajouter un timestamp pour éviter le cache
                params._t = Date.now();
                
                const response = await axios.get(`${DOMAIN}/api/produit/varianteFiltre`, { 
                    params,
                    timeout: 10000 // Timeout de 10 secondes
                });
                
                setData(response.data || []);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits:", error);
                setError("Impossible de charger les produits. Veuillez réessayer.");
                setData([]);
            } finally {
                setLoading(false);
            }
        };
        
        // Délai pour éviter les appels trop fréquents
        const timer = setTimeout(() => {
            fetchFilteredProducts();
        }, 300);
        
        return () => clearTimeout(timer);
    }, [DOMAIN, famille, marque, cible, taille, couleur, matiere]);

    return {
        getMarque,
        getCible,
        getTaille,
        getMatiere,
        getFamille,
        getCouleur,
        data, 
        loading,
        error
    };
}