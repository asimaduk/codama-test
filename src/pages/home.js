import { useEffect, useState } from 'react';
import {  profileFields } from "../constants/formFields";
import Input from "../components/input";
import FormAction from '../components/formaction';
import { auth, db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

let fields = profileFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Home({ userData }){
    const [profileState,setProfileState]=useState(fieldsState);
    const [processing, setProcessing] = useState(false);

    const handleChange=(e)=>{
        setProfileState({...profileState,[e.target.id]:e.target.value})
    }

    useEffect(()=> {
        if(userData && userData.uid){
            let fieldsState = {
                email: userData.email,
                name: userData.name
            };

            setProfileState(fieldsState)
        }
    }, [setProfileState, userData])

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleSave();
    }

    const handleSave = async () => {
        const data = {
          email: profileState['email'],
          name: profileState['name']
        }

        if(!data.email){
            alert('Please enter an email')
        }
        else if(!data.name){
            alert('Please enter name')
        }
        else {
            setProcessing(true)
            await setDoc(doc(db, "users", userData.phoneNumber), data);
            alert('Update processed')
            setProcessing(false)
        }
    }
    
    const handleLogout = async () => {
        setProcessing(true)
        const res = auth.signOut();
        if(res) {
                
        }
        setProcessing(false)
    }

    return(
        <form className="mt-8 space-y-6">
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <p>Welcome Back</p>
                <p onClick={handleLogout} style={{cursor:'pointer',color:'#a13'}}>Sign out</p>
            </div>
            
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                readonly={processing}
                                key={field.id}
                                handleChange={handleChange}
                                value={profileState[field.id]}
                                labelText={field.labelText}
                                labelFor={field.labelFor}
                                id={field.id}
                                name={field.name}
                                type={field.type}
                                isRequired={field.isRequired}
                                placeholder={field.placeholder}
                        />
                    
                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} disabled={processing} action='button' text={processing ? "Please wait...":"Update Profile"}/>
      </form>
    )
}