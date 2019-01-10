import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/styles/hljs';

class CodeBlock extends Component {

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter
        style={atelierForestLight}
        customStyle={{
          borderRadius: '0.25em',
          textAlign: 'left',
          padding: '0.6em 2em calc(0.6em + 1px)',
          background: '#e6ecf0',
          margin: '10px 0'
        }}
        language={language}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;