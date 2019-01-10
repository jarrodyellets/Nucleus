import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierForestLight } from 'react-syntax-highlighter/dist/styles/hljs';

class CodeInline extends Component {

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter
        style={atelierForestLight}
        customStyle={{
          display: 'inline',
          padding: '0.3em 0.3em calc(0.3em + 1px)',
          borderRadius: '0.15em',
          background: '#e6ecf0',
          margin: '10px 0',
          width: '100%'
        }}
        language={language}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeInline;