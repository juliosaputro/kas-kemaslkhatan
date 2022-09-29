import React, {useState, useEffect} from 'react'
import './overall-list.scss'
import { data } from '../../constants'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import {db} from '../../firebase'

const icons = [
    <i className='bx bx-receipt'></i>,
    <i className='bx bx-user'></i>,
    <i className='bx bx-cube'></i>,
    <i className='bx bx-dollar'></i>
]

const OverallList = () => {

    const dataCollectionRef = collection(db, "kas");
   
    const [pemasukan, setPemasukan] = useState(0)
    const [pengeluaran, setPengeluaran] = useState(0)
    const [keterangan, setKeterangan] = useState("")
    const [tanggal, setTanggal] = useState([]);



    const TambahData = async () => {
        await addDoc(dataCollectionRef, {
            pemasukan: parseInt(pemasukan),
            pengeluaran:parseInt(pengeluaran),
            keterangan:keterangan,
            tanggal:new Date(tanggal),
            saldo:parseInt(pemasukan-pengeluaran)
        });
        window.location.reload(true);
    }
    return (
        <ul className='overall-list'>
            <li className="overall-list__item">
                <div className="overall-list__item__icon">
                    <i className='bx bx-dollar'></i>
                </div>
                <div className="overall-list__item__info">
                    <span>Pemasukan</span>
                    <input style={{width:'80%', height:30, boxSizing:'border-box', padding:5}} type='number'
                            onChange={(event) => {
                                setPemasukan(event.target.value);
                            }}
                    />
                </div>
            </li>
            <li className="overall-list__item">
                <div className="overall-list__item__icon">
                    <i className='bx bx-dollar'></i>
                </div>
                <div className="overall-list__item__info">
                    <span>Pengeluaran</span>
                    <input style={{width:'80%', height:30, boxSizing:'border-box', padding:5}} type='number'
                            onChange={(event) => {
                                setPengeluaran(event.target.value);
                            }}
                    />
                </div>
            </li>
            <li className="overall-list__item">
                <div className="overall-list__item__icon">
                    <i className='bx bx-receipt'></i>
                </div>
                <div className="overall-list__item__info">
                    <span>Tanggal</span>
                    <input style={{width:'80%', height:30, boxSizing:'border-box', padding:5}} type='date'
                            onChange={(event) => {
                                setTanggal(event.target.value);
                            }}
                    />
                </div>
            </li>
            <li className="overall-list__item">
                <div className="overall-list__item__icon">
                    <i className='bx bx-receipt'></i>
                </div>
                <div className="overall-list__item__info">
                    <span>Keterangan</span>
                    <textarea name="keterangan" cols="20" rows="7" onChange={(event) => {
                                setKeterangan(event.target.value);
                                console.log(keterangan, "desa");
                            }}/>
                </div>
            </li>
            <li style={{justifyContent:'center', display:'flex'}}>
                <button style={{width:100, height:50, padding:10, backgroundColor:'#24a0ed', color:'white', borderRadius:12, border:'none', fontSize:18}}
                onClick={TambahData}
                >Tambah</button>
            </li>
        </ul>
    )
}

export default OverallList

// import React from 'react'

// export default function OverallList() {
//   return (
//     <div>
      
//     </div>
//   )
// }
