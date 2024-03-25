import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import MentionSelect from './MentionSelect';

const EditorComponent = ({ trigger,dataKey, dataKey1,controlStyles,menuStyles,optionStyles,containerStyles,placeHolder,nonEditStyle,customOptionStyle,trigger1 }) => {
  const editorRef = useRef(null);
  const [mentionItems, setMentionItems] = useState([]);                                                         
  const [mentionQuery, setMentionQuery] = useState('');                                                         
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });                                    
  const [selectedOption, setSelectedOption] = useState(null);                                                  
  const [selectTrigger,setSelectTrigger]=useState(null);
  const [selectKey,setselectKey]=useState(null);
  
useEffect(() => {
    const fetchData = () => {
      const initialData = [
        { id: 1, label: "John Smith",name12:"abc" },
        { id: 2, label: "Alice Johnson" ,name12:"abc"},
        { id: 3, label: "Michael Brown" ,name12:"abc"},
        { id: 4, label: "Emily Williams" ,name12:"abc"},
        { id: 5, label: "David King" ,name12:"abc"},
        { id: 1, label: "John Smith" ,name12:"abc"},
        { id: 2, label: "Alice Johnson" ,name12:"abc"},
        { id: 3, label: "Michael Brown" ,name12:"abc"},
        { id: 4, label: "Emily Williams",name12:"abc" },
        { id: 5, label: "David King",name12:"abc" }
      ];
      const initialData1 = [
        { id: 1, name: "Tirth Joshi",name12:"abc" },
        { id: 2, name: "Tirth Joshi" ,name12:"abc"},
        { id: 3, name: "Tirth Joshi" ,name12:"abc"},
        { id: 4, name: "Tirth Joshi" ,name12:"abc"},
        { id: 5, name: "Tirth Joshi" ,name12:"abc"},
        { id: 1, name: "Tirth Joshi" ,name12:"abc"},
        { id: 2, name: "Tirth Joshi" ,name12:"abc"},
        
      ];
      if(selectTrigger===trigger1)
      setMentionItems(initialData1);
    else setMentionItems(initialData)
    }
    fetchData();
  }, [selectTrigger,trigger1]);



  

const handleMentionInputChange = (newValue) => {                                                              
    setMentionQuery(newValue);
  };

const handleMentionItemSelect = (item) => {
    setSelectedOption(false);
    const range = editorRef.current.editor.selection.getRng();                                               
    const selectedContent = range.startContainer.data;                                                       
    const atIndex = selectedContent.lastIndexOf(`${selectTrigger}`);                                               
    let newText = selectedContent.substring(0, `${selectTrigger}`) + `${item[dataKey]}`;
    console.log(newText)
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
  .filter(item => item[selectKey] && item[selectKey].toLowerCase().includes(mentionQuery.toLowerCase()))
  .map(item => ({ value: item.id, label: `{{${item[selectKey]}}}` }) );



const handleEditorChange = () => {
    const range = editorRef.current.editor.selection.getRng();
    const cursorPosition = range.startOffset;
  
    let textBeforeCursor = '';
  
    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      textBeforeCursor = range.startContainer.data.substring(0, cursorPosition);
    } else if (range.startContainer.nodeType === Node.ELEMENT_NODE) {
      textBeforeCursor = range.startContainer.textContent.substring(0, cursorPosition);
    }
  
    if (textBeforeCursor.endsWith(trigger)) {
      setSelectTrigger(trigger);
      setselectKey(dataKey);
      const cursorPosition = getCaretPosition();
      setCursorPosition(cursorPosition);
      setSelectedOption(true);
    } else if (textBeforeCursor.endsWith(trigger1)) {
      setSelectTrigger(trigger1);
      setselectKey(dataKey1);
      const cursorPosition = getCaretPosition();
      setCursorPosition(cursorPosition);
      setSelectedOption(true);
    } else {
      setSelectedOption(false);
    }
  };
  
    
const handleEditorClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedOption(null);
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
              handleEditorChange();
            });
            
            
            editor.on('SelectionChange',function(e){
              // handleEditorChange();
            });
            editor.on('click', function (e) {
              handleEditorClick(e);
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
        containerStyles={containerStyles}
        selectTrigger={selectTrigger}
        trigger={trigger}
        trigger1={trigger1}
      />
    </div>  
  );
};

export default EditorComponent;