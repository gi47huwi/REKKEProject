import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

function BarchartFrequency({
    url,
    title,
    yLabel
}) {

    const [csvData, setCsvData] = useState([]);
    const [data, setData] = useState({});
    const [loaded, setLoaded] = useState(false);


    const fetchCsvData = async (url, setValue) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch CSV data');
            }

            const text = await response.text();
            const rows = text.split('\n').map(row => row.split(','));

            // Assuming the first row contains headers, you can use it to create an array of objects
            const headers = rows[0];
            const data = rows.slice(1).map(row => {
                const rowData = {};
                headers.forEach((header, index) => {

                    rowData[index] = parseFloat(row[index]);
                });
                return rowData;
            });
            setValue(data);
        } catch (error) {
            console.error('Error fetching CSV data:', error);
        }
    };

    useEffect(() => {
        fetchCsvData(url, setCsvData);
    }, [])

    useEffect(() => {
        if (csvData[0] == null) return;

        console.log(csvData)
        var xValues = ["SSP1", "SSP5"]
        var x2values = ["SSP1", "SSP5"]
        var trace1 = {
            x: xValues,
            y: [csvData[0][1], csvData[0][3]],
            type: 'bar',
            name:"2045-2054",
            marker:{color:"rgb(240, 91, 91)"}


        }
        var trace2 = {
            x: xValues,
            y: [csvData[0][2], csvData[0][4]],
            type: 'bar',
            name:"2085-2094",
            marker:{color:"darkred"}
        }
        var trace3 = {
            x: ["ERA5I"],
            y:[csvData[0][0]],
            type:"bar",
            name:"1993-2002",
            marker:{color:"lightblue"}
        }
        var trace4 = {
            x:["ERA5I","SSP1","SSP5"],
            y:[csvData[0][0],csvData[0][0],csvData[0][0],],
            type:"scatter",
            mode:"lines",
            name:"reference",
            line:{
                dash:"dot",
                color:"grey"
            }
        }

        setData([trace3, trace1, trace2, trace4]);
        // console.log([trace1, trace2, trace3])
        setLoaded(true);

    }, [csvData])

    return (
        loaded ?
        window.innerWidth<575?
            <Plot
                data={data}
                layout={{
                    width: window.innerWidth/1.2,
                    dragmode:"pan",
                    showlegend: true,
                    title:{text:title},
                    yaxis:{
                        title:yLabel
                    },
                    legend: {
                        orientation: "h",

                    },
                   
                }}

            />
            : <Plot
            data={data}
            layout={{
                width:window.innerWidth/4,
                showlegend: true,
                title:{text:title},
                yaxis:{
                    title:yLabel
                }
               
            }}

        />
            : <></>
    );

}

export default BarchartFrequency