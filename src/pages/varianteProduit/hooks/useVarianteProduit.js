import { useEffect, useState } from "react";
import config from "../../../config";
import axios from "axios";

export const useVarianteProduit = ({famille, marque, cible, taille, couleur, matiere}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getFamille,setGetFamille] = useState([]);
    const [getMarque,setGetMarque] = useState([]);
    const [getCible,setGetCible] = useState([]);
    const [getTaille,setGetTaille] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const [getMatiere,setGetMatiere] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
          setGetMarque(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

    useEffect(() => {
          const fetchData = async () => {
            try {
              const { data } = await axios.get(`${DOMAIN}/api/produit/cible`);
              setGetCible(data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
    }, [DOMAIN]);

    useEffect(() => {
          const fetchData = async () => {
            try {
              const { data } = await axios.get(`${DOMAIN}/api/produit/tailleAll`);
              setGetTaille(data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
    }, [DOMAIN]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/matiere`);
          setGetMatiere(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/famille`);
          setGetFamille(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
          setGetCouleur(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          // Construire les paramètres de manière sécurisée
          const params = {};
          
          if (famille && famille.length > 0) params.id_famille = famille.join(',');
          if (marque && marque.length > 0) params.id_marque = marque.join(',');
          if (cible && cible.length > 0) params.id_cible = cible.join(',');
          if (taille && taille.length > 0) params.id_taille = taille.join(',');
          if (couleur && couleur.length > 0) params.id_couleur = couleur.join(',');
          if (matiere && matiere.length > 0) params.id_matiere = matiere.join(',');
          
          const { data } = await axios.get(`${DOMAIN}/api/produit/varianteFiltre`, { params });
          setData(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };              
      fetchData();
    }, [DOMAIN, famille, marque, cible, taille, couleur, matiere]);

    return {
      getMarque,
      getCible,
      getTaille,
      getMatiere,
      getFamille,
      getCouleur,
      data, 
      loading
    }
}