import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { FullPreloader } from '../components/FullPreloader';
import { bindActionCreators } from 'redux';
import { thunkSetValuesList, actionSetValueFromAmount, thunkSetFavoritesValues, actionSetFavoriteModal, thunkSetDefaultFromValue, thunkSetDefaultToValue } from '../redux/reducer';
import { ModalFavoritesValues } from '../components/ModalFavoritesValues';
import { apiValutes } from '../api/apiValutes';

const Converter = (props) => {
  useEffect(() => {
    props.thunkSetValuesList();
    // eslint-disable-next-line
  }, []);


  const refResult = React.createRef();

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
    props.actionSetValueFromAmount(e.target.value);
  }

  const handleSetFromDefaultValue = e => {
    props.thunkSetDefaultFromValue(e.target.value);
  }
  const handleSetToDefaultValue = e => {
    props.thunkSetDefaultToValue(e.target.value);
  }

  return(
    <div>
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
      Converter page
      <button onClick={handleBtnEditFavoritesValues}>Редактировать интересующие валюты</button>
      <form onSubmit={handleFormValue}>
        <div>
          <input 
            type="text" 
            name="amount" 
            value={props.valueFromAmount}
            onChange={handleChangeAmountFrom}
          />
            <select 
              name="fromValue" 
              value={props.defaultFromValue}
              onChange={handleSetFromDefaultValue}
            >
              {props.favoritesValues.map(fv => {
                return(<option key={fv} value={fv}>{fv}</option>);
              })}
            </select>
        </div>

        <div>
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
              return(<option key={fv} value={fv}>{fv}</option>);
            })}
          </select>
        </div>
        <input type="submit" value="Submit"/>
      </form>

      <div ref={refResult}></div>
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
    actionSetValueFromAmount: bindActionCreators(actionSetValueFromAmount, dispatch),
    thunkSetDefaultFromValue: bindActionCreators(thunkSetDefaultFromValue, dispatch),
    thunkSetDefaultToValue: bindActionCreators(thunkSetDefaultToValue, dispatch)
  }
}

export const ConverterContainer = connect(mapStateToProps, mapDispatchToProps)(Converter);