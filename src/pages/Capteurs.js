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
import EdgesensorHighTwoToneIcon from '@mui/icons-material/EdgesensorHighTwoTone';
import CapteurForm from "./CapteurForm";
import * as capteurService from "./capteurService";

// components
import Page from '../components/Page';
import Popup from '../components/Popup';
import ConfirmDialog from '../components/ConfirmDialog';
import Controls from '../components/controls/Controls';
import  PageHeader from '../components/PageHeader';
import useTable from '../components/useTable';
import Notification from "../components/Notification";




const useStyles = makeStyles(theme => ({
//   pageContent: {
//       margin: theme.spacing(5),
//       padding: theme.spacing(3)
//   },
  searchInput: {
      width: '60%'
  },
  newButton: {
      position: 'absolute',
      right: '8px'
  }
}))



// mock


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const headCells = [
  { id: 'department', label: 'Type' },
  { id: 'photo', label: 'Photo' },
  { id: 'reference', label: 'Reference' },
  { id: 'vmax', label: 'ValeurMax' },
  { id: 'vmin', label: 'ValeurMin' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]
export default function Capteurs() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  
  const [records, setRecords] = useState(capteurService.getAllCapteurs())
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
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
                return items.filter(x => x.reference.toLowerCase().includes(target.value))
        }
    })
}
const addOrEdit = (capteur, resetForm) => {
  if (capteur.id == 0)
      capteurService.insertCapteur(capteur)
  else
      capteurService.updateCapteur(capteur)
  resetForm()
  setRecordForEdit(null)
  setOpenPopup(false)
  setRecords(capteurService.getAllCapteurs())
}

const openInPopup = item => {
  setRecordForEdit(item)
  setOpenPopup(true)
}
const onDelete = id => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    capteurService.deleteCapteur(id);
    setRecords(capteurService.getAllCapteurs())
    setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
    })

}



  return (
    <Page title="capteur">
      <Container>
      <PageHeader
              title="Nouveau capteur"
              icon={<EdgesensorHighTwoToneIcon fontSize="large" />}
          />
       
          
       <Paper className={classes.pageContent}>
        <Toolbar>
        <Controls.Input
                        label="Search capteur"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Ajouter Nouveau capteur"
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
                                    <TableCell>{item.department}</TableCell>
                                    
                                    <TableCell>{item.photo}</TableCell>
                                    <TableCell>{item.reference}</TableCell>
                                    <TableCell>{item.vmax}</TableCell>
                                    <TableCell>{item.vmin}</TableCell>
                                    <TableCell>
                                    <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.id) }
                                                })
                                            }}>
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
                title="capteur Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <CapteurForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        

       
      </Container>
    </Page>
  );
}
