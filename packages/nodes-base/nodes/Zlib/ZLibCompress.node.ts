var zlib = require('zlib');
import { IExecuteSingleFunctions } from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

export class ZLibCompress implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ZLib Compression',
		name: 'zlibcompress',
		icon: 'file:zlib.png',
		group: ['transform'],
		version: 1,
		description: 'Compres to byte[]',
		defaults: {
			name: 'Compres',
			color: '#F73F39',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Property to Compress',
				name: 'propertyName',
				type: 'string',
				default: 'data',
				description: 'The Json Projery to compress',
            },
            {
				displayName: 'Property to Store the result',
				name: 'propertyNameSink',
				type: 'string',
				default: 'data',
				description: 'The Json Projery to write the result',
			}
		],

	};


	async executeSingle(this: IExecuteSingleFunctions): Promise<INodeExecutionData> {
		// Input data
		const item = this.getInputData();

		let body: IDataObject | string = item.json;

		const propertyName = this.getNodeParameter('propertyName', '') as string;
		const propertyNameSink = this.getNodeParameter('propertyNameSink', '') as string;

        zlib.gzip(item[propertyName], function(err:any, uncompressedMessage:any) {
            if(err) {
              console.log(err)
            }
            else {
                item[propertyNameSink]=uncompressedMessage;
            }
          })
		return { json: item } as INodeExecutionData;

	}
}