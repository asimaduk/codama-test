const loginFields=[
    {
        labelText:"Phone number",
        labelFor:"phone-number",
        id:"phone-number",
        name:"phone",
        type:"phone",
        isRequired:true,
        placeholder:"Phone number"   
    }
]

const confirmationFields=[
    {
        labelText:"OTP Code",
        labelFor:"otp-code",
        id:"otp-code",
        name:"otp-code",
        type:"number",
        isRequired:true,
        placeholder:"OTP Code"   
    }
]

const profileFields=[
    {
        labelText:"Name",
        labelFor:"name",
        id:"name",
        name:"name",
        type:"text",
        isRequired:true,
        placeholder:"Name"   
    },
    {
        labelText:"Email",
        labelFor:"email",
        id:"email",
        name:"email",
        type:"text",
        isRequired:true,
        placeholder:"Email"   
    }
]

export { loginFields, confirmationFields, profileFields }