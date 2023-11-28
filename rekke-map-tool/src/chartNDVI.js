import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

function ChartNDVI({
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
        var xValues = []
        var trace1 = {
            x: xValues,
            y: [],
            mode: 'markers+lines',
            type: 'scatter',
            name: 'non forest areas',
            marker: { size: 2 },
            line: { width: 1, color: "red" }

        }
        var trace2 = {
            x: xValues,
            y: [],
            mode: 'markers+lines',
            type: 'scatter',
            name: 'forest areas',
            marker: { size: 2 },
            line: { width: 1, color: "lightblue" }


        }

        csvData.forEach(element => {
            xValues.push(element[0]);
            trace1.y.push(element[1]);
            if (element[2] != "NA") {
                trace2.y.push(element[2])
            }

        });

        setData([trace1, trace2]);
        // console.log([trace1, trace2, trace3])
        setLoaded(true);

    }, [csvData])

    return (
        loaded ?
            window.innerWidth < 575 ?
                <Plot
                    data={data}
                    layout={{
                        width: window.innerWidth/1.2,
                        showlegend: true,
                        legend: {
                            orientation: "h",

                        },
                        xaxis: {
                            title: { text: 'Number of heat waves', standoff: 5 },
                            showgrid: false,
                            automargin: false,
                            zeroline: true

                        },
                        yaxis: {
                            title: 'Mean NDVI',
                            zeroline: true,
                            rangemode: 'tozero',
                            range: [0.45, 0.7]

                        }
                    }}

                />
                : <Plot
                    data={data}
                    layout={{
                        width: window.innerWidth / 1.5,
                        showlegend: true,
                        legend: {
                            orientation: "v",

                        },
                        xaxis: {
                            title: { text: 'Number of heat waves', standoff: 5 },
                            showgrid: false,
                            automargin: false,
                            zeroline: true

                        },
                        yaxis: {
                            title: 'Mean NDVI',
                            zeroline: true,
                            rangemode: 'tozero',
                            range: [0.45, 0.7]

                        }
                    }}

                />
            : <></>
    );

}

export default ChartNDVI