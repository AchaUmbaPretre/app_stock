import "./pageDetails.scss";
import config from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Rate } from "antd";
import moment from "moment";
import { FadeLoader } from "react-spinners";

const PageDetails = ({ id }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;

  const [produit, setProduit] = useState(null);
  const [inventaire, setInventaire] = useState([]);
  const [inventaireTotal, setInventaireTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${DOMAIN}/api/produit/varianteDetail/${id}`
        );

        const produitData = data[0];
        setProduit(produitData);

        const variante = produitData?.code_variant;

        if (!variante) return;

        const [inventaireRes, totalRes] = await Promise.all([
          axios.get(`${DOMAIN}/api/inventaire/${variante}`),
          axios.get(`${DOMAIN}/api/inventaire/inventaireTotalOne/${variante}`),
        ]);

        setInventaire(inventaireRes.data);
        setInventaireTotal(totalRes.data[0]?.nombre_total_de_paires || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [DOMAIN, id]);

  if (loading) {
    return (
      <div className="spinner-container">
        <FadeLoader color={"#36D7B7"} loading={loading} />
      </div>
    );
  }

  if (!produit) return null;

  const tailleMin = inventaire[0]?.taille_min;
  const tailleMax = inventaire[inventaire.length - 1]?.taille_max;

  return (
    <div className="pageDetails">
      <div className="pageDetail-wrapper">
        <div className="pageDetail-container">
          
          {/* IMAGE + DESCRIPTION */}
          <div className="pageDetail-left">
            <div style={{ position: "relative", width: "400px" }}>
              <img
                src={`${DOMAIN}${produit.img}`}
                alt={produit.nom_produit}
                className="pageDetail-img"
              />
            </div>

            <div className="pageDetail-left-wrapper" id="description">
              <h2>Description</h2>

              <ul>
                <li><strong>Nom produit :</strong> {produit.nom_produit}</li>
                <li><strong>Code variant :</strong> {produit.code_variant}</li>
                <li><strong>Matière :</strong> {produit.nom_matiere}</li>
                <li><strong>Marque :</strong> {produit.nom_marque}</li>
                <li><strong>Catégorie :</strong> {produit.nom_categorie}</li>
                <li><strong>Famille :</strong> {produit.nom_famille}</li>

                <li>
                  <strong>Couleur :</strong>
                  <span className={produit.description}></span>
                  <span>{produit.description}</span>
                </li>

                <li><strong>Cible :</strong> {produit.nom_cible}</li>
                <li><strong>Code pays :</strong> {produit.code_pays}</li>

                <li>
                  <strong>
                    {produit.nom_famille === "Chaussure" ? "Pointure" : "Taille"} :
                  </strong>{" "}
                  {tailleMin === tailleMax
                    ? tailleMin
                    : `${tailleMin} à ${tailleMax}`}
                </li>

                <li>
                  <strong>Date d'entrée :</strong>{" "}
                  {moment(produit.date_entrant).format("DD-MM-YYYY")}
                </li>
              </ul>
            </div>
          </div>

          {/* PARTIE DROITE */}
          <div className="pageDetail-right">
            <h2 className="pageDetail-h2">{produit.nom_marque}</h2>

            <div className="pagedetailDescr">
              <span>{produit.code_pays}</span>
              <a href="#description">En savoir plus</a>
            </div>

            <div className="pageEtoile-row">
              <Rate allowHalf defaultValue={3.5} />
            </div>

            <div className="pageDetail-rows-prix">
              <div className="pageDetail-row-prix">
                <h3>Prix {produit.prix} $</h3>
                <span>
                  Il y a {inventaireTotal} articles en stock pour cette
                  combinaison
                </span>
              </div>

              <div className="detail-inventaire">
                <h2 className="detail-h2">INVENTAIRE</h2>

                <table>
                  <thead>
                    <tr>
                      <th>Pointure {produit.code_pays}</th>
                      <th>Quantité</th>
                    </tr>
                  </thead>

                  <tbody>
                    {inventaire.map((item) => (
                      <tr key={item.taille}>
                        <td>{item.taille}</td>
                        <td>{item.nombre_de_paires}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PageDetails;