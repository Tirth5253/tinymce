import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MentionSelect from './MentionSelect';

const EditorComponent = ({ trigger }) => {
  const editorRef = useRef(null);
  const [mentionItems, setMentionItems] = useState([]);
  const [mentionQuery, setMentionQuery] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const initialData = [
        { id: 1, name: "John Smith" },
        { id: 2, name: "Alice Johnson" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Williams" },
        { id: 5, name: "David King" },
        { id: 1, name: "John Smith" },
        { id: 2, name: "Alice Johnson" },
        { id: 3, name: "Michael Brown" },
        { id: 4, name: "Emily Williams" },
        { id: 5, name: "David King" }
      ];
      setMentionItems(initialData);
    };
    fetchData();

  }, []);

  const handleEditorKeyUp = (e) => {

  };

  const handleMentionInputChange = (newValue) => {
    setMentionQuery(newValue);
  };

  const handleMentionItemSelect = (item) => {
    setSelectedOption(false);
    const range = editorRef.current.editor.selection.getRng();
    const selectedContent = range.startContainer.data;
    const atIndex = selectedContent.lastIndexOf(`${trigger}`);
    const newText = selectedContent.substring(0, `${trigger}`) + `${item.label}`;
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, atIndex);
    newRange.setEnd(range.startContainer, range.startOffset);
    newRange.deleteContents();
    newRange.insertNode(document.createTextNode(newText));
    editorRef.current.editor.focus();
    const cursorPosition = getCaretPosition();
    setCursorPosition(cursorPosition);
  };

  const getCaretPosition = () => {
    const range = editorRef.current.editor.selection.getRng();
    const rect = range.getBoundingClientRect();
    return { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX };
  };

  const mentionOptions = mentionItems
    .filter(item => item.name.toLowerCase().includes(mentionQuery.toLowerCase()))
    .map(item => ({ value: item.id, label: `{{${item.name}}}` }));

  const handleEditorChange = (content, editor) => {
    const lastChars = content.slice(-(trigger.length));

    if (lastChars === trigger) {
      const cursorPosition = getCaretPosition();
      setCursorPosition(cursorPosition);
      setSelectedOption(true);
    } else {
      setSelectedOption(false);
    }
  };

  return (
    <div>
      <Editor
        apiKey='ra9rrjbq3oxwoet1y1akxu59dsbb395zplavc5hsn3ce1weg'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          setup: function (editor) {
            editor.on('input', function (e) {
              handleEditorChange(editor.getContent({ format: 'text' }), editor);
            });
            editor.on('keyup', function (e) {
              handleEditorKeyUp(e);
            });
            editor.on('click', function (e) {
              setSelectedOption(null);
            });
          }
        }}
        ref={editorRef}
      />
      <MentionSelect
        cursorPosition={cursorPosition}
        selectedOption={selectedOption}
        mentionOptions={mentionOptions}
        handleMentionInputChange={handleMentionInputChange}
        handleMentionItemSelect={handleMentionItemSelect}
      />
    </div>
  );
};

export default EditorComponent;
