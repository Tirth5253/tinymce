import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const MyEditor = () => {
  const editorRef = useRef(null);
  const mentionDropdownRef = useRef(null);
  const [mentionItems, setMentionItems] = useState([
    {"id": 1, "name": "John Smith"},
    {"id": 2, "name": "Alice Johnson"},
    {"id": 3, "name": "Michael Brown"},
    {"id": 4, "name": "Emily Williams"},
    {"id": 5, "name": "David King"}
  ]);
  

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (mentionDropdownRef.current && !mentionDropdownRef.current.contains(e.target)) {
        removeMentionDropdown();
      }
    };
     

    document.body.addEventListener('click', handleOutsideClick);

    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  let previousKey = '';
  const handleEditorKeyUp = (e) => {
    const { keyCode, key } = e;
     if (previousKey === '{' && key === '{') {
      createMentionDropdown();
      e.preventDefault(); 
    } 
  else if (keyCode === 8 || keyCode === 46) {
      removeMentionDropdown();
    } else if (keyCode === 32) {
      removeMentionDropdown();
    } else if (keyCode === 219) {
      removeMentionDropdown();
    } else if (keyCode === 13) {
      removeMentionDropdown();
    } else if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) || keyCode === 32) {
      updateMentionDropdown(); 
    }
    previousKey=key;
  };
  

  const createMentionDropdown = () => {
    const range = editorRef.current.editor.selection.getRng();
    const rect = range.getBoundingClientRect();

    const mentionDropdown = document.createElement('div');
    mentionDropdown.className = 'mention-dropdown';
    mentionDropdownRef.current = mentionDropdown;

    mentionDropdown.style.position = 'absolute';
    mentionDropdown.style.left = rect.left + 'px';
    mentionDropdown.style.top = rect.bottom + 40 + 'px';
    mentionDropdown.style.border = '1px solid #ccc';
    mentionDropdown.style.borderRadius = '10px';
    mentionDropdown.style.padding = '5px';
    mentionDropdown.style.background = '';
    mentionDropdown.style.cursor = 'pointer';
    mentionDropdown.style.boxShadow = '0 2px 5px rgba(0,0,0,0.5)';
    const editorContainer = document.querySelector('.tox-tinymce');
    editorContainer.appendChild(mentionDropdown);

    updateMentionDropdown();
  };

  const updateMentionDropdown = () => {

    const editor = editorRef.current.editor;
    const selection = editor.selection;
    const selectedNode = selection.getNode();
    const content = selectedNode.textContent.trim();
    const atIndex = content.lastIndexOf('{');
    const query = content.substring(atIndex + 1);

    const filteredMentionItems = mentionItems.filter(item =>
      item.name.toLowerCase().startsWith(query.toLowerCase())
    );

    const mentionDropdown = mentionDropdownRef.current;
    if (!mentionDropdown) return;
    mentionDropdown.innerHTML = '';
    const handleMentionItemClick = (item) => {
  const range = editorRef.current.editor.selection.getRng();
  const selectedContent = range.startContainer.data;

  const atIndex = selectedContent.lastIndexOf('{{');
  const newText = selectedContent.substring(0, '{{') + item.name;

  const newRange = document.createRange();
  newRange.setStart(range.startContainer, atIndex);
  newRange.setEnd(range.startContainer, range.startOffset);
  newRange.deleteContents();
  newRange.insertNode(document.createTextNode(newText));

  removeMentionDropdown();
};
    filteredMentionItems.forEach(item => {
  const mentionItem = document.createElement('div');
  mentionItem.className = 'mention-item';
  mentionItem.textContent = item.name; 
  mentionItem.onclick = () => handleMentionItemClick(item);
  mentionDropdown.appendChild(mentionItem);

});
  };
  

  const removeMentionDropdown = () => {
    if (mentionDropdownRef.current) {
      mentionDropdownRef.current.remove();
      mentionDropdownRef.current = null;
    }
  };

  return (
    <div>
    <Editor
  
      onKeyUp={handleEditorKeyUp} 
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
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
      ref={editorRef}
    />
    <div style={{height:'100px', width:'100px', background:'grey' }}>
    hello
    </div>
    </div>
  );
};

export default MyEditor;







// const handleMentionItemClick = (item) => {
//   const range = editorRef.current.editor.selection.getRng();
//   const selectedContent = range.startContainer.data;

//   const atIndex = selectedContent.lastIndexOf('@');
//   const newText = selectedContent.substring(0, '@') + item.name;

//   const newRange = document.createRange();
//   newRange.setStart(range.startContainer, atIndex);
//   newRange.setEnd(range.startContainer, range.startOffset);
//   newRange.deleteContents();
//   newRange.insertNode(document.createTextNode(newText));

//   removeMentionDropdown();
// };




// filteredMentionItems.forEach(item => {
//   const mentionItem = document.createElement('div');
//   mentionItem.className = 'mention-item';
//   mentionItem.textContent = item.name; 
//   mentionItem.onclick = () => handleMentionItemClick(item);
//   mentionDropdown.appendChild(mentionItem);

// });