import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createImagePlugin, { imageCreator, imageStyles } from 'draft-js-image-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import { EditorState } from 'draft-js';
import style from '../../../node_modules/draft-js-linkify-plugin/lib/plugin.css';

const imagePlugin = createImagePlugin({});
const linkifyPlugin = createLinkifyPlugin();

 const plugins = [
  imagePlugin,
  linkifyPlugin
];

export default class UnicornEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        plugins={plugins}
        ref="editor"
      />
    );
  }
}
