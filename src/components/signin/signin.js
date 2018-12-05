import React, { Component } from 'react';
import styles from './signin.css';
import FormField from '../Widget/FormFields/formfield';
import { firebase } from '../../firebase';
class SignIn extends Component{
    state = {
        registerError:'',
        loading:false,
        formData: {
            email:{
                element: 'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'enter your email...'
                },
                validation:{
                    required: 'true',
                    email: true
                },
                valid:false,
                touched:false,
                validationMessage: ''
            },
            password:{
                element: 'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'enter your password...'
                },
                validation:{
                    required: 'true',
                    password: true
                },
                valid:false,
                touched:false,
                validationMessage: ''
            }
        }
    }
    updateForm =(element)=>{
        const newFormData = {
            ...this.state.formData            
        }
        const newElement = {
            ...newFormData[element.id]
        }
        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormData[element.id] = newElement;
        // console.log(newFormData);
        this.setState({
            formData: newFormData
        })
    }
    validate = (element) =>{
        let error = [true, ''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be an Email':''}`;
            error = !valid ? [valid,message] : error

        }

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be Greater than 5':''}`;
            error = !valid ? [valid,message] : error

        }

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is Required':''}`;
            error = !valid ? [valid,message] : error

        }
        return error;
    }
    submitForm = (event,type) =>{
            event.preventDefault(); 
            if(type !== null){
                let dataToSubmit = {};
                let formIsValid = true;
                for(let key in this.state.formData){
                    dataToSubmit[key] = this.state.formData[key].value;
                    // console.log(dataToSubmit[key]);
                }
                for(let key in this.state.formData){
                    formIsValid = this.state.formData[key].valid && formIsValid;
                }
                if(formIsValid){
                    console.log(dataToSubmit);
                    this.setState({
                        loading: true,
                        registerError: ''
                    });
                    if(type){
                        firebase.auth().signInWithEmailAndPassword(
                            dataToSubmit.email,
                            dataToSubmit.password
                            ).then(()=>{
                                this.props.history.push('/')
                            }).catch(error => {
                             this.setState({
                                 loading: false,
                                 registerError: error.message
                             });
                            })
                    }else{
                       firebase.auth().createUserWithEmailAndPassword(
                           dataToSubmit.email,
                           dataToSubmit.password
                       ).then(()=>{
                           this.props.history.push('/')
                       }).catch(error => {
                        this.setState({
                            loading: false,
                            registerError: error.message
                        });
                       })
                    }
                }
            }
    }
    submitButton = ()=>
        ( 
            this.state.loading ? 
            'loading...' 
            : 
            <div>
                <button onClick={(event) => this.submitForm(event,false)}> Register Now</button>
                <button  onClick={(event) => this.submitForm(event,true)}> Log in </button>                
            </div>
        )
    showError = () => (
        this.state.registerError !== '' ?
            <div className={styles.error}>
                {this.state.registerError}
            </div>
        : ''
    )
    render(){
        return(
            <div className={styles.logContainer}>
                <form onSubmit={(event) => this.submitForm(event,null)}>
                    <h2>Register/ Login</h2>
                    <FormField
                    id={'email'}
                    formdata = {this.state.formData.email}
                    change={(element)=>this.updateForm(element)}
                    />


                    <FormField
                    id={'password'}
                    formdata = {this.state.formData.password}
                    change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}

                </form>                 
            </div>
        )
    }
}
export default SignIn;