import React, { Component } from 'react';
import FormField from "../Widget/FormFields/formfield";
import styles from './dashboard.css';
import { firebaseTeams } from '../../firebase';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw,convertToRaw } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';

class Dashboard extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        postError:'',
        loading:false,
        formData: {
            author:{
                element: 'input',
                value:'',
                config:{
                    name:'author_input',
                    type:'text',
                    placeholder:'enter your name...'
                },
                validation:{
                    required: 'true'
                },
                valid:false,
                touched:false,
                validationMessage: ''
            },
            title:{
                element: 'input',
                value:'',
                config:{
                    name:'title_input',
                    type:'text',
                    placeholder:'enter title...'
                },
                validation:{
                    required: 'true'
                },
                valid:false,
                touched:false,
                validationMessage: ''
            },
            body:{
                element: 'texteditor',
                value: '',
                valid:true
            },
            teams:{
                element: 'select',
                value:'',
                config:{
                    name:'teams_input',
                    options: []
                },
                validation:{
                    required: 'true'
                },
                valid:false,
                touched:false,
                validationMessage: ''
            }
        }
    }

    componentDidMount (){
        this.loadTeams();
    }
    loadTeams =() => {
        firebaseTeams.once('value').then((snapshot)=>{
            let teams = [];
            snapshot.forEach((childSnapshot)=>{
                teams.push({
                    id:childSnapshot.val().teamId,
                    name: childSnapshot.val().city
                })
            })
            const newFormData = {...this.state.formData}
            const newElement = {...newFormData['teams']}
            newElement.config.options = teams;

            newFormData['teams'] = newElement;
            // console.log(newFormData)
            this.setState({
                formdata: newFormData
            })
        })
    }

    submitForm = (event) => {
        event.preventDefault();

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
            
        }else{
            this.setState({
                postError: 'Something went wrong'
            })
        }
    }
    validate = (element) =>{
        let error = [true, ''];

        if(element.validation.required){
            const valid = element.value.trim() !== '';
            const message = `${!valid ? 'This field is Required':''}`;
            error = !valid ? [valid,message] : error

        }
        return error;
    }

    showError = () => (
        this.state.postError !== '' ?
            <div className={styles.error}>
                {this.state.postError}
            </div>
        : ''
    )

    updateForm =(element,content = '')=>{
        const newFormData = {
            ...this.state.formData            
        }
        const newElement = {
            ...newFormData[element.id]
        }
        if(content === ''){
            newElement.value = element.event.target.value;
        }else{
            newElement.value = content
        }

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

    submitButton = ()=>
        ( 
            this.state.loading ? 
            'loading...' 
            : 
            <div>
                <button type="submit"> Add Post</button>                
            </div>
        )
    onEditorStateChange = (editorState) =>{
        let contentState = editorState.getCurrentContent();
        let rawState = convertToRaw(contentState);
        let html = stateToHTML(contentState);
        this.updateForm({id:'body'},html)
        this.setState({
            editorState
        })
    }
    render(){
        return(
            <div className={styles.postContainer}>
                <form onSubmit={this.submitForm}>
                    <h2>Add Post</h2>
                    <FormField
                    id={'author'}
                    formdata = {this.state.formData.author}
                    change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                    id={'title'}
                    formdata = {this.state.formData.title}
                    change={(element)=>this.updateForm(element)}
                    />
                    <Editor
                        editorState = {this.state.editorState}
                        wrapperClassName = "myEditor-wrapper"
                        editerClassName="myEditor-editor"
                        onEditorStateChange= {this.onEditorStateChange}
                    />
                    <FormField
                    id={'teams'}
                    formdata = {this.state.formData.teams}
                    change={(element)=>this.updateForm(element)}
                    />

                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}
export default Dashboard;