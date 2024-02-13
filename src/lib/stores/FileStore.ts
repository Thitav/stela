import { writable } from 'svelte/store';

export interface IFile {
	path: string;
	data: string;
}

export const file = writable({
	path: 'test',
	data: '# Hello World!'
} as IFile);
