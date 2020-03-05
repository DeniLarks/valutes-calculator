import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FullPreloader } from '../components/FullPreloader';
import { bindActionCreators } from 'redux';
import { thunkSetValuesList, setValueFromAmount, thunkSetFavoritesValues, actionSetFavoriteModal, thunkSetDefaultFromValue, thunkSetDefaultToValue } from '../redux/reducer';
import { ModalFavoritesValues } from '../components/ModalFavoritesValues';
import { apiValutes } from '../api/apiValutes';

const Converter = (props) => {
  useEffect(() => {
    props.thunkSetValuesList();
    // eslint-disable-next-line
  }, []);

  const handleFormValue = e => {
    e.preventDefault();
    const form = e.target;
    
    apiValutes.getRatio(form.fromValue.value, form.toValue.value, form.amount.value)
      .then(response => {
        form.amountTo.value = response.data.rates[form.toValue.value].rate_for_amount;
      });
  }

  const handleBtnEditFavoritesValues = () => {
    props.actionSetFavoriteModal(true);
  }

  const handleChangeAmountFrom = e => {
    props.thunkSetValueFromAmount(e.target.value);
  }

  const handleSetFromDefaultValue = e => {
    props.thunkSetDefaultFromValue(e.target.value);
  }

  const handleSetToDefaultValue = e => {
    props.thunkSetDefaultToValue(e.target.value);
  }

  return(
    <div className="form-convert-container">
      {props.isLoadAllValue && <FullPreloader /> }
      {props.isFavoriteModal && 
        <ModalFavoritesValues 
          valuesList={props.valuesList}
          favoritesValues={props.favoritesValues}
          actionSetFavoriteModal={props.actionSetFavoriteModal}
          thunkSetFavoritesValues={props.thunkSetFavoritesValues}
          thunkSetDefaultFromValue={props.thunkSetDefaultFromValue}
          thunkSetDefaultToValue={props.thunkSetDefaultToValue}
        /> 
      }
      <button className="btn btn-converter" onClick={handleBtnEditFavoritesValues}>
        Редактировать интересующие валюты
      </button>
      
      <form onSubmit={handleFormValue}>
        <div className="form_input-container">
          <input 
            type="text" 
            name="amount" 
            value={props.valueFromAmount}
            autoComplete="off"
            onChange={handleChangeAmountFrom}
          />
            <select 
              name="fromValue" 
              value={props.defaultFromValue}
              onChange={handleSetFromDefaultValue}
            >
              {props.favoritesValues.map(fv => {
                return(<option key={fv.code} value={fv.code}>{fv.code}</option>);
              })}
            </select>
        </div>

        
        <div className="form_input-container">
          <input 
            type="text" 
            name="amountTo"
            readOnly
          />
          <select 
            name="toValue" 
            value={props.defaultToValue}
            onChange={handleSetToDefaultValue}
          >
            {props.favoritesValues.map(fv => {
              return(<option key={fv.code} value={fv.code}>{fv.code}</option>);
            })}
          </select>
        </div>
        <input className="btn btn-converter" type="submit" value="Посчитать"/>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoadAllValue: state.isLoadAllValue,
    isFavoriteModal: state.isFavoriteModal,
    valuesList: state.valuesList,
    favoritesValues: state.favoritesValues,
    valueFromAmount: state.valueFromAmount,
    valueToAmount: state.valueToAmount,
    defaultFromValue: state.defaultFromValue,
    defaultToValue: state.defaultToValue
  }
}
const mapDispatchToProps = dispatch => {
  return {
    thunkSetValuesList: bindActionCreators(thunkSetValuesList, dispatch),
    thunkSetFavoritesValues: bindActionCreators(thunkSetFavoritesValues, dispatch),
    actionSetFavoriteModal: bindActionCreators(actionSetFavoriteModal, dispatch),
    thunkSetValueFromAmount: bindActionCreators(setValueFromAmount, dispatch),
    thunkSetDefaultFromValue: bindActionCreators(thunkSetDefaultFromValue, dispatch),
    thunkSetDefaultToValue: bindActionCreators(thunkSetDefaultToValue, dispatch)
  }
}

export const ConverterContainer = connect(mapStateToProps, mapDispatchToProps)(Converter);