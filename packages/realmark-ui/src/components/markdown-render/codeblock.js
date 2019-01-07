import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles/hljs';

class CodeBlock extends Component {

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter
        style={github}
        customStyle={{
          borderRadius: '0.25em',
          textAlign: 'left',
          padding: '0.6em 2em calc(0.6em + 1px)',
        }}
        language={language}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;