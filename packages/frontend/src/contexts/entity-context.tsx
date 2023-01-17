import React, { useContext, useReducer, createContext } from 'react';
import { Entity } from '../models/entity';
import { EntityField } from '../models/entity-field';

const initialState = {
    name: "Some Entity",
    fields: [ 
        {"name": "item", "field_type_id": "5e0cfb65-7cda-494c-844a-87bb922535da", "field_class_id":"2ea5efde-5ab1-456b-9ad8-8fc7132b8079", "value_function":""},
        {"name": "value", "field_type_id": "227cc35c-a475-45ad-95d5-b998b25b17b6", "field_class_id":"3525ab51-31ce-4b6e-ad8c-422ab11c8a5d", "value_function":""},
        {"name": "weight", "field_type_id":"c0694b25-bf84-4a55-a106-3d6daf2f1bf1", "field_class_id":"b34ead69-dd7e-4006-9f5d-5b093e658e3f", "value_function":"value*1.17"},
        {"name": "shippingFee", "field_type_id":"c40c7295-90fc-48e3-b995-86e379578295", "field_class_id":"b34ead69-dd7e-4006-9f5d-5b093e658e3f", "value_function":"weight*0.08"}
    ]
}

const addField = (Entity: EntityField[]) => {
    return [
        ...Entity,
        {"idx": Entity.length, "name": "", "field_type_id":"", "field_class_id":"", "value_function":""}
    ]
}

const changeName = (Entity: EntityField[], name: string, idx: number) => {
    Entity[idx].name = name // should use immutable method here
    return Entity
}


const changeType = (Entity: EntityField[], field_type_id: string, idx: number) => {
    Entity[idx].field_type_id = field_type_id // should use immutable method here
    return Entity
}


const changeClass = (Entity: EntityField[], field_class_id: string, idx: number) => {
    Entity[idx].field_class_id = field_class_id // should use immutable method here
    return Entity
}

const changeValueFunction = (Entity: EntityField[], value_function: string, idx: number) => {
    Entity[idx].value_function = value_function // should use immutable method here
    return Entity
}

type FieldAction =
    | { type: 'changeName', name: string, idx: number }
    | { type: 'changeType', field_type_id: string, idx: number }
    | { type: 'changeClass', field_class_id: string, idx: number }
    | { type: 'changeValueFunction', value_function: string, idx: number }
    | { type: 'addField' }
    | { type: 'changeEntityName', name: string };

function reducer(state: Entity, action: FieldAction) {
    switch (action.type) {
        case 'addField':
            return { ...state, fields: addField(state.fields) };
        case 'changeName':
            return { ...state, fields: changeName(state.fields, action.name, action.idx) };
        case 'changeType':
            return { ...state, fields: changeType(state.fields, action.field_type_id, action.idx) };
        case 'changeClass':
            return { ...state, fields: changeClass(state.fields, action.field_class_id, action.idx) };
        case 'changeValueFunction':
            return { ...state, fields: changeValueFunction(state.fields, action.value_function, action.idx) };
        case 'changeEntityName':
            console.log("\n\nChanging Entity Name: %s\n\n", action.name)
            return { ...state, name: action.name };
        default:
            throw new Error();
    }
}

const EntityContext = createContext<{
    state: Entity;
    dispatch: React.Dispatch<any>;
  }>({
    state: initialState,
    dispatch: () => null
  });


const EntityProvider = ({ children }:any) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <EntityContext.Provider value={{ state, dispatch }}>
        {children}
        </EntityContext.Provider>
    );
};

export const useEntityContext = () => useContext(EntityContext);

export default EntityProvider;