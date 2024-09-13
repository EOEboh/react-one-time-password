import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function CodeBlock({ code }: { code: string }) {
    return (
        <div className="code-block">
            <div className="code-block-header">
                <span className="code-block-dot code-block-dot-red" />
                <span className="code-block-dot code-block-dot-yellow" />
                <span className="code-block-dot code-block-dot-green" />
            </div>
            <div className="code-block-content">
                <SyntaxHighlighter language="javascript" style={atomOneLight}>
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    )
}