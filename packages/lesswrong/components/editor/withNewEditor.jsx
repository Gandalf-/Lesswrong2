import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';

import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';

import { Button } from 'react-bootstrap';


// The editor core
import Editor, { Editable, createEmptyState } from 'ory-editor-core';
import { editMode } from 'ory-editor-core/lib/actions/display';

import HeadingsPlugin from './editorPlugins/HeadingsPlugin.js';

// Require our ui components (optional). You can implement and use your own ui too!
import { Trash, DisplayModeToggle, Toolbar } from 'ory-editor-ui';

// The rich text area plugin
import slate, { defaultPlugins } from 'ory-editor-plugins-slate'

// The spacer plugin
import spacer from 'ory-editor-plugins-spacer'

// The image plugin
import image from 'ory-editor-plugins-image'

// The video plugin
import video from 'ory-editor-plugins-video'

// The parallax plugin
import parallax from 'ory-editor-plugins-parallax-background'

// The divider plugin
import divider from 'ory-editor-plugins-divider'

/*
  HoC that instiatiates a new Editor and adds the editor instance to context. The context API is generally discouraged, but I don't want to
  set up all of Redux to give us access to a single global variable, so this is what we will have to deal with for now. I will try to find a solution
  without using the context API at some later point in time. PRs are encouraged.

  The HoC passes the editor object both to context, and to the wrapped component, for convenience.

  TODO: Figure out a way to do this without using context
*/

export const constructSlatePlugins = (defaultPlugins) => {
  const DEFAULT_NODE = 'PARAGRAPH/PARAGRAPH'
  defaultPlugins[2] = new HeadingsPlugin({ DEFAULT_NODE })
  return defaultPlugins
}

function withNewEditor(WrappedComponent) {

  class EditorWrapped extends Component {
    constructor(props) {
      super(props);
      let initialContent = this.props.initialContent;
      let editables = this.props.editables;

      const slatePlugins = constructSlatePlugins(defaultPlugins)

      const plugins = {
        content: [slate(slatePlugins), spacer, image, video, divider],
        layout: [parallax({ defaultPlugin: slate(slatePlugins)}), image] // Define plugins for layout cells
      }
      const editor = new Editor({
        plugins,
        // pass the content state - you can add multiple editables here
        editables: editables,
        defaultPlugin: slate(slatePlugins),
      })
      this.editor = editor;
    }

    customSlatePlugins(defaultPlugins) {
      // Remove the H1, H3, H4 and H5


      return defaultPlugins
    }

    getChildContext() {
      return {editor: this.editor};
    }
    render() {
      return <WrappedComponent editor={this.editor} {...this.props} />
    }
  }
  EditorWrapped.childContextTypes = {
    editor: PropTypes.object,
  };
  return EditorWrapped;
}
export default withNewEditor;