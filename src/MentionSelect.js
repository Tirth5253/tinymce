import React from 'react';
import Select from 'react-select';

const MentionSelect = ({ cursorPosition, selectedOption, mentionOptions, handleMentionInputChange, handleMentionItemSelect }) => {
  return (
    <>
      {cursorPosition.top !== 0 && selectedOption && (
        <Select 
          options={mentionOptions}
          onInputChange={handleMentionInputChange}
          onChange={handleMentionItemSelect}
          placeholder="Type to search"
          autoFocus={true}
          openMenuOnFocus={true}
          
          styles={{
            container: (provided) => ({
              ...provided,
              position: 'absolute',
              borderRadius: '10px',
              width: '200px',
              top: cursorPosition.top,
              left: cursorPosition.left,
              zIndex: 9999
            })
          }}
        />
      )}
    </>
  );
};

export default MentionSelect;
