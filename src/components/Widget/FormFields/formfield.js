import React from 'react';
import styles from './formfield.css';

const FormField =({formdata,change,id}) =>{
   const errorMessage = () => {
       let errorMessage = null;
        if(formdata.validation && !formdata.valid){
            errorMessage = (
                <div className={styles.lableError}>
                    {formdata.validationMessage}
                </div>
            )
        }
       return errorMessage;
   }
   const renderTemplate = () => {
        let formTemplate = null;
        switch (formdata.element) {
            case 'input':
                formTemplate = (
                    <div>
                        <input {...formdata.config} value ={formdata.value} 
                        onBlur={(event)=>change({event,id,blur:true})}
                        onChange={(event)=>change({event,id,blur:false})}
                        />
                        {errorMessage()}
                    </div>
                )
                break;
            case 'select': 
                formTemplate = (
                    <div>
                        <select value = {formdata.value} name = {formdata.config.name}
                        onBlur={(event)=>change({event,id,blur:true})}
                        onChange={(event)=>change({event,id,blur:false})}
                        >
                         {
                              formdata.config.options.map((item,i)=>(
                                 <option key={i} value={item.id}>{item.name}</option>
                             ))
                         }
                        </select>
                    </div>
                )    
                break;
            default:
                formTemplate = null;
                break;
        }
        return formTemplate;
    }
    return(
        <div>
            {renderTemplate()}
        </div>
    )
}


export default FormField;