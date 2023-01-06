import React, { useContext, useReducer, createContext } from 'react';
import { Entity } from '../models/entity';
import { EntityField } from '../models/entity-field';

const initialState = {
    name: "Some Entity",
    fields: [ 
        {"name": "item", "type": "5e0cfb65-7cda-494c-844a-87bb922535da", "fieldClass":"2ea5efde-5ab1-456b-9ad8-8fc7132b8079", "valueFunction":""},
        {"name": "value", "type": "227cc35c-a475-45ad-95d5-b998b25b17b6", "fieldClass":"3525ab51-31ce-4b6e-ad8c-422ab11c8a5d", "valueFunction":""},
        {"name": "weight", "type":"c0694b25-bf84-4a55-a106-3d6daf2f1bf1", "fieldClass":"b34ead69-dd7e-4006-9f5d-5b093e658e3f", "valueFunction":"value*1.17"},
        {"name": "shippingFee", "type":"c40c7295-90fc-48e3-b995-86e379578295", "fieldClass":"b34ead69-dd7e-4006-9f5d-5b093e658e3f", "valueFunction":"weight*0.08"}
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