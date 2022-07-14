import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as boitierService from "./boitierService";



const initialFValues = {
    id: 0,
    reference: '',
    nombreBranche: '',
    type: '',
    frequence: '',
    branche: '',
    typeCapteur: '',

    
   
}

export default function BoitierForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('reference' in fieldValues)
            temp.reference = fieldValues.reference ? "" : "This field is required."
        if ('frequence' in fieldValues)
            temp.frequence = fieldValues.frequence ? "" : "This field is required."
        if ('branche' in fieldValues)
            temp.branche = fieldValues.branche ? "" : "This field is required."   
        if ('nombreBranche' in fieldValues)
            temp.nombreBranche = fieldValues.nombreBranche.length!= 0 ? "" : "This field is required."
        if ('typeCapteur' in fieldValues)
            temp.typeCapteur = fieldValues.typeCapteur.length != 0 ? "" : "This field is required."     
        if ('type' in fieldValues)
            temp.type = fieldValues.type.length != 0 ? "" : "This field is required."
          
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
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
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="reference"
                        label="Reference"
                        value={values.reference}
                        onChange={handleInputChange}
                        error={errors.reference}
                    />
                    <Controls.Input
                        name="frequence"
                        label="Frequence"
                        value={values.frequence}
                        onChange={handleInputChange}
                        error={errors.frequence}
                    />
                    
                    <Controls.Input
                        label="Nombre de Branche"
                        name="nombreBranche"
                        value={values.nombreBranche}
                        onChange={handleInputChange}
                        error={errors.nombreBranche}
                    />
                    

                </Grid>
                <Grid item xs={6}>
                   
                    <Controls.Select
                        name="type"
                        label="Type"
                        value={values.type}
                        onChange={handleInputChange}
                        options={boitierService.getDepartmentCollection()}
                        error={errors.type}
                    />
                     <Controls.Select
                        name="typeCapteur"
                        label="Type de Capteur"
                        value={values.typeCapteur}
                        onChange={handleInputChange}
                        options={boitierService.getCapteurCollection()}
                        error={errors.typeCapteur}
                    />
                     <Controls.Select
                        name="branche"
                        label="Branche"
                        value={values.branche}
                        onChange={handleInputChange}
                        options={boitierService.getBrancheCollection()}
                        error={errors.branche}
                    />
                   
                   

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Sauvgarder" />
                        <Controls.Button
                            text="Annuler"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
