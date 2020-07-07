import React from 'react'
import theme from '../../theme';
import {
  ThemeProvider, ColorModeProvider, CSSReset,
} from '@chakra-ui/core'
import { PageHeader } from '../layout/PageHeader'
import { PageLayout } from '../layout/PageLayout'

export default function Notes() {

  return (
    <ThemeProvider theme={theme}>
      <ColorModeProvider>
        <CSSReset />
        <PageLayout>
          <PageHeader>
          Development notes
          </PageHeader>
        </PageLayout>
      </ColorModeProvider>
    </ThemeProvider>
  );
};
