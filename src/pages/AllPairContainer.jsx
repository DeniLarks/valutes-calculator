import React, { useEffect } from 'react';
import { thunkSetValuesList } from '../redux/reducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AllPair = ({valuesList, thunkSetValuesList}) => {
  useEffect(() => {
    thunkSetValuesList();
    // eslint-disable-next-line
  }, [])

  console.log('valuesList', valuesList)

  return(
    <>
      <h1>ALL PAIRS</h1>
    </>
  )
}

const mapPropsToState = (state) => {
  return {
    valuesList: state.reducer.valuesList
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    thunkSetValuesList: bindActionCreators(thunkSetValuesList, dispatch)
  }
}

export const AllPairContainer = connect(mapPropsToState, mapDispatchtoProps)(AllPair);