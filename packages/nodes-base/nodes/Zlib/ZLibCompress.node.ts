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

		const propertyName = this.getNodeParameter('propertyName', 'data') as string;
		const propertyNameSink = this.getNodeParameter('propertyNameSink', 'data') as string;

		let compressedMessage = zlib.gzipSync(item.json[propertyName]);

		item.json[propertyNameSink]=compressedMessage;
		return item as INodeExecutionData;
	}
}