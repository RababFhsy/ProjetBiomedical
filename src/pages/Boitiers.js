import React, { useState } from 'react'
// material
import { Stack,Container,Typography } from '@mui/material';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import MedicationTwoToneIcon from '@mui/icons-material/MedicationTwoTone';
import AddIcon from '@material-ui/icons/Add';
import { Search } from "@material-ui/icons";
import {  Paper, makeStyles,TableBody, TableRow,  Toolbar, InputAdornment,TableCell } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import BoitierForm from "./BoitierForm";
import * as boitierService from "./boitierService";
// components
import Page from '../components/Page';
import Popup from '../components/Popup';
import Controls from '../components/controls/Controls';
import  PageHeader from '../components/PageHeader';
import useTable from '../components/useTable';




const useStyles = makeStyles(theme => ({
  pageContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3)
  },
  searchInput: {
      width: '60%'
  },
  newButton: {
      position: 'absolute',
      right: '10px'
  }
}))



// mock


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const headCells = [
  { id: 'reference', label: 'Reference' },
  
  { id: 'nombreBranche', label: 'Nombre de Branche' },
  { id: 'type', label: 'Type' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]
export default function Boitiers() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  
  const [records, setRecords] = useState(boitierService.getAllBoitiers())
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
} = useTable(records, headCells, filterFn);
  const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => x.fullName.toLowerCase().includes(target.value))
        }
    })
}
const addOrEdit = (boitier, resetForm) => {
  if (boitier.id == 0)
      boitierService.insertboitier(boitier)
  else
      boitierService.updateBoitier(boitier)
  resetForm()
  setRecordForEdit(null)
  setOpenPopup(false)
  setRecords(boitierService.getAllBoitiers())
}

const openInPopup = item => {
  setRecordForEdit(item)
  setOpenPopup(true)
}



  return (
    <Page title="Boitier">
      <Container>
      <PageHeader
              title="Nouveau Boitier"
              icon={<MedicationTwoToneIcon fontSize="large" />}
          />
       
          
       <Paper className={classes.pageContent}>
        <Toolbar>
        <Controls.Input
                        label="Search Boitier"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Ajouter Nouveau Boitier"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.id}>
                                    <TableCell>{item.reference}</TableCell>
                                    
                                    <TableCell>{item.nombreBranche}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary">
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
                <Popup
                title="Boitier Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <BoitierForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        

       
      </Container>
    </Page>
  );
}
