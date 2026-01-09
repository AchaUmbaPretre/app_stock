// src/pages/commande/components/CommandeHeader.jsx
import React from 'react';

export const CommandeHeader = ({ commande, commandId }) => {
    if (!commande) return null;

    return (
        <div className="varianteProduit-container-top">
            <div className="varianteProduit-left">
                <h2 className="varianteProduit-h2">La commande N° {commandId}</h2>
                <span>
                    de {commande.nom} de la commune {commande.nom_commune} 
                    Av/ {commande.avenue} Q/ {commande.quartier} N° {commande.num}
                </span>
            </div>
            <div className="varianteProduit-right">
                <h2 style={{ fontSize: '.9rem', color: 'rgb(1, 35, 138)' }}>
                    Contact de {commande.nom}
                </h2>
                <span className="variant-name" style={{ fontSize: '.7rem', color: '#6d6c6c' }}>
                    {commande.telephone}
                </span>
            </div>
        </div>
    );
};