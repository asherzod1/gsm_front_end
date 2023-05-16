import React, {useEffect, useState} from 'react';
import './layout.scss'
import {Outlet, useNavigate, useParams} from "react-router";
import axios from "axios";
import {BASE_URL} from "../server/api";
function LayOut(props) {
    const {building, sensor} = useParams();
    const [buildings, setBuildings] = useState([]);
    const [sensors, setSensors] = useState([]);
    const navigate = useNavigate()
    const [activeSensor, setActiveSensor] = useState(1);
    useEffect(()=>{
      axios.get(`${BASE_URL}api/building/`).then(res => {
          console.log(res)
        setBuildings(res.data)
          // setSensors(res.data.sensors)
      })
        if(building){
            axios.get(`${BASE_URL}api/building/${building}`).then(res => {
                console.log(res)
                setSensors(res.data.sensors)
            })
        }
    },[])
    const changeBuilding = (id) => {
        axios.get(`${BASE_URL}api/building/${id}`).then(res => {
            console.log(res)
            setSensors(res.data.sensors)
            navigate('/'+id)
        })
    }

    const changeSensor = (id) => {
        navigate('/'+building+'/'+id)
    }

    return (
        <div className='layout'>
            <div className="right">
                <div className='buildings'>
                    <h2 style={{textAlign:'center'}}>Buildings</h2>
                    {
                        buildings.map((item) => {
                            return (
                                <div key={item.id} className='buildings-item'>
                                    <button onClick={()=>changeBuilding(item.id)} className={Number(building) === item.id ? "buildings-item--button buildings-item--active" : "buildings-item--button"}>
                                        {item.name}
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    activeSensor &&
                    <div className='sensors'>
                        <h3 style={{textAlign:'center', marginTop:'0'}}>Sensors</h3>
                        {
                            sensors.map((item) => {
                                return (
                                    <button onClick={()=> changeSensor(item.id)} className={Number(sensor) === item.id ? "sensors-item--button sensors-item--button--active" : "sensors-item--button"}>
                                        {item.name}
                                    </button>
                                )
                            })
                        }

                    </div>
                }
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default LayOut;
