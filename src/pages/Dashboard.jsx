import React, {useEffect, useState} from 'react'
import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import OverallList from '../components/overall-list/OverallList'
import RevenueList from '../components/revenue-list/RevenueList'
import TableData from '../components/table/TableData'

import {db} from '../firebase'
import {
    collection,
    getDocs
} from 'firebase/firestore'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const dataCollectionRef = collection(db, "kas");
    const [kas, setKas] = useState([]);

    const pemasukan = (kas.reduce((x,y)=>x=x + y.pemasukan,0))
    const pengeluaran =(kas.reduce((x,y)=>x=x + y.pengeluaran,0))
    const saldo = pemasukan - pengeluaran;

    useEffect(() => {
        const getKas = async () => {
          const data = await getDocs(dataCollectionRef);
        //   console.log(data, "data");
          setKas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        console.log(kas, 'data')
    
        getKas();
      }, []);

      const rupiah =(number)=>{
        return new Intl.NumberFormat('id-ID', {
            style:'currency',
            currency:'IDR'
          }).format(number)
      } 

      const persentPemasukan = (Math.round((pemasukan / 10000000) * 100))
      const persentPengeluaran = (Math.round(pengeluaran / 10000000 * 100))
      const persentSaldo = (Math.round(saldo / 10000000 * 100))

      console.log(pengeluaran,'persen')

    const dataCard =[
        {
            title: 'Pemasukan',
            subtitle: 'Total Pemasukan',
            value: rupiah(pemasukan),
            percent: persentPemasukan
        },
        {
            title: 'Pengeluaran',
            subtitle: 'Total Pengeluaran',
            value: rupiah(pengeluaran),
            percent: persentPengeluaran
        },
        {
            title: 'Saldo',
            subtitle: 'Total Saldo Saat Ini',
            value: rupiah(saldo),
            percent: persentSaldo
        },
    ]

    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-12 col-md-12">
                        <div className="row">
                            {
                               dataCard.map((item, index) => (
                                    <div key={index} className="col-4 col-md-4 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {/* <div className="col-4 hide-md">
                        <SummaryBoxSpecial item={data.revenueSummary} />
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-12">
                        <Box>
                            <TableData/>
                            {/* <RevenueByMonthsChart /> */}
                        </Box>
                    </div>
                </div>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <div className="title mb">Overall</div>
                <div className="mb">
                    <OverallList />
                </div>
                {/* <div className="title mb">Revenue by channel</div>
                <div className="mb">
                    <RevenueList />
                </div> */}
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Dashboard

// const TableData = () => {
    
//     return (
//         <>
//             <div className="title mb">
//                 Revenue by months
//             </div>
//             <div>
//                 <Bar options={chartOptions} data={chartData} height={`300px`} />
//             </div>
//         </>
//     )
// }