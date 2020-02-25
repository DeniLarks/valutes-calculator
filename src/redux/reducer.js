import { apiValutes } from "../api/apiValutes";

const SET_VALUES_LIST = 'SET_VALUES_LIST';
const SET_LOAD_ALL_VALUES = 'SET_LOAD_ALL_VALUES';
const SET_FAVORITE_MODAL = 'SET_FAVORITE_MODAL';
const SET_FAVORITES_VALUES = 'SET_FAVORITES_VALUES';
const SET_VALUE_FROM_AMOUNT = 'SET_VALUE_FROM_AMOUNT';
const SET_DEFAULT_FROM_VALUE = 'SET_DEFAULT_FROM_VALUE';
const SET_DEFAULT_TO_VALUE = 'SET_DEFAULT_TO_VALUE';

const SET_VALUES_PAIR_MODAL = 'SET_VALUES_PAIR_MODAL';
const SET_VALUES_PAIRS = 'SET_VALUES_PAIRS';
const ADD_VALUES_PAIR = 'ADD_VALUES_PAIR';
const DELETE_VALUE_PAIR = 'DELETE_VALUE_PAIR';
const SET_QUOTATION_VALUES_PAIR = 'GET_QUOTATION_VALUES_PAIRS';


const LS_FAVORITES_VALUES = 'LS_FAVORITES_VALUES';
const LS_DEFAULT_FROM_VALUE = 'LS_DEFAULT_FROM_VALUE';
const LS_DEFAULT_TO_VALUE = 'LS_DEFAULT_TO_VALUE';
const LS_VALUES_PAIRS = 'LS_VALUES_PAIRS';

const initialState = {
  isLoadAllValue: false,
  isFavoriteModal: false,
  isValuesPairsModal: false,
  favoritesValues: [],
  valueFromAmount: 0,
  defaultFromValue: localStorage.getItem(LS_DEFAULT_FROM_VALUE) || '',
  defaultToValue: localStorage.getItem(LS_DEFAULT_TO_VALUE) || '',
  valuesPairs: [],
  quotationPairs: {},
  valuesList: [],
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_QUOTATION_VALUES_PAIR: return {
      ...state, 
      quotationPairs: {
        ...state.quotationPairs, 
        [action.payload.id]: action.payload.quotation
      }
    }
    case SET_VALUES_PAIRS: return {...state, valuesPairs: action.payload}
    case DELETE_VALUE_PAIR: return {
      ...state, 
      valuesPairs: state.valuesPairs.filter(el => el.id !== action.payload)}
    case ADD_VALUES_PAIR: 
      if(state.valuesPairs.some(el => el.id === action.payload.id)) {
        alert('Уже есть такая пара')
        return state;
      }
      if(!action.payload.pair[0].code || !action.payload.pair[1].code){
        alert('Пустые значения');
        return state;
      }
      return {
        ...state, 
        valuesPairs: state.valuesPairs.concat([action.payload])
      }
    case SET_VALUES_PAIR_MODAL: return {...state, isValuesPairsModal: action.payload}
    case SET_DEFAULT_FROM_VALUE: return {...state, defaultFromValue: action.payload}
    case SET_DEFAULT_TO_VALUE: return {...state, defaultToValue: action.payload}
    case SET_VALUE_FROM_AMOUNT: return {...state, valueFromAmount: action.payload}
    case SET_FAVORITES_VALUES: return {...state, favoritesValues: action.payload}
    case SET_FAVORITE_MODAL: return {...state, isFavoriteModal: action.payload}
    case SET_LOAD_ALL_VALUES: return {...state, isLoadAllValue: action.payload}
    case SET_VALUES_LIST: return {...state, valuesList: action.payload}
    default: return state;
  }
}

export const actionAddValuesPair = newPair => {
  return {
    type: ADD_VALUES_PAIR,
    payload: newPair
  }
}

const actionSetValuesPairs = newPairs => {
  return {
    type: SET_VALUES_PAIRS,
    payload: newPairs
  }
}

const actionSetOneQuotation = (idPair, quotation) => {
  return {
    type: SET_QUOTATION_VALUES_PAIR,
    payload: {
      id: idPair,
      quotation: quotation
    }
  }
}

export const thunkGetQuotationValuePairs = valuesPairs => dispatch => {
  valuesPairs.forEach(pair => {
    apiValutes.getRatio(pair.pair[0].code, pair.pair[1].code, 1)
      .then(response => {
        dispatch(actionSetOneQuotation(pair.id, response.data.rates[pair.pair[1].code].rate))
      })  
  })
  
}

export const saveValuesPair = valuesPairs => dispatch => {
  localStorage.setItem(LS_VALUES_PAIRS, JSON.stringify(valuesPairs));
}

export const actionDeleteValuePair = pair => {
  return {
    type: DELETE_VALUE_PAIR,
    payload: pair
  }
}


export const actionSetValuesPairsModal = newValue => {
  return {
    type: SET_VALUES_PAIR_MODAL,
    payload: newValue
  }
}


const actionSetDefaultFromValue = newValue => {
  return {
    type: SET_DEFAULT_FROM_VALUE,
    payload: newValue
  }
}
export const thunkSetDefaultFromValue = newValue => dispatch => {
  localStorage.setItem(LS_DEFAULT_FROM_VALUE, newValue);
  dispatch(actionSetDefaultFromValue(newValue));
}
const actionSetDefaultToValue = newValue => {
  return {
    type: SET_DEFAULT_TO_VALUE,
    payload: newValue
  }
}
export const thunkSetDefaultToValue = newValue => dispatch => {
  localStorage.setItem(LS_DEFAULT_TO_VALUE, newValue);
  dispatch(actionSetDefaultToValue(newValue));
}

export const actionSetValueFromAmount = newAmount => {
  return {
    type: SET_VALUE_FROM_AMOUNT,
    payload: newAmount
  }
}


const actionSetFavoritesValues = (newValues) => {
  return {
    type: SET_FAVORITES_VALUES,
    payload: newValues
  }
}
export const thunkSetFavoritesValues = (newValues) => (dispatch) => {
  dispatch(actionSetFavoritesValues(newValues));
  localStorage.setItem(LS_FAVORITES_VALUES, JSON.stringify(newValues));
}


export const actionSetFavoriteModal = isValue => {
  return {
    type: SET_FAVORITE_MODAL,
    payload: isValue
  }
}
const actionSetLoadAllValue = isValue => {
  return {
    type: SET_LOAD_ALL_VALUES,
    payload: isValue
  }
}
const actionSetValuesList = (valuesList) => { 
  return {
    type: SET_VALUES_LIST,
    payload: valuesList
  }
}
export const thunkSetValuesList = () => (dispatch) => { 
  dispatch(actionSetLoadAllValue(true));

  apiValutes.getValues().then((response) => {
    const values = response.data.currencies;
    let arrValues = [];
    for(let key in values) arrValues.push({code: key, title: values[key]})
    dispatch(actionSetValuesList(arrValues))
    dispatch(actionSetLoadAllValue(false));
    if(localStorage.getItem(LS_FAVORITES_VALUES) 
      && JSON.parse(localStorage.getItem(LS_FAVORITES_VALUES)).length > 0) {
      dispatch(actionSetFavoritesValues(JSON.parse(localStorage.getItem(LS_FAVORITES_VALUES))));
    } else {
      dispatch(actionSetFavoriteModal(true));
    }
  })
}

export const thunkSetValuesListForValuesPair = () => dispatch => {
  dispatch(actionSetLoadAllValue(true));
  
  apiValutes.getValues().then((response) => {
    const values = response.data.currencies;
    let arrValues = [];
    for(let key in values) arrValues.push({code: key, title: values[key]})
    dispatch(actionSetValuesList(arrValues))
    dispatch(actionSetLoadAllValue(false));
    if(JSON.parse(localStorage.getItem(LS_VALUES_PAIRS)) 
      && JSON.parse(localStorage.getItem(LS_VALUES_PAIRS)).length > 0) {
        dispatch(actionSetValuesPairs(JSON.parse(localStorage.getItem(LS_VALUES_PAIRS))));
    } else {
      dispatch(actionSetValuesPairsModal(true));
    }
  })
}