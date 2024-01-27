import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config";
import { format } from "date-fns";
import moment from "moment";

const ProductDetail = ({idProduit}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/produit/${idProduit}`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [idProduit]);

      console.log(data)

  return (
    <>
        <div className="mouvClient">
            <div className="mouvWrapper">
                <div className="mouvClient-row">
                    <span>Nom produit</span>
                    <span>:  {data[0]?.nom_produit}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Marque</span>
                    <span>:  {data[0]?.nom_marque}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Categorie </span>
                    <span>:  {data[0]?.nom_categorie}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Matiére</span>
                    <span>:  {data[0]?.nom_matiere}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Famille</span>
                    <span>:  {data[0]?.nom_famille}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Cible</span>
                    <span>:  {data[0]?.nom_cible}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Prix</span>
                    <span>:  {data[0]?.prix} $</span>
                </div>
                <div className="mouvClient-row">
                    <span>Code variante</span>
                    <span>:  {data[0]?.code_variante}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Date entrant</span>
                    <span>: {moment(data[0]?.date_entrant).format('DD-MM-YYYY')}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Date mise à jour</span>
                    <span>: {moment(data[0]?.date_MisAjour).format('DD-MM-YYYY')}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Status</span>
                    <span style={{color:"blue"}}>: {data[0]?.etatProduit}</span>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default ProductDetail