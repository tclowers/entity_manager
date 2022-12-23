import React, { useContext, useReducer, createContext } from 'react';
import { Props as FieldProps } from '../components/molecules/field';


type FieldState = {
    fields: FieldProps[]
}

const initialState = {
    fields: [ 
        {"key": 0, "name": "item", "type": "STRING", "fieldClass":"REQUIRED", "valueFunction":""},
        {"key": 1, "name": "value", "type": "INTEGER", "fieldClass":"OPTIONAL", "valueFunction":""},
        {"key": 2, "name": "weight", "type":"POUNDS", "fieldClass":"DERIVED", "valueFunction":"value*1.17"}
    ]
}

const addField = (fieldList: FieldProps[]) => {
    return [
        ...fieldList,
        {"key": fieldList.length, "name": "", "type":"", "fieldClass":"", "valueFunction":""}
    ]
}

type FieldAction =
    //  | { type: 'success', results: HNResponse }
    //  | { type: 'failure', error: string }
    | { type: 'addField' };

function reducer(state: FieldState, action: FieldAction) {
    switch (action.type) {
        case 'addField':
        return { ...state, fields: addField(state.fields) };
        default:
        throw new Error();
    }
}

const FieldsContext = createContext<{
    state: FieldState;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });


const FieldsProvider = ({ children }:any) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FieldsContext.Provider value={{ state, dispatch }}>
        {children}
        </FieldsContext.Provider>
    );
};

export const useFieldsContext = () => useContext(FieldsContext);

export default FieldsProvider;