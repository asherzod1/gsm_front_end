import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';
import './valuesChart.scss'
import {useParams} from "react-router";
import axios from "axios";
import {BASE_URL} from "../server/api";
function ValuesChart(props) {
    const [data, setData] = useState([]);
    const {sensor} = useParams();
    const [activeSensor, setActiveSensor] = useState(sensor)
    useEffect(()=>{
        setActiveSensor(sensor)
        axios.get(`${BASE_URL}api/sensor/${sensor}/`).then(res=>{
            setData(arrayToChart(res.data.values))
            console.log(res)
        })
    },[sensor])
    console.log(sensor)
    console.log(data)
    useEffect(() => {
        console.log(props)
        axios.get(`${BASE_URL}api/sensor/${activeSensor}/`).then(res=>{
            setData(arrayToChart(res.data.values))
            console.log(res)
        })
        // asyncFetch();
    }, []);
    useEffect(() => {
        // const interval = setInterval(() => {
        //     let res = data
        //     lines.forEach((line, index)=>{
        //             res.push({
        //                 year: new Date().toISOString(),
        //                 value: index+1,
        //                 category: line
        //             })
        //     })
        //     setData(res)
        // }, 1000);

        // return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])
    const lines = ["x", "y", "z", "temperature"]
    const arrayToChart = (array) =>{
        let res = []
        lines.forEach(line=>{
            array.forEach(item=>{
                res.push({
                    year: item.time,
                    value: item[line],
                    category: line
                })
            })
        })

        return res
    }

    const asyncFetch = () => {
        fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => {
                console.log('fetch data failed', error);
            });
    };
    const COLOR_PLATE_10 = [
        '#5B8FF9',
        '#5AD8A6',
        '#5D7092',
        '#F6BD16',
        '#E8684A',
        '#6DC8EC',
        '#9270CA',
        '#FF9D4D',
        '#269A99',
        '#FF99C3',
    ];
    const container = document.getElementById('container');
    const config = {
        data: data,
        // data,
        xField: 'year',
        yField: 'value',
        seriesField: 'category',
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        color: COLOR_PLATE_10,
        point: {
            shape: ({ category }) => {
                return category === 'Gas fuel' ? 'square' : 'circle';
            },
            style: ({ year }) => {
                return {
                    r: Number(year) % 4 ? 0 : 3, // 4 个数据示一个点标记
                };
            },
        },
    };

    return (
        <div>
            <h2 className='title'>Sensor1</h2>
            {activeSensor ?
                <Line {...config} />
                : ''
            }
        </div>
    );
}

export default ValuesChart;
