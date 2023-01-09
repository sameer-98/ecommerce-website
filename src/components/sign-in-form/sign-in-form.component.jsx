import { useState } from "react";
import { signInUsers, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss"


const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const {user} = await signInUsers(email, password);
            resetFormFields()
        }
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('Incorrect Password for email');
                    break;
                case 'auth/user-not-found':
                    alert('No user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }        
    }

    const handleChange = (event) => {
        const {name, value} = event.target
        setFormFields({...formFields, [name]:value });
    }

    const signInWithGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    return (
        <div className="sign-up-container">
            <h2>Already Have an Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="email" type="email" required onChange={handleChange} value={email} name="email" />
                <FormInput label="password" type="password" required onChange={handleChange} value={password} name="password" />
                <div className="buttons-container">
                    <Button buttonType='default' type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogleUser} buttonType="google" type="button">Google Sign In</Button>
                    </div>
                    </form>
        </div>
    );

}
export default SignInForm;