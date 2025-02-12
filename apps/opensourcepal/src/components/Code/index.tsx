import React from 'react';
import Markdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';

const index = ({ body }: { body: string }) => {
	body = `\`\`\`${body}\`\`\``;
	return (
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
	);
};

export default index;
