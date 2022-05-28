import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [input,setInput] = useState("")
  const [color,setColor] = useState([])
  const [display,setDisplay] = useState([])


  let arr = []
  let randomColor = (i) => {
    let r = Math.floor(Math.random() * 255)
    let g = Math.floor(Math.random() * 255)
    let b = Math.floor(Math.random() * 255)
    arr.push(`rgb(${r},${g},${b})` )
  }

  useMemo(() => {
    for (let i = 0; i < 5; i++) {
      randomColor(i)
    }
    setColor(arr)
  }, [])

  
  const moveToBox = (index) => {
    while(color[index] === null){
      index++
    }
    setDisplay([...display, {color : color[index], index : index }])
    const newarr = color.map((item, ind) => {
      if(index === ind){
        return null
      }
      else{
        return item
      }
    })

    setColor(newarr)
    setInput("")
  }
  

  const handleDisplay = (item) => {
    const newarr = color.map((ele, ind) => {
      if(ind === item.index){
        return item.color
      }
      else{
        return ele
      }
    })
    setColor(newarr)
    setDisplay(display.filter((ele) => ele.index !== item.index))
  }


  return (
    <div className="App">
      <div className='display-container'>
        { display.length > 0 ? <b>Click on the ball to move it back to it's previous position</b> : ""}
         <div className='display'>
         {
           display && display.map((item) => {
             return <div key={uuidv4()}  className='circle' style={{ backgroundColor: `${item.color}` }} onClick={() => handleDisplay(item)}></div>
           })
         }
         </div>
      </div>
      <div className='circle-container'>
        {
          color && color.map((item,index) => {
            return item ? <div key={uuidv4()} className='circle' style={{ backgroundColor: `${item}` }}> </div> : ''
          })
        }
      </div>
      <div className='input-container'>
       <div>
         <b>Enter the serial number of the ball  you want to shoot</b>
       </div>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter number"
        />
        <button onClick={() => input ? moveToBox(input-1) : ""}>Shoot</button>
      </div>
    </div>
  );
}

export default App;
