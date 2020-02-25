import React, { useEffect } from 'react';
import { thunkSetValuesListForValuesPair, actionSetValuesPairsModal, actionAddValuesPair, actionDeleteValuePair, saveValuesPair, thunkGetQuotationValuePairs } from '../redux/reducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FullPreloader } from '../components/FullPreloader';
import { ModalSetPairValues } from '../components/ModalSetPairValues';

const AllPair = (props) => {
  useEffect(() => {
    props.thunkSetValuesListForValuesPair();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(!props.isValuesPairsModal && props.valuesPairs.length > 0) {
      props.thunkGetQuotationValuePairs(props.valuesPairs);
    }
    // eslint-disable-next-line
  }, [props.valuesPairs, props.isValuesPairsModal])

  const handleEditValutesPairs = () => {
    props.actionSetValuesPairsModal(true);
  }

  return(
    <>
      {props.isLoadAllValue && <FullPreloader /> }
      {props.isValuesPairsModal && <ModalSetPairValues
        valuesList={props.valuesList}
        valuesPairs={props.valuesPairs}
        actionSetValuesPairsModal={props.actionSetValuesPairsModal}
        actionAddValuesPair={props.actionAddValuesPair}
        actionDeleteValuePair={props.actionDeleteValuePair}
        saveValuesPair={props.saveValuesPair}
      />}

      <h1>ALL PAIRS</h1>
      <button onClick={handleEditValutesPairs}>Edit</button>
      {props.valuesPairs.map(el => {
        return(
          <div key={el.id}>
            <div>{el.pair[0].code} / {el.pair[1].code}</div>
            <div>
              {props.quotationPairs[el.id] ? props.quotationPairs[el.id] : 'Loading...'}
            </div>
          </div>
        )
      })}
    </>
  )
}

const mapPropsToState = (state) => {
  return {
    isLoadAllValue: state.isLoadAllValue,
    valuesPairs: state.valuesPairs,
    valuesList: state.valuesList,
    isValuesPairsModal: state.isValuesPairsModal,
    quotationPairs: state.quotationPairs
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    thunkSetValuesListForValuesPair: bindActionCreators(thunkSetValuesListForValuesPair, dispatch),
    actionSetValuesPairsModal: bindActionCreators(actionSetValuesPairsModal, dispatch),
    actionAddValuesPair: bindActionCreators(actionAddValuesPair, dispatch),
    actionDeleteValuePair: bindActionCreators(actionDeleteValuePair, dispatch),
    saveValuesPair: bindActionCreators(saveValuesPair, dispatch),
    thunkGetQuotationValuePairs: bindActionCreators(thunkGetQuotationValuePairs, dispatch)
  }
}

export const AllPairContainer = connect(mapPropsToState, mapDispatchtoProps)(AllPair);