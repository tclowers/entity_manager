import React, { useContext, useReducer, createContext } from 'react';
import { Resource } from '../models/resource';


const initialState:Resource = {
    id: '',
    name: '',
    fields: {},
}

// const addField = (Entity: EntityField[]) => {
//     return [
//         ...Entity,
//         {"idx": Entity.length, "name": "", "field_type_id":"", "field_class_id":"", "value_function":""}
//     ]
// }

// const changeName = (Entity: EntityField[], name: string, idx: number) => {
//     Entity[idx].name = name // should use immutable method here
//     return Entity
// }


// const changeType = (Entity: EntityField[], field_type_id: string, idx: number) => {
//     Entity[idx].field_type_id = field_type_id // should use immutable method here
//     return Entity
// }


// const changeClass = (Entity: EntityField[], field_class_id: string, idx: number) => {
//     Entity[idx].field_class_id = field_class_id // should use immutable method here
//     return Entity
// }

// const changeValueFunction = (Entity: EntityField[], value_function: string, idx: number) => {
//     Entity[idx].value_function = value_function // should use immutable method here
//     return Entity
// }

type FieldAction =
    // | { type: 'changeName', name: string, idx: number }
    // | { type: 'changeType', field_type_id: string, idx: number }
    // | { type: 'changeClass', field_class_id: string, idx: number }
    // | { type: 'changeValueFunction', value_function: string, idx: number }
    // | { type: 'addField' }
    | { type: 'SET_NAME_AND_ID', name: string, id: string }
    | { type: 'CHANGE_FIELD_VALUE', field_value: string, field_id: string };

function reducer(state: any, action: FieldAction) {
    switch (action.type) {
        // case 'addField':
        //     return { ...state, fields: addField(state.fields) };
        case 'SET_NAME_AND_ID':
            return { ...state, name: action.name, id: action.id };
        // case 'changeType':
        //     return { ...state, fields: changeType(state.fields, action.field_type_id, action.idx) };
        // case 'changeClass':
        //     return { ...state, fields: changeClass(state.fields, action.field_class_id, action.idx) };
        // case 'changeValueFunction':
        //     return { ...state, fields: changeValueFunction(state.fields, action.value_function, action.idx) };
        case 'CHANGE_FIELD_VALUE':
            state.fields[action.field_id] = action.field_value
            return state;
        default:
            throw new Error();
    }
}

const ResourceContext = createContext<{
    state: any;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });


const ResourceProvider = ({ children }:any) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ResourceContext.Provider value={{ state, dispatch }}>
        {children}
        </ResourceContext.Provider>
    );
};

export const useResourceContext = () => useContext(ResourceContext);

export default ResourceProvider;