import React, { useState } from 'react';
import { useEffect } from 'react';

import OpenAI from 'openai';
import Markdown from 'react-markdown';

import { info, error } from 'utils/helper';
import browser from 'webextension-polyfill';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

const getReadmeElement = document.querySelector('#readme>.Box-body>.markdown-body');

const getReadContent = () => {
	const contentText = getReadmeElement?.textContent;

	return contentText;
};
// TODO: add error message to the user using the clseReadme function
const Readme: React.FC<{ username: string | null; closeReadme: () => void }> = ({ username, closeReadme }) => {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (message !== '') return;
		getReadmeElement?.scrollIntoView({ behavior: 'smooth' });

		setLoading(true);
		if (username === '' || !username) return;
		browser.runtime
			.sendMessage({ action: 'UPDATE_COUNT', username })
			.then(async (response) => {
				if (response) {
					await getSummary();
				} else {
					closeReadme();
				}
				setLoading(false);
				console.log({ response });
			})
			.catch((err) => {
				error('failed update', err);
				closeReadme();
			});
	}, []);

	const getSummary = async () => {
		const completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: `You are an expert at open source software.` },
				{
					role: 'user',
					content: `Get a summary not more than 400 characters on how to contribute, the tools required to contribute and where to go for essistenial information, keep the results short and in markdown format where needed and make it clean: ${getReadContent()}`,
				},
			],
		});

		console.log({ message: completion.choices[0].message.content });
		setMessage(completion.choices[0].message.content as string);
	};

	return <section className="border-primary border rounded p-2 overscroll-y-auto readme">{loading ? 'Summarizing Readme' : <Markdown>{message}</Markdown>}</section>;
};

export default Readme;
