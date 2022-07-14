import React, { useEffect ,useState} from 'react'

import { Grid, } from '@material-ui/core';
import {  IconButton, InputAdornment } from '@mui/material';
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as userService from "./userService";

import Iconify from "../components/Iconify";



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
    const [showPassword, setShowPassword] = useState(false);
    const validate = (fieldValues = values) => {
        const temp = { ...errors }
        if ('nom' in fieldValues)
            temp.nom = fieldValues.nom ? "" : "This field is required."
        if ('prenom' in fieldValues)
            temp.prenom = fieldValues.prenom ? "" : "This field is required."    
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        if ('role' in fieldValues)
            temp.role = fieldValues.role.length !== 0 ? "" : "This field is required."    
        if ('password' in fieldValues)
            temp.mobile = fieldValues.password.length > 9 ? "" : "Minimum 10 numbers required."
        
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
                        options={userService.getDepartmentCollection()}
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
                         type={showPassword ? 'text' : 'password'}
                        label="Mot de passe"
                        name="password"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
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
