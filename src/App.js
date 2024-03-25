import React from 'react';
import EditorComponent from './EditorComponent';
const App = () => {
  return (

    <div>
      <EditorComponent trigger={"@"} trigger1={'Tirth'} dataKey="label" dataKey1="name" controlStyles={{}} menuStyles={{}} optionStyles={{}} containerStyles={{}} placeHolder={"Please Type here"}   nonEditStyle={'color: black; font-weight: bold; background:#7393B3; border-radius:10px; width:10px; padding:3px'} customOptionStyle={{}}/>      
    </div>
  );
};

export default App;
