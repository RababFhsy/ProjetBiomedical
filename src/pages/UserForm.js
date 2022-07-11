import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as userService from "./userService";




const initialFValues = {
    id: 0,
    nom: '',
    prenom: '',
    email: '',
    role: '',
    password: '',
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        const temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "This field is required."
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "This field is required."    
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('password' in fieldValues)
            temp.mobile = fieldValues.password.length > 9 ? "" : "Minimum 10 numbers required."
        if ('role' in fieldValues)
            temp.role = fieldValues.role.length !== 0 ? "" : "This field is required."
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
                        name="nom"
                        label="Nom"
                        value={values.nom}
                        onChange={handleInputChange}
                        error={errors.nom}
                    />
                     <Controls.Input
                        label="Prenom"
                        name="prenom"
                        value={values.prenom}
                        onChange={handleInputChange}
                        error={errors.prenom}
                    />
                     <Controls.Select
                        name="role"
                        label="Role"
                        value={values.role}
                        onChange={handleInputChange}
                        options={userService.getRoleCollection()}
                        error={errors.role}
                    />
                   
                   
                   

                </Grid>
                <Grid item xs={6}>
                <Controls.Input
                        label="Email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        error={errors.email}
                    />
                <Controls.Input
                        label="Mot de passe"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
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
