

import React, { useState } from 'react'

import { Paper,makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Container} from '@mui/material';



import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import * as userService from "./userService";
import UserForm from "./UserForm";




// material


// components

import  PageHeader from '../components/PageHeader';
import Controls from '../components/controls/Controls';
import Popup from '../components/Popup';
import useTable from '../components/useTable';
import Page from '../components/Page';
import Notification from '../components/Notification';
import ConfirmDialog from '../components/ConfirmDialog';






// mock


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

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
      right: '8px'
  }
}))

const headCells = [
  { id: 'nom', label: 'Nom' },
  { id: 'prenom', label: 'Prénom ' },
  { id: 'email', label: 'Email' },
  { id: 'password', label: 'Mot de Passe' },
  { id: 'department', label: 'Role' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]


export default function Users() {
    
  const Classes = useStyles();
  const theme = useTheme();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState(userService.getAllUsers())
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)

  const {
      TblContainer,
      TblHead,
      TblPagination,
      recordsAfterPagingAndSorting
  } = useTable(records,headCells, filterFn);
  
  const handleSearch = e => {
    const target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value === "")
                return items;
            
                return items.filter(x => x.nom.toLowerCase().includes(target.value))
        }
    })
}

const addOrEdit = (user, resetForm) => {
    if (user.id === 0)
        userService.insertUser(user)
    else
        userService.updateUser(user)
    resetForm()
    setRecordForEdit(null)
    setOpenPopup(false)
    setRecords(userService.getAllUsers())
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
    userService.deleteUser(id);
    setRecords(userService.getAllUsers())
    setNotify({
        isOpen: true,
        message: 'Deleted Successfully',
        type: 'error'
    })

}


 
   
    return (
      <>
      
       <Page title="Utilisareur">
       <Container>
          <PageHeader
              title="Nouveau Utilisateur"
              icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
          />
          <Paper className={theme.pageContent}>

              <Toolbar>
                  <Controls.Input
                      label="Search Users"
                      className={Classes.searchInput}
                      InputProps={{
                          startAdornment: (<InputAdornment position="start">
                              <Search />
                          </InputAdornment>)
                      }}
                      onChange={handleSearch}
                  />
                  <Controls.Button
                        text="Ajouter Nouveau Utilisateur"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={Classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
            
              </Toolbar>
              <TblContainer>
                  <TblHead />
                  <TableBody>
                      {
                          recordsAfterPagingAndSorting().map(item =>
                              (<TableRow key={item.id}>
                                  <TableCell>{item.nom}</TableCell>
                                  <TableCell>{item.prenom}</TableCell>
                                  <TableCell>{item.email}</TableCell>
                                  <TableCell>{item.password}</TableCell>
                                  <TableCell>{item.department}</TableCell>
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
              title="Utilisateur Formulaire"
              openPopup={openPopup}
              setOpenPopup={setOpenPopup}
          >
              <UserForm
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
      </>
     
  
  )
}
