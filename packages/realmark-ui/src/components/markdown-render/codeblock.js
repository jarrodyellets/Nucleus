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
          padding: '12px',
          background: '#e6ecf0',
          width: '100%',
          margin: '10px 0',
          boxSizing: 'border-box'
        }}
        language={language}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;