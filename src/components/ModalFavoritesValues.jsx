import React from 'react';

export const ModalFavoritesValues = (props) => {
        
    const handlerSubmit = (e) => {
        e.preventDefault();
        let values = [];
        e.target.favorites.forEach(f => {if(f.checked) values.push(f.value)} );
        props.thunkSetFavoritesValues(values);
        props.actionSetFavoriteModal(false);

        if(values.length > 0) {
            props.thunkSetDefaultFromValue(values[0]);

            if(values.length > 1) props.thunkSetDefaultToValue(values[1]);
            else props.thunkSetDefaultToValue(values[0])
        }
    }
    
    return (
        <div className="modal">
            <div className="modal--favorite-values">
                <div className="modal__header">
                    <h2>Чтобы пользоваться конвертером добавьте интересующие валюты</h2>
                </div>
                <div className="modal__content">
                    <form id="change-favorite-values" onSubmit={handlerSubmit}>
                        {props.valuesList.map(el => {
                            return (
                                <div key={el.code}>
                                    <input
                                        name="favorites" 
                                        id={el.code} 
                                        type="checkbox"
                                        defaultChecked={props.favoritesValues.includes(el.code)} 
                                        value={el.code} 
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
                    <button form="change-favorite-values">OK</button>
                </div>
            </div>
        </div>
    )
}