import { MDBCol, MDBRow } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import languages from '../configData/languages.json'
import Markdown from 'react-markdown'
import './Info.css'
import ChartTemperaturesMean from '../chartTemperature'
import ChartNDVI from '../chartNDVI'
import BarchartFrequency from '../barchartFrequency'

function Info({
  currentLanguage
}) {
  const [markdownIntro, setMarkdownIntro] = useState('');
  const [markdownData, setMarkdownData] = useState('');
  const [markdownMethodsI, setMarkdownMethodsI] = useState('');
  const [markdownMethodsII, setMarkdownMethodsII] = useState('');
  const [markdownMethodsIII, setMarkdownMethodsIII] = useState('');
  const [markdownMethodsIV, setMarkdownMethodsIV] = useState('');
  const [markdownMethodsV, setMarkdownMethodsV] = useState('');
  const [markdownResultI, setMarkdownResultI] = useState('');
  const [markdownResultII, setMarkdownResultII] = useState('');
  const [markdownResultIII, setMarkdownResultIII] = useState('');
  const [markdownReferences, setMarkdownReferences] = useState('');




  const [heatPlot, setHeatPlot] = useState('')



  const [markdownContent, setMarkdownContent] = useState('');

  const fetchMarkdown = async (url, setValue) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch Markdown file');
      }

      const content = await response.text();
      setValue(content);
    } catch (error) {
      console.error('Error fetching Markdown file:', error);
    }
  };

  useEffect(() => {

    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_intro.md', setMarkdownIntro);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_data.md', setMarkdownData);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_1_2.md', setMarkdownMethodsI);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_3_heatwave.md', setMarkdownMethodsII);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_4_ssp.md', setMarkdownMethodsIII);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_5_extrapolation.md', setMarkdownMethodsIV);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_6_7.md', setMarkdownMethodsV);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_results_1.md', setMarkdownResultI);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_results_2.md', setMarkdownResultII);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_results_3.md', setMarkdownResultIII);
    fetchMarkdown('https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_references.md', setMarkdownReferences);


  }, [])


  return (
    <div style={{ width: "100vw", height: "92vh", overflow: "hidden" }}>
      <MDBRow style={{ height: "82vh", overflowY: "scroll" }}>
        <MDBRow className='text-panel text-start'>
          <Markdown>

            {markdownIntro}
          </Markdown>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownData}
          </Markdown>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownMethodsI}
          </Markdown>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <MDBCol lg={6}>
            <Markdown >
              {markdownMethodsII}
            </Markdown>
          </MDBCol>
          <MDBCol lg={6}>
            <ChartTemperaturesMean url='https://geo-services.geographie.uni-erlangen.de/api/rekke/getPlotCSV?filename=doy_threshold.csv' />
          </MDBCol>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownMethodsIII}
          </Markdown>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <MDBRow lg={6}>
            <Markdown >
              {markdownMethodsIV}
            </Markdown>
          </MDBRow>
          <MDBRow lg={6} className='d-flex justify-content-center align-items-center' style={{ width: "100vw" }}>
            <ChartNDVI url='https://geo-services.geographie.uni-erlangen.de/api/rekke/getPlotCSV?filename=bin_agg_plot.csv' />
          </MDBRow>

        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownMethodsV}
          </Markdown>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <MDBRow >
            <Markdown >
              {markdownResultI}
            </Markdown>
          </MDBRow>
          <MDBRow >
            <MDBCol lg={6}>
              <BarchartFrequency 
              url='https://geo-services.geographie.uni-erlangen.de/api/rekke/getPlotCSV?filename=FIG_mean_heat_days2.csv' 
              title={"Heatdays per decade"}
              yLabel={"mean heatdays per decade"}

              />
            </MDBCol>
            <MDBCol lg={6}>
              <BarchartFrequency 
              url='https://geo-services.geographie.uni-erlangen.de/api/rekke/getPlotCSV?filename=FIG_mean_heat_waves2.csv' 
              title={"Heatwaves per decade"}
              yLabel={"mean heatwaves per decade"}

              />
            </MDBCol>
          </MDBRow>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownResultII}
          </Markdown>
        </MDBRow>


        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownResultIII}
          </Markdown>
        </MDBRow>
        <MDBRow className='text-panel text-start'>
          <Markdown >
            {markdownReferences}
          </Markdown>
        </MDBRow>
      </MDBRow>
    </div>
  )
}

export default Info