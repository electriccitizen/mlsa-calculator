import React, { useState } from 'react'
import theme from '../../theme';
import { PageHeader } from '../components/PageHeader'

import { useForm } from '@formiz/core';
import { MultiStepsLayout } from '../components/MultiStepsLayout'
import { InitiateInterview } from '../components/01-InitiateInterview/IntiateInterview'
import { BasicInformation } from '../components/02-BasicInformation/BasicInformation'
import { useToastValues } from '../hooks/useToastValues';
import {
  ThemeProvider, ColorModeProvider, CSSReset, Box, Stack, Flex,
} from '@chakra-ui/core'

// fetch('/.netlify/functions/pdf-gen')
//   .then(res => res.text())
//   .then(text => console.log(text))


export default function Home() {
  const form = useForm();
  const [isMontana, setIsMontana] = useState("");
  const toastValues = useToastValues();
  const updateMontana = (status) => {
    setIsMontana(status)
  }
  const [appState, setAppState] = useState({
    loading: false,
    pdf: null,
  });


  const handleSubmit = (values) => {
    //toastValues(values);

    const data = values;

    fetch('/.netlify/functions/pdf-gen/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        //console.log('Data:', data);
        setAppState({ loading: false, pdf: data });
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // fetch(pdf)
    //   .then((res) => res.json())
    //   .then((file) => {
    //     setAppState({ loading: false, pdfBase64: file });
    //   });


    form.invalidateFields({
      'docker.image': 'You can display an error after an API call',
      'initiate.worksheets': 'You can display an error after an API call',
    });
    const stepWithError = form.getFieldStepName('initiate.worksheets');
    form.goToStep(stepWithError);
  };

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <MultiStepsLayout
          form={form}
          onValidSubmit={handleSubmit}
          submitLabel="Create app"
          isMontana={isMontana}
        >
          <PageHeader githubPath="UseCase1/index.js">
            Child Support Calculator
          </PageHeader>
          <div>
            <a href={"data:application/pdf;base64," + appState.pdf +""} download="file.pdf">Download me</a>
          </div>
          <InitiateInterview />
          <BasicInformation />
        </MultiStepsLayout>
      </ColorModeProvider>
    </ThemeProvider>
  );
};
