import React, { useEffect } from 'react';
import { thunkSetValuesListForValuesPair, actionSetValuesPairsModal, actionAddValuesPair, actionDeleteValuePair, saveValuesPair, thunkGetQuotationValuePairs } from '../redux/reducer';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FullPreloader } from '../components/FullPreloader';
import { ModalSetPairValues } from '../components/ModalSetPairValues';
import { SmallPreloader } from '../components/SmallPreloader';

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
    <div className="container-values-pairs">
      {props.isLoadAllValue && <FullPreloader /> }
      {props.isValuesPairsModal && <ModalSetPairValues
        valuesList={props.valuesList}
        valuesPairs={props.valuesPairs}
        actionSetValuesPairsModal={props.actionSetValuesPairsModal}
        actionAddValuesPair={props.actionAddValuesPair}
        actionDeleteValuePair={props.actionDeleteValuePair}
        saveValuesPair={props.saveValuesPair}
      />}

      <div className="container-btn-edit-value-pair">
        <button className="btn" onClick={handleEditValutesPairs}>
          Редактировать список валютных пар
        </button>
      </div>

      <div className="values-pairs-list">
        {props.valuesPairs.map(el => {
          return(
            <div className="value-pair" key={el.id}>
              <div>{el.pair[0].code} / {el.pair[1].code}</div>
              <div className="titles">{el.pair[0].title} / {el.pair[1].title}</div>
              <div>
                {props.quotationPairs[el.id] ? props.quotationPairs[el.id] : <SmallPreloader />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
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