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
  }
  
  console.log("original array ==> ",color);

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

    const filtered = display.filter((ele,index) => index !== item.index)
    setDisplay(filtered)
  }

  console.log("displaybox",display);

  return (
    <div className="App">
      <div className='display'>
         {
           display && display.map((item) => {
             return <div key={uuidv4()}  className='circle' style={{ backgroundColor: `${item.color}` }} onClick={() => handleDisplay(item)}></div>
           })
         }
      </div>
      <div className='circle-container'>
        {
          color && color.map((item) => {
            return item ? <div key={uuidv4()} className='circle' style={{ backgroundColor: `${item}` }}></div> : ''
          })
        }
      </div>
      <div>
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => moveToBox(input-1)}>Shoot</button>
      </div>
    </div>
  );
}

export default App;
