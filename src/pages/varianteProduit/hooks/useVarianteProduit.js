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
                          const url = `${DOMAIN}/api/produit/varianteFiltre?id_famille=${famille}&id_marque=${marque}&id_cible=${cible}&id_taille=${taille}&id_couleur=${couleur}&id_matiere=${matiere}`;
                    
                          const { data } = await axios.get(url);
                          setData(data);
                          setLoading(false);
              
                          if (data.length === 0) {
              
                            window.location.reload();
                          }
                        } catch (error) {
                          console.log(error);
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