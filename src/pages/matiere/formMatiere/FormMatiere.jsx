import React from 'react'

const FormMatiere = ({getUpdataOne,OnchangePut}) => {

  return (
    <>
        <div className="formCategorie">
            <div className="formCategorie-wrapper">
                <div className="categorie-container-left">
                    <input type="text" name='nom' value={getUpdataOne?.nom} onChange={OnchangePut} placeholder='Entrer une matière...' className="categorie-input" />
                </div>
            </div>
        </div>

    </>
  )
}

export default FormMatiere;