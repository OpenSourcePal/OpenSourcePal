import React, { useState } from 'react';

import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Icon } from '@iconify/react';

type AccordionProps = {
	title: string;
	body: string;
};

const Accordion = ({ title, body }: AccordionProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="bg-brand flex flex-col">
			<p onClick={() => setIsOpen(!isOpen)} className="p-2 flex justify-between items-center cursor-pointer font-medium">
				<span>{title}</span>
				<Icon icon={`tabler:${isOpen ? 'minus' : 'plus'}`} />
			</p>
			{isOpen && (
				<div className="bg-secondary px-3 py-1 text-primary">
					<Markdown
						className="resource overflow-y-auto"
						components={{
							code(props: { [x: string]: any; children: any; className: any; node: any }) {
								const { children, className, node, ...rest } = props;
								return <SyntaxHighlighter {...rest} children={String(children).replace(/\n$/, '')} style={coldarkDark} language="bash" wrapLongLines CodeTag="div" />;
							},
						}}
						rehypePlugins={[rehypeRaw]}
						children={body}
					/>
				</div>
			)}
		</div>
	);
};

export default Accordion;
