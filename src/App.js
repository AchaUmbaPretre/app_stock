import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Rightbar from './pages/rightbar/Rightbar';
import { HashLoader } from 'react-spinners';
import Page404 from './pages/page404/Page404';
import Login1 from './pages/login1/Login1';
import Register1 from './pages/register1/Register1';
import Products from './pages/products/Products';
import ProductForm from './pages/products/form/ProductForm';
import Ventes from './pages/ventes/Ventes';
import Categories from './pages/categories/Categories';
import Emplacement from './pages/emplacement/Emplacement';
import Client from './pages/client/Client';
import Livreur from './pages/livreur/Livreur';
import LivreurForm from './pages/livreur/livreurForm/LivreurForm';
import Utilisateurs from './pages/utilisateurs/Utilisateurs';
import UtilisateurForm from './pages/utilisateurs/utilisateurForm/UtilisateurForm';
import ProductView from './pages/products/productView/ProductView';
import VenteView from './pages/ventes/venteView/VenteView';
import RetourForm from './pages/retour/retourForm/RetourForm';
import Retour from './pages/retour/Retour';
import Echange from './pages/echange/Echange';
import EchangeForm from './pages/echange/echangeForm/EchangeForm';
import Matiere from './pages/matiere/Matiere';
import Marque from './pages/marque/Marque';
import FormProduitEdit from './pages/products/formEdit/FormProduitEdit';
import RapportVenteChart from './pages/rapport/rapportVenteChart.jsx/RapportVenteChart';
import RapportVente from './pages/rapport/rapportVente/RapportVente';
import RapportDachats from './pages/rapport/rapportDachat/RapportDachats';
import LivreurEdit from './pages/livreur/livreurEdit/LivreurEdit';
import ClientEdit from './pages/client/clientEdit/ClientEdit';
import UtilisateurEdit from './pages/utilisateurs/utilisateurEdit/UtilisateurEdit';
import VarianteProduit from './pages/varianteProduit/VarianteProduit';
import PageDetails from './pages/PageDetails/PageDetails';
import TypeMouvement from './pages/typeMouvement/TypeMouvement';
import Mouvement from './pages/mouvement/Mouvement';
import FormMouvement from './pages/mouvement/formMouvement/FormMouvement';
import Commande from './pages/commande/Commande';
import Cart from './pages/commande/cart/Cart';
import DetailProduitCommande from './pages/commande/detaillProduitCommande/DetailProduitCommande';
import FormCommande from './pages/commande/formCommande/FormCommande';
import ListeCommande from './pages/commande/ListeCommande/ListeCommande';
import ListeDetailCommande from './pages/commande/listeDetailCommande/ListeDetailCommande';
import EditCommande from './pages/commande/editCommande/EditCommande';
import ListeDetailView from './pages/commande/listeDetailView/ListeDetailView';
import Livraison from './pages/livraison/Livraison';
import Livraison_detail from './pages/livraison/livraison_detail/Livraison_detail';
import { useSelector, useDispatch } from 'react-redux';
import LivraisonForm from './pages/livraison/livraisonForm/LivraisonForm';
import PageLivreur from './pages/pageLivreur/PageLivreur';
import PageLivreurDetail from './pages/pageLivreur/pageLivreurDetail/PageLivreurDetail';
import PageLivreurNavbar from './pages/pageLivreur/pageNavbar/PageLivreurNavbar';
import PageLivreurVente from './pages/pageLivreur/pageLivreurVente/PageLivreurVente';
import Page405 from './pages/page404/page405';
import MouvementView from './pages/mouvement/mouvementView/MouvementView';
import PageCommandeLivraison from './pages/pageLivreur/pageCommandeLivraison/PageCommandeLivraison';
import PageCommandeVente from './pages/pageLivreur/pageCommandeVente/PageCommandeVente';
import PageRetourCommande from './pages/pageLivreur/pageRetourCommande/PageRetourCommande';
import PageLivraisonRetour from './pages/pageLivreur/pageRetourCommande/PageLivraisonRetour';
import LivraisonView from './pages/livraison/livraisonView/LivraisonView';
import Couleur from './pages/couleur/Couleur';
import ListeVariante from './pages/varianteProduit/listeVariante/ListeVariante';
import RapportVenteAll from './pages/rapport/rapportVente/rapportVenteAll/RapportVenteAll';
import RapportClient from './pages/rapport/rapportClient/RapportClient';
import RapportClientVenteOne from './pages/rapport/rapportClient/RapportClientVenteOne';
import RapportRevenu from './pages/rapport/rapportRevenu/RapportRevenu';
import Depenses from './pages/depenses/Depenses';
import CatDepenses from './pages/depenses/catDepenses/CatDepenses';
import RapportVenteMarque from './pages/rapport/rapportVente/rapportVenteMarque/RapportVenteMarque';
import RapportVenteCode from './pages/rapport/rapportVente/rapportVenteCodeVariante/RapportVenteCode';
import RapportCouleurAll from './pages/rapport/rapportVente/rapportVenteCouleur/RapportCouleurAll';
import Dette from './pages/dette/Dette';
import Paiement from './pages/paiement/Paiement';
import Reception from './pages/reception/Reception';
import RapportVenteCouleurTaille from './pages/rapport/rapportVente/rapportVenteCouleur/RapportVenteCouleurTaille';
import CatReception from './pages/reception/catReception/CatReception';
import DetailReception from './pages/reception/detailReception/DetailReception';
import ReceptionOne from './pages/reception/ReceptionOne';
import DetteOne from './pages/dette/DetteOne';
import MouvementLivreur from './pages/mouvement/mouvementLivreur/MouvementLivreur';
import ClientAdresse from './pages/client/clientAdresse/ClientAdresse';
import ClientTelephone from './pages/client/clientTelephone/ClientTelephone';
import Localisation from './pages/pageLivreur/localisation/Localisation';
import Permissions from './pages/permissions/Permissions';
import EchangeCat from './pages/echange/echangeCat/EchangeCat';
import PageDetailEdit from './pages/PageDetails/PageDetailEdit/PageDetailEdit';
import PageCommandeEchange from './pages/pageLivreur/pageCommandeEchange/PageCommandeEchange';
import PageEchange from './pages/pageLivreur/pageEchange/PageEchange';
import ClientView from './pages/client/ClientView';
import ClientLocation from './pages/client/clientLocation/ClientLocation';
import RapportCaisse from './pages/rapport/rapportCaisse/RapportCaisse';
import DepensesAll from './pages/depenses/DepensesAll';
import axios from 'axios';
import config from './config';
import { fetchDataRequest, fetchDataFailure, fetchDataSuccess } from "./redux/userRedux";
import ClientForm from './pages/client/clientForm/ClientForm';
import PasswordForgot from './pages/passewordForgot/PasswordForgot';
import VenteRapport from './pages/ventes/venteRapport/VenteRapport';
import CommandeRapport from './pages/commande/commandeRapport/CommandeRapport';
import LivraisonRapport from './pages/livraison/livraisonRapport/LivraisonRapport';
import MouvementRapport from './pages/mouvement/mouvementRapport/MouvementRapport';
import MouvementVenteRapport from './pages/mouvement/mouvementRapport/MouvementVenteRapport';
import ClientRapport from './pages/client/clientRapport/ClientRapport';
import DetteRapport from './pages/dette/detteRapport/DetteRapport';
import PaiementRapport from './pages/paiement/paiementRapport/PaiementRapport';
import PermissionOne from './pages/permissions/permissionOne/PermissionOne';
import Options from './components/sidebar/Options';
import RapportCat from './pages/rapport/rapportVente/rapportCat/RapportCat';
import Profile from './pages/profile/Profile';
import RapportDepense from './pages/rapport/rapportDepense/RapportDepense';

function App() {
/*   const { currentUser } = useContext(AuthContext); */
const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
const dispatch = useDispatch();
const user = useSelector((state) => state.user?.currentUser);
const userId = useSelector((state) => state.user?.currentUser?.id);
const [data, setData] = useState([]);
/* const loading = useSelector((state) => state.user?.loading);
 */
const [loading, setLoading] = useState(false);

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchDataRequest());

        const res = await axios.get(`${DOMAIN}/api/produit/produitCount`);
        dispatch(fetchDataSuccess(res.data));

      } catch (error) {
        console.log(error);
        dispatch(fetchDataFailure());
      }
    };

    fetchData();
  }, [DOMAIN]); */

  const fetchMenu = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${DOMAIN}/api/inventaire/menuAll/addOne?userId=${userId}`);
      setData(data);
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchMenu();
    } else {
      setLoading(false);
    }
  }, [userId, fetchMenu]);

  const Layout = () => {
      
    return (
      <div >
        <Topbar/>
        <div className="appContainer">
          <Options data={data}/>
          <div className="appOutlet">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const Layout2 = () => {

    return (
      <div>
        <PageLivreurNavbar/>
        <div className="pageNavbar">
          <Outlet />
        </div>
      </div>
    );
  };

 const SecuriteRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    (user?.role === 'admin' || user?.role === 'secretaire' || user?.role === 'vendeur') && {
      path: '/',
      element: <SecuriteRoute><Layout /></SecuriteRoute>,
      children: [
        {
          path: '/',
          element: <Rightbar />
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/productView/:id',
          element: <ProductView />
        },
        {
          path: '/productForm',
          element: <ProductForm />
        },
        {
          path: '/productForm/:id',
          element: <FormProduitEdit />
        },
        {
          path: '/varianteProduit',
          element: <VarianteProduit />
        },
        {
          path: '/listeVariante',
          element: <ListeVariante />
        },
        {
          path: '/pageDetail/:id',
          element: <PageDetails />
        },
        {
          path: '/pageDetailEdit/:id',
          element: <PageDetailEdit />
        },
        {
          path: '/categories',
          element: <Categories />
        },
        {
          path: '/categories/:id',
          element: <Categories  />
        },
        {
          path: '/emplacement',
          element: <Emplacement />
        },
        {
          path: '/emplacement/:id',
          element: <Emplacement />
        },
        {
          path: '/matiere',
          element: <Matiere />
        },
        {
          path: '/matiere/:id',
          element: <Matiere />
        },
        {
          path: '/marque',
          element: <Marque />
        },
        {
          path: '/marque/:id',
          element: <Marque />
        },
        {
          path: '/typeMouvement',
          element: <TypeMouvement />
        },
        {
          path: '/couleur',
          element: <Couleur />
        },
        {
          path: '/mouvement',
          element: <Mouvement />
        },
        {
          path: '/mouvement/:id',
          element: <MouvementView />
        },
        {
          path: '/mouvementOne/:id',
          element: <MouvementLivreur />
        },
        {
          path: '/mouvementForm',
          element: <FormMouvement />
        },
        {
          path: '/mouvementEncours',
          element: <MouvementRapport />
        },
        {
          path: '/mouvementVente_rapport',
          element: <MouvementVenteRapport />
        },
        {
          path: '/commandes/:id',
         element: <Commande /> 
        },
        {
          path: '/commande/:id/:id_commande',
         element: <DetailProduitCommande /> 
        },
        {
          path: '/commandeForm',
         element: <FormCommande /> 
        },
        {
          path: '/Editcommande/:id',
         element: <EditCommande /> 
        },
        {
          path: '/listeCommande',
         element: <ListeCommande /> 
        },
        {
          path: '/commandeRapport',
         element: <CommandeRapport /> 
        },
        {
          path: '/listeDetailCommande',
         element: <ListeDetailCommande /> 
        },
        {
          path: '/listeDetailView/:id',
         element: <ListeDetailView /> 
        },
        {
          path: '/cart',
          element: <Cart/> 
        },
        {
          path: '/livraison',
          element: <Livraison/> 
        },
        {
          path: '/livraison_detail',
          element: <Livraison_detail/> 
        },
        {
          path: '/livraisonForm',
          element: <LivraisonForm/> 
        },
        {
          path: '/livraisonView/:id',
          element: <LivraisonView/> 
        },
        {
          path: '/livraisonRapport',
          element: <LivraisonRapport/> 
        },
        {
          path: '/ventes',
          element: <Ventes />
        },
        {
          path: '/venteView/:id',
          element: <VenteView />
        },
        {
          path: '/ventes/:id',
          element: <Ventes />
        },
        {
          path: '/venteRapport',
          element: <VenteRapport />
        },
        {
          path: '/retour',
          element: <Retour/>
        },
        {
          path: '/retourForm',
          element: <RetourForm />
        },
        {
          path: '/retour/:id',
          element: <Retour/>
        },
        {
          path: '/echange',
          element: <Echange/>
        },
        {
          path: 'echange/:id',
          element: <EchangeCat/>
        },
        {
          path: '/echangeForm',
          element: <EchangeForm/>
        },
        {
          path: '/clients',
          element: <Client />
        },
         {
          path: '/clientForm',
          element: <ClientForm />
        },
         {
          path: '/clientAdresse',
          element: <ClientAdresse />
        },
        {
          path: '/clientTelephone',
          element: <ClientTelephone />
        },
        {
          path: '/clientEdit/:id',
          element: <ClientEdit />
        },
        {
          path: '/clientView/:id',
          element: <ClientView />
        },
        {
          path: '/clientLocalisation',
          element: <ClientLocation />
        },
        {
          path: '/client_rapport',
          element: <ClientRapport />
        },
        {
          path: '/livreur',
          element: <Livreur />
        },
        {
          path: '/livreurForm',
          element: <LivreurForm />
        },
        {
          path: '/livreurEdit/:id',
          element: <LivreurEdit />
        },
        {
          path: '/livreurForm/:id',
          element: <LivreurForm />
        },
        {
          path: '/utilisateurs',
          element: <Utilisateurs/>
        },
        {
          path: '/utilisateurForm',
          element: <UtilisateurForm />
        },
        {
          path: '/utilisateurEdit/:id',
          element: <UtilisateurEdit/>
        },
        {
          path: '/depensesAll',
          element: <DepensesAll/>
        },
        {
          path: '/depenses',
          element: <Depenses/>
        },
        {
          path: '/catDepenses',
          element: <CatDepenses/>
        },
        {
          path: '/rapportVente',
          element: <RapportVente/>
        },
        {
          path: '/rapportVenteAll/:id',
          element: <RapportVenteAll/>
        },
        {
          path: '/rapportVenteV/:id',
          element: <RapportVenteCode/>
        },
        {
          path: '/rapportVentesChart',
          element: <RapportVenteChart/>
        },
        {
          path: '/rapportVenteMarque',
          element: <RapportVenteMarque/>
        },
        {
          path: '/rapportCat',
          element: <RapportCat/>
        },
        {
          path: '/rapportClient',
          element: <RapportClient/>
        },
        {
          path: '/rapportCouleurAll/:id/:id_marque',
          element: <RapportCouleurAll/>
        },
        {
          path: '/rapportVenteCouleurTaille',
          element: <RapportVenteCouleurTaille/>
        },
        {
          path: '/rapportClientOne',
          element: <RapportClientVenteOne/>
        },
        {
          path: '/rapportRevenu',
          element: <RapportRevenu/>
        },
        {
          path: '/rapportDachats',
          element: <RapportDachats/>
        },
        {
          path: '/rapportDepense',
          element: <RapportDepense/>
        },
        {
          path: '/dette',
          element: <Dette />
        },
        {
          path: '/dette/:id',
          element: <DetteOne />
        },
        {
          path: '/dette_rapport',
          element: <DetteRapport />
        },
        {
          path: '/paiement',
          element: <Paiement />
        },
        {
          path: '/paiement_rapport',
          element: <PaiementRapport />
        },
        {
          path: '/entreeStock',
          element: <CatReception />
        },
        {
          path: '/reception',
          element: <Reception />
        },
        {
          path: '/detailReception/:id',
          element: <DetailReception />
        },
        {
          path: '/receptionOne/:id',
          element: <ReceptionOne />
        },
        {
          path: '/permission',
          element: <Permissions />
        },
        {
          path: '/permissionOne',
          element: <PermissionOne />
        },
        {
          path: '/caisse',
          element: <RapportCaisse/>
        },
        {
          path: '/profile',
          element: <Profile/>
        }
      ]
    }, user?.role === 'livreur' && {
      path: '/',
      element: <SecuriteRoute><Layout2 /></SecuriteRoute>,
      children: [
        {
          path: '/',
          element: <PageLivreur />
        },
        {
          path: '/pageLivreurVente',
          element: <PageLivreurVente />
        },
        {
          path: '/pageCommandeLivraison',
          element: <PageCommandeLivraison />
        },
        {
          path: '/pageLivreurDetail/:id',
          element: <PageLivreurDetail />
        },
        {
          path: '/pageCommandeVentes/:id',
          element: <PageCommandeVente />
        },
        {
          path: '/pageRetourCommande',
          element: <PageRetourCommande />
        },
        {
          path: '/pageLivraisonRetour/:id',
          element: <PageLivraisonRetour />
        },
        {
          path: '/pageCommandeEchange',
          element: <PageCommandeEchange />
        },
        {
          path: '/pageEchange/:id',
          element: <PageEchange />
        },
        {
          path: '/localisation',
          element: <Localisation />
        }
      ]
    },
    {
      path: '/login',
      element: <Login1 />
    },
    {
      path: '/register',
      element: <Register1 />
    },
    {
      path: '/forgot',
      element: <PasswordForgot />
    },
    user?.role === null && {
      path: '/*',
      element: <Page405 />
    },
    {
      path: '/*',
      element:<SecuriteRoute><Page404 /></SecuriteRoute>
    },
  ]);

  return (
    <div>
    <ToastContainer />
      {loading ? (
      <div className="spinnerContainer">
        <HashLoader color="rgb(131, 159, 241)" loading={loading} height={15} radius={2} margin={2} />
      </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default App;