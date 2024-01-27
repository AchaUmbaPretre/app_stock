import { useEffect, useState } from "react";
import config from "../../../config";
import axios from "axios";
import './venteClientDetail.scss'

const VenteClientDetail = ({idClients}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/client/${idClients}`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,idClients]);

  return (
    <>
        <div className="mouvClient">
            <div className="mouvWrapper">
                <div className="mouvClient-row">
                    <span>Nom</span>
                    <span>:  {data[0]?.nom}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Gmail</span>
                    <span>:  {data[0]?.email}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Numero </span>
                    <span>:  {data[0]?.telephone}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Raison sociale</span>
                    <span>:  {data[0]?.raison_sociale}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Ville</span>
                    <span>:  {data[0]?.nom_province}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Commune</span>
                    <span>:  {data[0]?.nom_commune}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Quartier</span>
                    <span>:  {data[0]?.quartier}</span>
                </div>
                <div className="mouvClient-row">
                    <span>Avenue</span>
                    <span>:  {data[0]?.avenue}</span>
                </div>
                <div className="mouvClient-row">
                    <span>N°</span>
                    <span>:  {data[0]?.num}</span>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default VenteClientDetail 