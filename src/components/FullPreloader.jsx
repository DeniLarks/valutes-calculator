import React from 'react';
import gifPreloader from '../media/preloader.gif';


export const FullPreloader = () => {
    return(
        <div className="modal">
            <div className="modal--preloader">
                <img className="preloader-img" src={gifPreloader} alt=""/>
            </div>
        </div>
    )
}