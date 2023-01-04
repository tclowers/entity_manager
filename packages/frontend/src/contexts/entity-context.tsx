import React, { useContext, useReducer, createContext } from 'react';
import { Entity } from '../models/entity';
import { EntityField } from '../models/entity-field';

const initialState = {
    name: "Some Entity",
    fields: [ 
        {"name": "item", "type": "STRING", "fieldClass":"REQUIRED", "valueFunction":""},
        {"name": "value", "type": "INTEGER", "fieldClass":"OPTIONAL", "valueFunction":""},
        {"name": "weight", "type":"POUNDS", "fieldClass":"DERIVED", "valueFunction":"value*1.17"},
        {"name": "shippingFee", "type":"DOLLARS", "fieldClass":"DERIVED", "valueFunction":"weight*0.08"}
    ]
}

const addField = (Entity: EntityField[]) => {
    return [
        ...Entity,
        {"idx": Entity.length, "name": "", "type":"", "fieldClass":"", "valueFunction":""}
    ]
}

const changeName = (Entity: EntityField[], name: string, idx: number) => {
    Entity[idx].name = name // should use immutable method here
    return Entity
}


const changeType = (Entity: EntityField[], fieldType: string, idx: number) => {
    Entity[idx].type = fieldType // should use immutable method here
    return Entity
}


const changeClass = (Entity: EntityField[], fieldClass: string, idx: number) => {
    Entity[idx].fieldClass = fieldClass // should use immutable method here
    return Entity
}

const changeValueFunction = (Entity: EntityField[], valueFunction: string, idx: number) => {
    Entity[idx].valueFunction = valueFunction // should use immutable method here
    return Entity
}

type FieldAction =
    | { type: 'changeName', name: string, idx: number }
    | { type: 'changeType', fieldType: string, idx: number }
    | { type: 'changeClass', fieldClass: string, idx: number }
    | { type: 'changeValueFunction', valueFunction: string, idx: number }
    | { type: 'addField' }
    | { type: 'changeEntityName', name: string };

function reducer(state: Entity, action: FieldAction) {
    switch (action.type) {
        case 'addField':
            return { ...state, fields: addField(state.fields) };
        case 'changeName':
            return { ...state, fields: changeName(state.fields, action.name, action.idx) };
        case 'changeType':
            return { ...state, fields: changeType(state.fields, action.fieldType, action.idx) };
        case 'changeClass':
            return { ...state, fields: changeClass(state.fields, action.fieldClass, action.idx) };
        case 'changeValueFunction':
            return { ...state, fields: changeValueFunction(state.fields, action.valueFunction, action.idx) };
        case 'changeEntityName':
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