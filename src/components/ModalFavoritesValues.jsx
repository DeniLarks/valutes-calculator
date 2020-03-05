import React from 'react';

export const ModalFavoritesValues = (props) => {
    const handlerSubmit = (e) => {
        e.preventDefault();
        let values = [];
        e.target.favorites.forEach(f => {if(f.checked) values.push({code: f.value, title: f.getAttribute('data-title')})} );
        
        if(values.length > 0) {
            props.thunkSetFavoritesValues(values);
            props.actionSetFavoriteModal(false);
        } else {
            alert('Ничего не выбрано');
        }
        

        if(values.length > 0) {
            props.thunkSetDefaultFromValue(values[0].code);
            if(values.length > 1) props.thunkSetDefaultToValue(values[1].code);
            else props.thunkSetDefaultToValue(values[0].code);
        }
    }
    
    return (
        <div className="modal">
            <div className="modal-value modal--favorite-values">
                {/* <div className="container"> */}
                    <div className="modal__header">
                        <h2>Чтобы пользоваться конвертером добавьте интересующие валюты</h2>
                    </div>
                    <div className="modal__content">
                        <form className="container" id="change-favorite-values" onSubmit={handlerSubmit}>
                            {props.valuesList.map(el => {
                                return (
                                    <div className="value-item" key={el.code}>
                                        <input
                                            name="favorites" 
                                            id={el.code} 
                                            type="checkbox"
                                            defaultChecked={props.favoritesValues.some(fel => el.code === fel.code)} 
                                            value={el.code}
                                            data-title={el.title} 
                                        />
                                        <label 
                                            htmlFor={el.code}
                                        >{el.code} &nbsp; {el.title}</label>
                                    </div>
                                )
                            })}
                        </form>
                    </div>
                    <div className="modal__footer">
                    <button className="btn" form="change-favorite-values">OK</button>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}