import { useState , useCallback ,useEffect,useRef} from 'react'




function App() {
 const [length , setlength] =useState(8)
 const [numberalowed, setnumberalowed]= useState(false)
 const [char , setchar] = useState(false)
 const [ pass ,setpass] = useState("")
 const paswordref = useRef(null)
const passwordgenerator =useCallback(()=>{
  let pass ="";
  let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberalowed) str +='0123456789'
  if (char) str += '!@$#$%^&**-+'
for(let i=1; i<=length; i++){
  let char = Math.floor( Math.random()*str.length +1)
  pass += str.charAt(char)
}
setpass(pass)

}, [length, numberalowed,char,setpass])
const paswordcopytoclip=useCallback(()=>{
  
window.navigator.clipboard.writeText(pass)
},[pass])

useEffect(()=>{
passwordgenerator()
},[length,numberalowed,char,passwordgenerator])
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-md px-4 my-8 text-orange-500 bg-gray-800 '>
      <h1 className='text-white text-center my-3'>password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
        <input
         type="text"
         value={pass}
         className='outline-none w-full py-1 px-3' 
         placeholder='password'
         readOnly/>
         <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
         ref={paswordref}
         onClick={paswordcopytoclip}
         >copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label >length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={numberalowed}
          id='numberinput'
          onChange={()=>{
            setnumberalowed((prev)=> !(prev))
          }}
          
          />
          <label htmlFor="numberinput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox"
          defaultChecked={char}
          id='characterinput'
          onChange={() => {
            setchar((prev)=>
            !prev);
          }}

          />
          <label htmlFor="characterinput">character</label>
        </div>
      </div>
    </div>
    
     
    </>
  )
}

export default App
