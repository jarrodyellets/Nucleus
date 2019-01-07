import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles/hljs';

class CodeInline extends Component {

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter
        style={github}
        customStyle={{
          display: 'inline',
          padding: '0.3em 0.3em calc(0.3em + 1px)',
          borderRadius: '0.15em',
        }}
        language={language}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeInline;