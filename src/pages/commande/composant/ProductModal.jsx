// src/pages/commande/components/ProductModal.jsx
import React from 'react';
import { Modal } from 'antd';
import DetailProduitCommande from '../detaillProduitCommande/DetailProduitCommande';

export const ProductModal = ({ open, onClose, idVariante, commandId, tailleDetail, setTailleDetail }) => {
    return (
        <Modal
            centered
            open={open}
            onCancel={onClose}
            width={950}
            footer={null}
            destroyOnClose
        >
            {idVariante && (
                <DetailProduitCommande 
                    idVariant={idVariante} 
                    idCommande={commandId} 
                    tailles={tailleDetail} 
                    setTailles={setTailleDetail} 
                />
            )}
        </Modal>
    );
};