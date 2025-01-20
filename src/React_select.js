import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import {Form} from "react-bootstrap";

const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

  const testArray = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
  ];

function React_select() {
  const [multipleArr, setMultipleArr] = useState([]);
    const [val, setVal] = useState('');
    const handleChange = (t) => {
        console.log(t);
    }

function handleChangeMultiple(e){
  var options = e.target.options;
  var value = [];
  
  if(e.target.value === 'A'){
    const newArr = testArray.map(dat => {return dat.value});
    setMultipleArr(newArr);
    
  }else {
    for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
            value.push(options[i].value);
        }
      }
      setMultipleArr(value);
  }
}
console.log(multipleArr);
  return (
    <div>
      <Select
        value={val}
        onChange={(v) => {handleChange(v.value); setVal(v);}}
        options={options}
      />
      <button onClick={() => setVal("")}>clear</button>
      <Form.Select onChange={handleChangeMultiple} multiple>
        <option value="">Select</option>
        <option value="A">Select All</option>
        {
          testArray.map(data => (
            <option value={data.value}>{data.label}</option>
          ))
        } 
      </Form.Select>
    </div>
  )
}

export default React_select
