import React, {useState, useEffect, useMemo} from 'react'
import {db} from '../../firebase'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
} from "firebase/firestore";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Button,
    Stack
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';



export default function TableData() {

    const dataCollectionRef = collection(db, "kas");
    // const snapshot = await dataCollectionRef.get()
    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });
    const [kas, setKas] = useState([]);

  const deleteDocument = async (id) => {
    const kasDoc = doc(db,"kas", id);
    await deleteDoc(kasDoc)
    console.log('coba delete')
    window.location.reload(true)
  }

    
    useEffect(() => {
        const getKas = async () => {
          const data = await getDocs(dataCollectionRef);
          setKas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getKas();
    }, []);
   
    console.log(kas, 'id')

    const rupiah =(number)=>{
        return new Intl.NumberFormat('id-ID', {
            style:'currency',
            currency:'IDR'
          }).format(number)
      }
  
  return (
    // <>
    <div>
        <TableContainer 
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" , borderRadius:12}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">No</TableCell>
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Pemasukan</TableCell>
                <TableCell align="center">Pengeluaran</TableCell>
                <TableCell align="center">Keterangan</TableCell>
                <TableCell align="center">Saldo (Mingguan)</TableCell>
                <TableCell align="center">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kas.map((k,y) => {
                // console.log(nikahs,'data')
                const tgl = new Date(
                  k.tanggal.seconds * 1000 +
                    k.tanggal.seconds / 1000000
                );
                const tanggal = tgl.getDate()
                const month = tgl.getMonth()
                const year = tgl.getFullYear()
                const id_data = y + 1;
                function delete_data () {
                  deleteDoc(doc(db, "kas", id_data ))
                  window.location.reload(true)
                }
                
                return (
                <TableRow key={k.id}>
                    <TableCell align="center">{id_data}</TableCell>
                    <TableCell align="center">{tanggal}/{month}/{year}</TableCell>
                    <TableCell align="center">{rupiah(k.pemasukan)}</TableCell>
                    <TableCell align="center">{rupiah(k.pengeluaran)}</TableCell>
                    <TableCell align="center">{k.keterangan}</TableCell>
                    <TableCell align="center">{rupiah(k.saldo)}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={2}>
                      <Button variant='outlined' color='error' size='small' startIcon={<DeleteIcon/>} 
                      onClick={()=>{deleteDocument(k.id)}}
                      >
                        Hapus
                      </Button>
                      <Button variant='outlined' size='small' startIcon={<ModeIcon/>} 
                      // onClick={()=>{deleteDocument(k.id)}}
                      >
                        Edit
                      </Button>
                      </Stack>
                    </TableCell>
                    {/* <TableCell align="center">{tahun}</TableCell>
                    <TableCell align="center">aksi</TableCell> */}
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}
