import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import config from '../../../config';
import { toast } from 'react-toastify';

const LivraisonViewPrix = ({ prixTotal, idDetail, userUpdate, idLivraison }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [getPrix, setGetPrix] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setGetPrix(prixTotal);
    }, [prixTotal]);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            await axios.put(`${DOMAIN}/api/livraison/livraisonPrix/${idDetail}`, { prix: getPrix, userUpdate: userUpdate });
            toast.success('La livraison a été modifiée avec succès !');
            window.location.reload();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="livraisonViewPrix">
                <div className="livraisonviewPrix-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label htmlFor="">Prix</label>
                    <input
                        type="number"
                        value={getPrix}
                        onChange={(e) => setGetPrix(e.target.value)}
                        style={{ width: '100%', padding: '10px', border: '1px solid #c7c7c7', borderRadius: '5px', outline: 'none' }}
                    />
                    <button
                        style={{
                            padding: '10px 15px',
                            border: 'none',
                            color: '#fff',
                            background: 'rgb(1, 35, 138)',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                        onClick={handleClick}
                        disabled={loading}
                    >
                        Envoyer
                    </button>
                    {loading && (
                        <div className="loader-container loader-container-center">
                            <CircularProgress size={30} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LivraisonViewPrix;
