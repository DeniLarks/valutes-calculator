import { apiValutes } from "../api/apiValutes";

const SET_VALUES_LIST = 'SET_VALUES_LIST';
const SET_LOAD_ALL_VALUES = 'SET_LOAD_ALL_VALUES';
const SET_FAVORITE_MODAL = 'SET_FAVORITE_MODAL';
const SET_FAVORITES_VALUES = 'SET_FAVORITES_VALUES';
const SET_VALUE_FROM_AMOUNT = 'SET_VALUE_FROM_AMOUNT';
const SET_DEFAULT_FROM_VALUE = 'SET_DEFAULT_FROM_VALUE';
const SET_DEFAULT_TO_VALUE = 'SET_DEFAULT_TO_VALUE';


const LS_FAVORITES_VALUES = 'LS_FAVORITES_VALUES';
const LS_DEFAULT_FROM_VALUE = 'LS_DEFAULT_FROM_VALUE';
const LS_DEFAULT_TO_VALUE = 'LS_DEFAULT_TO_VALUE';

const initialState = {
  isLoadAllValue: false,
  isFavoriteModal: false,
  favoritesValues: [],
  valueFromAmount: 0,
  defaultFromValue: localStorage.getItem(LS_DEFAULT_FROM_VALUE) || '',
  defaultToValue: localStorage.getItem(LS_DEFAULT_TO_VALUE) || '',
  valuesList: [  ],
}

export const reducer = (state = initialState, action) => {
  switch(action.type) {
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
    if(localStorage.getItem(LS_FAVORITES_VALUES) && JSON.parse(localStorage.getItem(LS_FAVORITES_VALUES)).length > 0) {
      dispatch(actionSetFavoritesValues(JSON.parse(localStorage.getItem(LS_FAVORITES_VALUES))));
    } else {
      dispatch(actionSetFavoriteModal(true));
    }
  })
}