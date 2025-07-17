import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../sass/RichText/RichTextEditor.scss';

const RichTextEditor = ({ onContentChange }) => {
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    onContentChange(data);
  };

  return (
    <div className="rich-text-editor-container">
      <CKEditor
        editor={ClassicEditor}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default RichTextEditor;
