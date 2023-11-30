import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

function ChartTemperaturesMean({
    url
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
            const rows = text.split('\n').map(row => row.split(';'));

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
        // console.log(csvData)
        var xValues = []
        var trace1 = {
            x: xValues,
            y: [],
            mode: 'markers',
            type: 'scatter',
            name: 'mean Temperature',
            marker: { size: 2 }

        }
        var trace2 = {
            x: xValues,
            y: [],
            mode: 'markers',
            type: 'scatter',
            name: 'mean Temperature smooth (30 days mov. win.)',
            marker: { size: 2 }

        }
        var trace3 = {
            x: xValues,
            y: [],
            mode: 'line',
            type: 'scatter',
            name: 'heat threshhold',
            line: { width: 0.5, color: "black" }

        }

        csvData.forEach(element => {
            xValues.push(element[0]);
            trace1.y.push(element[1]);
            if (element[2] != "NA") {
                trace2.y.push(element[2])
            }
            if (element[3] != "NA") {
                trace3.y.push(element[3])
            }
        });

        setData([trace1, trace2, trace3]);
        // console.log([trace1, trace2, trace3])
        setLoaded(true);

    }, [csvData])

    return (
        loaded ?
            <Plot
                data={data}
                layout={{
                    title: { text: "Mean 30-yrs temperature per day of year" },
                    width: window.innerWidth<575?window.innerWidth:window.innerWidth/3,
                    showlegend: true,
                    dragmode:window.innerWidth<575?"pan":"select",
                    legend: {
                        orientation: "h",

                    },
                    xaxis: {
                        title: { text: 'Day of year', standoff: 5},
                        showgrid: false,
                        automargin: false,
                    },
                    yaxis: {
                        title: 'Temperature [°C]',
                    }
                }}

            />
            : <></>
    );

}

export default ChartTemperaturesMean