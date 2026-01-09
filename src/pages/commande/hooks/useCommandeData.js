import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';

export const useCommandeData = (id) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getCommande, setGetCommande] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${id}`);
                if (data && data.length > 0) {
                    setGetCommande(data[0]);
                }
            } catch (error) {
                console.log('Erreur lors du chargement de la commande:', error);
            }
        };
        fetchData();
    }, [DOMAIN, id]);

    return { getCommande };
};