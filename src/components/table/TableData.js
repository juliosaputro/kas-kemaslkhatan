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
} from '@mui/material'
import { uuidv4 } from '@firebase/util';


export default function TableData() {

    const dataCollectionRef = collection(db, "kas");
    // const snapshot = await dataCollectionRef.get()
    // snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
    // });
    const [kas, setKas] = useState([]);


    
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
                {/* <TableCell align="center">No</TableCell> */}
                <TableCell align="center">Tanggal</TableCell>
                <TableCell align="center">Pemasukan</TableCell>
                <TableCell align="center">Pengeluaran</TableCell>
                <TableCell align="center">Keterangan</TableCell>
                <TableCell align="center">Saldo (Mingguan)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {kas.map((k) => {
                // console.log(nikahs,'data')
                const tgl = new Date(
                  k.tanggal.seconds * 1000 +
                    k.tanggal.seconds / 1000000
                );
                const tanggal = tgl.toLocaleDateString();
                
                return (
                <TableRow key={k.id}>
                    {/* <TableCell align="center">(0++)</TableCell> */}
                    <TableCell align="center">{tanggal}</TableCell>
                    <TableCell align="center">{rupiah(k.pemasukan)}</TableCell>
                    <TableCell align="center">{rupiah(k.pengeluaran)}</TableCell>
                    <TableCell align="center">{k.keterangan}</TableCell>
                    <TableCell align="center">{rupiah(k.saldo)}</TableCell>
                    {/* <TableCell align="center">{nikah.no_examp}</TableCell>
                    <TableCell align="center">{tahun}</TableCell>
                    <TableCell align="center">aksi</TableCell> */}
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}
