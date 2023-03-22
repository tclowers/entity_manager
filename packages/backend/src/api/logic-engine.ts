import axios from 'axios';
import { logicEngineRoute, ApiAction } from './common';
import { ResourceField } from '/models/resource-field';

export const evaluateResource = async (fields: ResourceField[]) => {
    const res = await axios({
        url: logicEngineRoute('/evaluate-resource'),
        method: 'post',
        data: { resource: fields }
    });
        
    return res.data;
}