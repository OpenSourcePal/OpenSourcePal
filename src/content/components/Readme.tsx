import React, { useState } from 'react';
import { useEffect } from 'react';

import OpenAI from 'openai';
import Markdown from 'markdown-to-jsx';

import { info } from 'utils/helper';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
	dangerouslyAllowBrowser: true,
});

const getReadContent = () => {
	const contentElement = document.querySelector('#readme>.Box-body>.markdown-body');
	info('element', contentElement);
	const contentText = contentElement?.textContent;

	return contentText;
};

const Readme: React.FC = () => {
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (message !== '') return;

		(async () => {
			setLoading(true);
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

			setMessage(completion.choices[0].message.content as string);
			setLoading(false);
		})();
	}, []);

	return <section className="border-primary border rounded p-2 overscroll-y-auto readme">{loading ? 'Summarizing Readme' : <Markdown>{message}</Markdown>}</section>;
};

export default Readme;
