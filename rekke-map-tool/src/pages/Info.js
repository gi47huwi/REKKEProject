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
  const [markdownInfoQualitative, setMarkdownInfoQualitative] = useState('');


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
    console.log(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_intro_${currentLanguage}.md`)
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_intro_${currentLanguage}.md`, setMarkdownIntro);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_data_${currentLanguage}.md`, setMarkdownData);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_1_2_${currentLanguage}.md`, setMarkdownMethodsI);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_3_heatwave_${currentLanguage}.md`, setMarkdownMethodsII);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_4_ssp_${currentLanguage}.md`, setMarkdownMethodsIII);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_5_extrapolation_${currentLanguage}.md`, setMarkdownMethodsIV);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_methods_6_7_${currentLanguage}.md`, setMarkdownMethodsV);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_results_1_${currentLanguage}.md`, setMarkdownResultI);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_results_2_${currentLanguage}.md`, setMarkdownResultII);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_results_3_${currentLanguage}.md`, setMarkdownResultIII);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_references_${currentLanguage}.md`, setMarkdownReferences);
    fetchMarkdown(`https://geo-services.geographie.uni-erlangen.de/api/rekke/getMarkdown?filename=technical_summary_qualitative_${currentLanguage}.md`, setMarkdownInfoQualitative);

  }, [currentLanguage])


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
            {markdownInfoQualitative}
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