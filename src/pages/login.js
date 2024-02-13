import { useEffect, useState } from 'react';
import { confirmationFields, loginFields } from "../constants/formFields";
import Input from "../components/input";
import FormAction from '../components/formaction';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase-config';

let fields = loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

let confirmFunction;

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const [processing, setProcessing] = useState(false);
    const [showCode, setShowCode] = useState(false);

    useEffect(()=> {
        setuprecaptcha()
    }, [])

    const setuprecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            //   onSignInSubmit();
            }
        });
    }
    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        handleAuthentication();
    }

    const handleAuthentication = async () => {
        if(showCode){
            handleConfirm();
        }
        else {
            const phoneNumber = loginState['phone-number'];

            if(!phoneNumber){
                alert('Please provide phone number');
            }
            else {
                setProcessing(true);
                const appVerifier = window.recaptchaVerifier;

                signInWithPhoneNumber(auth, phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        // console.log('confirm',confirmationResult);
                        // SMS sent. Prompt user to type the code from the message, then sign the
                        // user in with confirmationResult.confirm(code).
                        window.confirmationResult = confirmationResult;
                        confirmFunction = confirmationResult;
                
                        fields = confirmationFields;
                        fieldsState = {};
                        fields.forEach(field=>fieldsState[field.id]='');
                        setLoginState(fieldsState);
                        setShowCode(true)
                        alert('Kindly enter verification code')
                        setProcessing(false)
                    }).catch((error) => {
                        alert('An error occurred. Please try again');
                        setProcessing(false);
                        // console.log('err',error);
                    });
                }
        }
      }
    
      const handleConfirm = () => {   
          const code = loginState['otp-code'];
        //   console.log('coilde',loginState);
          if(!code || code.length !== 6){
            alert('Invalid code provided')
            return
          } 
            setProcessing(true);
            // console.log('code',code,'confirmFunction',confirmFunction);
            confirmFunction.confirm(code).then((result) => {
                // User signed in successfully.
                // console.log('confirm data',result);
                    setProcessing(false)
                }).catch((error) => {
                    alert('Verification failed. Please try again')
                    // console.log('err',error);
                    setProcessing(false)
                });
      }

    return(
        <form className="mt-8 space-y-6">
            <p>Please login</p>
            {/* <button id='sign-in-button'>test</button> */}
            <div className="-space-y-px">
                {
                    fields.map(field=>
                            <Input
                                readonly={processing}
                                key={field.id}
                                handleChange={handleChange}
                                value={loginState[field.id]}
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

            <FormAction handleSubmit={handleSubmit} disabled={processing} id='sign-in-button' action='button' text={processing ? "Please wait...": showCode ? "Verify code" : "Login"}/>
      </form>
    )
}