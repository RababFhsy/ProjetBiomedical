import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as capteurService from "./capteurService";




const initialFValues = {
    id: 0,
    type: '',
    photo: '',
    reference: '',
    vmax: '',
    vmin: '',
}

export default function CapteurForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        const temp = { ...errors }
        if ('type' in fieldValues)
            temp.type = fieldValues.type ? "" : "This field is required."
        if ('photo' in fieldValues)
            temp.photo = fieldValues.photo ? "" : "This field is required."    
        if ('reference' in fieldValues)
            temp.reference = fieldValues.reference ? "" : "This field is required."
        if ('vmax' in fieldValues)
            temp.vmax = fieldValues.vmax ? "" : "This field is required."
        if ('vmin' in fieldValues)
            temp.vmin= fieldValues.vmin ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit !== null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="type"
                        label="type"
                        value={values.type}
                        onChange={handleInputChange}
                        error={errors.type}
                    />
                     <Controls.Input
                        label="photo"
                        // type="file" 
                        name="photo"
                        value={values.photo}
                        onChange={handleInputChange}
                       
                        error={errors.photo}
                    />
                     <Controls.Input
                        name="reference"
                        label="reference"
                        value={values.reference}
                        onChange={handleInputChange}
                        error={errors.reference}
                    />
                   
                   
                   

                </Grid>
                <Grid item xs={6}>
                    
                <Controls.Select
                        name="type"
                        label="Type"
                        value={values.type}
                        onChange={handleInputChange}
                        options={capteurService.getDepartmentCollection()}
                        error={errors.type}
                    />
                <Controls.Input
                        label="valeurMax"
                        name="vmax"
                        value={values.vmax}
                        onChange={handleInputChange}
                        error={errors.vmax}
                    />
                <Controls.Input
                        label="valeurMin"
                        name="vmin"
                        value={values.vmin}
                        onChange={handleInputChange}
                        error={errors.vmin}
                    />
                   
                    

                    <div>
                      
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}