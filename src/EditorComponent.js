import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MentionSelect from './MentionSelect';
import './editor.css'

const EditorComponent = ({ trigger,dataKey,controlStyles,menuStyles,optionStyles,containerStyles,placeHolder,nonEditStyle,customOptionStyle }) => {
  const editorRef = useRef(null);
  const [mentionItems, setMentionItems] = useState([]);                                                         //this use State is Contains our data
  const [mentionQuery, setMentionQuery] = useState('');                                                         //this will stores the interMediate Value of the Text we type in the Search area of the React Select
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });                                    //State that will stores the current position of the Cursor 
  const [selectedOption, setSelectedOption] = useState(null);                                                   //Acting as a Flag For the React Select Component
  
  
  useEffect(() => {
    const fetchData = () => {
      const initialData = [
        { id: 1, label: "John Smith" },
        { id: 2, label: "Alice Johnson" },
        { id: 3, label: "Michael Brown" },
        { id: 4, label: "Emily Williams" },
        { id: 5, label: "David King" },
        { id: 1, label: "John Smith" },
        { id: 2, label: "Alice Johnson" },
        { id: 3, label: "Michael Brown" },
        { id: 4, label: "Emily Williams" },
        { id: 5, label: "David King" }
      ];
      setMentionItems(initialData);
    };
    fetchData();

  }, []);



const handleMentionInputChange = (newValue) => {                                                              //Function that Will set the Text that we type in the Search Box of select
    setMentionQuery(newValue);
  };

const handleMentionItemSelect = (item) => {
    setSelectedOption(false);
    const range = editorRef.current.editor.selection.getRng();                                               //this line provides the slection area like start , end etc so we can modify contnet based on the range
    const selectedContent = range.startContainer.data;
    console.log(selectedContent);
    const atIndex = selectedContent.lastIndexOf(`${trigger}`);
    let newText = selectedContent.substring(0, `${trigger}`) + `${item.label}`;
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, atIndex);
    newRange.setEnd(range.startContainer, range.startOffset);
    newRange.deleteContents();
    
   
    const nonEditableSpan = editorRef.current.editor.dom.create('span', {
      contenteditable: 'false',
      'data-mce-contenteditable': 'false',
      style:nonEditStyle,
      
    }, newText);
    

    newRange.insertNode(nonEditableSpan);
    editorRef.current.editor.focus();
; 
  };

const getCaretPosition = () => {
    const range = editorRef.current.editor.selection.getRng();
    const rect = range.getBoundingClientRect();
    return { top: rect.bottom + window.scrollY, left: rect.left + window.scrollX };
  };

const mentionOptions = mentionItems
    .filter(item => item[dataKey].toLowerCase().includes(mentionQuery.toLowerCase()))
    .map(item => ({ value: item.id, label: `{{${item[dataKey]}}}` }));


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
console.log(placeHolder)
  return (
    <div>
      <Editor
        apiKey='ra9rrjbq3oxwoet1y1akxu59dsbb395zplavc5hsn3ce1weg'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'noneditable',
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
        controlStyles={controlStyles}
        menuStyles={menuStyles}
        optionStyles={optionStyles}
        dataKey={dataKey}
        placeholder={placeHolder}
        customOptionStyle={customOptionStyle}
      />
    </div>  
  );
};

export default EditorComponent;
