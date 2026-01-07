import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import './varianteProduit.scss'
import {FilterOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import config from '../../config';
import ReactPaginate from 'react-paginate';
import { Modal, Skeleton } from 'antd'
import PageDetails from '../PageDetails/PageDetails'
import { useVarianteProduit } from './hooks/useVarianteProduit';

const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [matiere,setMatiere] = useState(null);
    const [couleur, setCouleur] = useState(null);
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [taille, setTaille] = useState(null);
    const { getMarque, getCible, getTaille, getMatiere, getFamille, getCouleur, data, loading } = useVarianteProduit({famille, marque, cible, taille, couleur, matiere})
    const [currentPage, setCurrentPage] = useState(0);
    const groupedData = Object.values(
      data.reduce((acc, item) => {
        const { code_variant, ...rest } = item;
        if (acc[code_variant]) {
          Object.assign(acc[code_variant], { data: [...acc[code_variant].data, rest] });
        } else {
          acc[code_variant] = { code_variant, data: [rest] };
        }
        return acc;
      }, {})
    );
    const itemsPerPage = 12;
    const totalPages = Math.ceil(groupedData.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const firstDataArray = groupedData.map(obj => obj.data[0]);
    const currentData = firstDataArray?.slice(startIndex, endIndex);
    const [opens, setOpens] = useState(false);
    const [idVariant, setvariant] = useState({});
    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };

    const showModalPhone = (e) => {
      setOpens(true);
      setvariant(e)
    };

  return (
    <>
        <div className="varianteProduit">
              <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">Notre catalogue</h2>
                    </div>
                </div>
                <div className="variant-container-bottom">
                    <div className="variant_top">
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Categorie</span>
                          </div>
                          <Select
                            name='id_famille'
                            className='variant-select'
                            options={getFamille?.map(item => ({ value: item.id_famille, label: item.nom }))}
                            isMulti
                            onChange={(selectedOption) =>{
                              const selectedValues = selectedOption.map(option => option.value)
                              setFamille(selectedValues)
                            }}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Marque</span>
                          </div>
                          <Select
                            name='id_marque'
                            className='variant-select'
                            isMulti
                            options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                            onChange={(selectedOption) =>{
                              const selectedValues = selectedOption.map(option => option.value)
                              setMarque(selectedValues)
                            }}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Cible</span>
                          </div>
                          <Select
                            name='id_cible'
                            className='variant-select'
                            isMulti
                            options={getCible?.map(item => ({ value: item.id_cible, label: item.nom_cible }))}
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value)
                              setCible(selectedValue)}
                            }
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Pointure</span>
                          </div>
                          <Select
                            name='id_taille'
                            className='variant-select'
                            options={getTaille
                              ?.sort((a, b) => a.id_taille - b.id_taille) // Tri par ordre croissant des tailles
                              .map(item => ({ value: item.id_taille, label: item.taille }))
                            }
                            isMulti
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value);
                              setTaille(selectedValue);
                            }}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Couleur</span>
                          </div>
                          <Select
                            name='id_couleur'
                            className='variant-select'
                            options={getCouleur?.map(item => ({ value: item.id_couleur, label: item.description }))}
                            isMulti
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value)
                              setCouleur(selectedValue)}
                            }
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Matiere</span>
                          </div>
                          <Select
                            name='id_matiere'
                            className='variant-select'
                            options={getMatiere?.map(item => ({ value: item.id_matiere, label: item.nom_matiere }))}
                            isMulti
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value)
                              setMatiere(selectedValue)}
                            }
                          />
                        </div>
                    </div>
                    <div className="variant_bottom">
                    { loading ? (
                      <div className="skeleton-container">
                        {[...Array(4)].map((_, index) => (
                          <div key={index} className="skeleton-group">
                            {[...Array(3)].map((_, innerIndex) => (
                          <div key={innerIndex} className="skeleton-item">
                            <Skeleton.Image style={{ width: 350, height: 350 }} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                    ) : (
                      <div className="variante-top-rows">
                      {
                        currentData?.map((dd)=>(
                        <div className="variante-top-row" key={dd.id} onClick={()=>showModalPhone(dd.id_varianteProduit)}>
                          <div className="cercle"></div>
                          <img src={`${DOMAIN}${dd.img}`} alt="" className="variante-img" />
                        </div>
                        ))}
                      </div>
                      
                      )}
                      <Modal
                          title=""
                          centered
                          open={opens}
                          onCancel={() => setOpens(false)}
                          width={1100}
                          footer={[
                            
                          ]}
                        >
                          <PageDetails id={idVariant}/>
                        </Modal>
                        {!loading && (
                        <ReactPaginate
                          pageCount={totalPages}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          onPageChange={handlePageChange}
                          previousLabel={<LeftOutlined />}
                          nextLabel={<RightOutlined />}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                          itemClass={'pointer-cursor'}
                        />
                      )}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VarianteProduit