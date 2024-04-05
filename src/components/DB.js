// this is ame as DB1 but here we put userId as well in the database.. in order to create the collection while logined user only
// refer onSubmitCricket function for change
import React, { useEffect, useState } from 'react'
import {db, auth} from '../config/firebase'

import {getDocs, collection} from 'firebase/firestore' // CREATE -to read datas in the firebase DB
import {addDoc} from 'firebase/firestore' // READ - to get data from this as input and store the firestoreDB
import {deleteDoc, doc} from 'firebase/firestore' // DELETE - to delete, doc is used to get the documnet  
import {updateDoc} from 'firebase/firestore' // Update .. docc use here as well to get document

const DB = () => {

    const [cricketlst, setCricketLst] = useState([])

    const [name, setName] = useState("")
    const [jersyNo, setJersyNo] = useState(0)
    const [check, setCheck] = useState(false)

    const [updateName, setUpdateName] = useState("")
    
    const cricketCollection = collection(db, "cricket")

    const getCricketLst = async() =>{
        try {
            const data  = await getDocs(cricketCollection)
            
            const filterData = data.docs.map((doc)=>(
                {...doc.data(), id: doc.id}
            ))

            // console.log(filterData)
            setCricketLst(filterData)
        } catch (err) {
            console.error(err)
        }
    }


    useEffect(()=>{     
        getCricketLst()
    },[])


    const OnSubmitCricket = async () =>{
        // id generate automatically
        try {
            await addDoc(cricketCollection,
                {name: name, 
                jersyNo : jersyNo,
                isIPL : check,
                userId : auth?.currentUser?.uid, // new
                })
            // write some rules in firebase about who read and write... with that user can write only when they r logged in only not after log out
            getCricketLst()
            
            setCheck(false)
            setJersyNo(0)
            setName("")
        } catch (error) {
            console.error(error)
        }
    }


    const deleteCricket = async(id) =>{
        try {
            const cricketDoc = doc(db, "cricket", id)
            await deleteDoc(cricketDoc)

            setCricketLst((prevList) => prevList.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error)
        }
    }


    const updateCricket = async(id)=>{
        try {
           const cricketDoc = doc(db, 'cricket', id) 
           await updateDoc(cricketDoc , {name: updateName})

           setCricketLst((prevList) =>
                prevList.map((item) => {
                    if (item.id === id) {
                        return { ...item, name: updateName };
                    }
                    return item;
                })
            );

        } catch (error) {
            console.error(error)
        }
    }





    
  return (
    <div>
        {cricketlst.map((item)=>(
            <div key={item.id}>
                <h1 style={{color: item.playIPL? "green" : "red"}}>{item.name}</h1>
                <p>{item.jersyNo}</p>
                <p>{item.playIPL}</p>

                <button onClick={() => {deleteCricket(item.id)}}>Delete</button>
            
                <input placeholder='Update name'
                value={updateName}
                onChange={(event)=>{setUpdateName(event.target.value)}}
                />
                <button onClick={()=>{ updateCricket(item.id)}}>Update</button>
            </div>
         ))}
         
        <input type='text'   
        placeholder='Player Name' 
        required 
        value={name}
        onChange={(event)=>{setName(event.target.value)}}/>
        
        <input type='number' 
        placeholder='Jersy Number' 
        required 
        value={jersyNo}
        onChange={(event)=>{setJersyNo(event.target.value)}}/>
        
        <input type='checkbox'
        value={check}
        checked = {check}
        onChange={(event)=>{setCheck(event.target.checked)}}
        /> 
        <label>Is Play IPL</label>

        <button onClick={OnSubmitCricket}>Submit</button>
    </div>
  )
}

export default DB