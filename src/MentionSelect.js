import React from 'react';
import Select from 'react-select';

const MentionSelect = ({ cursorPosition, selectedOption, mentionOptions, handleMentionInputChange, handleMentionItemSelect,controlStyles,menuStyles,optionStyles,containerStyles,dataKey,placeholder,customOptionStyle }) => {

  const CustomOption = ( data) => ( 

    <div  style={{color:'blue',padding:'10px'}}>
      <span style={{backgroundColor:'red',cursor:'pointer',...customOptionStyle} } className=''>{data[dataKey]}</span>
    </div>
  );
// console.log(placeholder)
  return (
    <>
      {cursorPosition.top !== 0 && selectedOption && (
        <Select 
        
          options={mentionOptions}
          onInputChange={handleMentionInputChange}
          onChange={handleMentionItemSelect}
          placeholder={placeholder}
          
          autoFocus={true}
          openMenuOnFocus={true}
          components={{
            Option: ({ innerProps, innerRef, data }) => (
              <div 
                {...innerProps} 
                ref={innerRef}  
              >
               {CustomOption(data)}
              </div>
            )
          }}
          styles={{

        menuList:(provided)=>({
          ...provided,
          
          
        }),group:(provided)=>({
          ...provided,
          ...controlStyles,
            
  }),
//   valueContainer:(provided)=>({
//     ...provided,
//     ...controlStyles,
//     backgroundColor:'green'
    
// }),
           control:(provided)=>({
                    ...provided,
                    ...controlStyles,
                    
                    
            }),
            option:(provided)=>({
              ...provided,  
              ...optionStyles,
            
      }),
//       input:(provided)=>({
//         ...provided,
//         ...controlStyles,
//         color:'purple',
        

        
// }),
      menu:(provided)=>({
        ...provided,
        ...menuStyles,
        
        
}),


            container: (provided) => ({
              ...provided,
              
              position: 'absolute',
              marginTop:'40px',
              borderRadius: '10px',
              width: '200px',
              top: cursorPosition.top,
              left: cursorPosition.left,
              zIndex: 9999,
              ...containerStyles,

            })
          }}
        />
      )}
    </>
  );
};

export default MentionSelect;
