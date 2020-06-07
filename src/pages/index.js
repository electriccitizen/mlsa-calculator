import React, { useState } from 'react'
import theme from '../../theme';
import { PageHeader } from '../components/PageHeader'

import { useForm } from '@formiz/core';
import { MultiStepsLayout } from '../components/MultiStepsLayout'
import { InitiateInterview } from '../components/01-InitiateInterview/IntiateInterview'
import { BasicInformation } from '../components/02-BasicInformation/BasicInformation'
import {
  ThemeProvider, ColorModeProvider, CSSReset, Box, Stack, Flex,
} from '@chakra-ui/core'

export default function Home() {
  const form = useForm();
  const [isMontana, setIsMontana] = useState("");

  const updateMontana = (status) => {
    setIsMontana(status)
  }

  const handleSubmit = (values) => {
    //toastValues(values);
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
          <InitiateInterview />
          <BasicInformation />
        </MultiStepsLayout>
      </ColorModeProvider>
    </ThemeProvider>
  );
};
