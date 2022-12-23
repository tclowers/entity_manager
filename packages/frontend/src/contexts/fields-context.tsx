import React, { useContext, useReducer, createContext } from 'react';
import { Props as FieldProps } from '../components/molecules/field';


type FieldState = {
    fields: FieldProps[]
}

const initialState = {
    fields: [ 
        {"idx": 0, "name": "item", "type": "STRING", "fieldClass":"REQUIRED", "valueFunction":""},
        {"idx": 1, "name": "value", "type": "INTEGER", "fieldClass":"OPTIONAL", "valueFunction":""},
        {"idx": 2, "name": "weight", "type":"POUNDS", "fieldClass":"DERIVED", "valueFunction":"value*1.17"}
    ]
}

const addField = (fieldList: FieldProps[]) => {
    return [
        ...fieldList,
        {"idx": fieldList.length, "name": "", "type":"", "fieldClass":"", "valueFunction":""}
    ]
}


const changeName = (fieldList: FieldProps[], name: string, idx: number) => {
    fieldList[idx].name = name // should use immutable method here
    return fieldList
}

type FieldAction =
    //  | { type: 'success', results: HNResponse }
    | { type: 'changeName', name: string, idx: number }
    | { type: 'addField' };

function reducer(state: FieldState, action: FieldAction) {
    switch (action.type) {
        case 'addField':
            return { ...state, fields: addField(state.fields) };
        case 'changeName':
            return { ...state, fields: changeName(state.fields, action.name, action.idx) };
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