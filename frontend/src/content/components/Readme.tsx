import React, { useState } from 'react';
import { useEffect } from 'react';

import { GoogleGenerativeAI } from '@google/generative-ai';
import Markdown from 'react-markdown';

import { info, error, retrieveAccessToken } from 'utils/helper';
import { getRepoReadme } from 'utils/api';

const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const getReadmeElement = document.querySelector('#readme>.Box-body>.markdown-body');

// TODO: add error message to the user using the clseReadme function
const Readme: React.FC<{ username: string | null; closeReadme: () => void }> = ({ username, closeReadme }) => {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (message !== '') return;
		getReadmeElement?.scrollIntoView({ behavior: 'smooth' });

		setLoading(true);

		getSummary().catch(console.error);
	}, []);

	const getSummary = async () => {
		const accessToken = await retrieveAccessToken();
		if (accessToken === '') return;

		const readmeContent = await getRepoReadme(accessToken);
		if (readmeContent) {
			const prompt = `You are an expert at open source software. Get a summary on this Repo's readme not more than 400 characters on how to contribute, the tools required to contribute and where to go for essistenial information, keep the results short and in markdown format where needed and make it clean: ${readmeContent}`;

			const result = await model.generateContent(prompt);
			const response = result.response.text();
			setLoading(false);
			setMessage(response);
		} else {
			closeReadme();
		}
	};

	return <section className="border-primary border rounded p-2 overscroll-y-auto readme">{loading ? 'Summarizing Readme' : <Markdown>{message}</Markdown>}</section>;
};

export default Readme;
