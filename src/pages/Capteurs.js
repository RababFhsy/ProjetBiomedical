import React, { useState } from 'react'

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';

import { Container, Stack, Typography } from '@mui/material';

import EdgesensorHighTwoToneIcon from '@mui/icons-material/EdgesensorHighTwoTone';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import * as capteurService from "./capteurService";
import CapteurForm from "./CapteurForm";




// material

// components

import  PageHeader from '../components/PageHeader';
import Controls from '../components/controls/Controls';
import Popup from '../components/Popup';
import useTable from '../components/useTable';
import Page from '../components/Page';





// ----------------------------------------------------------------------

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
      right: '10px'
  }
}))

const headCells = [
  { id: 'type', label: 'Type' },
  { id: 'photo', label: 'Photo ' },
  { id: 'reference', label: 'Reference' },
  { id: 'valeurMax', label: 'valeurMax' },
  { id: 'valeurMin', label: 'valeurMin' },
  { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Capteurs() {

  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null)
  const [records, setRecords] = useState(capteurService.getAllCapteurs())
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
  const [openPopup, setOpenPopup] = useState(false)

  const [openFilter, setOpenFilter] = useState(false);

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
              return items.filter(x => x.type.toLowerCase().includes(target.value))
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


  return (
    <>
       <Page title="Capteur">
       <Container>
          <PageHeader
              title="Nouveau capteur"
              icon={<EdgesensorHighTwoToneIcon fontSize="large" />}
          />
                <Paper className={classes.pageContent}>

      <Toolbar>
          <Controls.Input
              label="search Capteur"
              className={classes.searchInput}
              InputProps={{
                  startAdornment: (<InputAdornment position="start">
                      <Search />
                  </InputAdornment>)
              }}
              onChange={handleSearch}
          />
          <Controls.Button
              text="Add New"
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
                          <TableCell>{item.type}</TableCell>
                          <TableCell>{item.photo}</TableCell>
                          <TableCell>{item.reference}</TableCell>
                          <TableCell>{item.valeurMax}</TableCell>
                          <TableCell>{item.valeurMin}</TableCell>
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
      title="capteur Formulaire"
      openPopup={openPopup}
      setOpenPopup={setOpenPopup}
      >
      <CapteurForm
          recordForEdit={recordForEdit}
          addOrEdit={addOrEdit} />
      </Popup>
      </Container>
      </Page>


        

       
       
    </>
  );
}