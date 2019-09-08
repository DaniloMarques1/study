import React, {useEffect} from 'react'

import $ from 'jquery'

import "./Loader.css"

export default function Loader({ show }) {

    useEffect(() => {
        if (show) {
            $("#modalLoader").modal("show")
        } else {
            $("#modalLoader").modal("hide")
        }
    }, [show])


    return (
        <div id="modalLoader" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Carregando...</h5>
                    </div>
                    <div className="modal-body-loader">
                        <div className='loader' id='loader'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}