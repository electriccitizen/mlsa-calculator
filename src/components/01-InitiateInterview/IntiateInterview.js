import React, { useState } from 'react'
import { FormizStep, useForm } from '@formiz/core'
import { FieldInput } from '../Fields/FieldInput';
import { FieldRadio } from '../Fields/FieldRadio';
import { SectionWrapper} from '../SectionWrapper'
import { SectionHeader} from '../SectionHeader'

export const InitiateInterview = ({ updateMontana }) => {
  const form = useForm();

  const setField = (value) => {
    return JSON.parse(localStorage.getItem(value)) && JSON.parse(localStorage.getItem(value))
  }

  let documents = setField('documents')
  let relationship =  setField('relationship')
  let action =  setField('action')
  let location =  setField('location')

  let updateState = (name,value) => {
    //console.log(value)
    name==='initiate.relationship' && localStorage.setItem('relationship', JSON.stringify( value));
    name==='initiate.action' && localStorage.setItem('action', JSON.stringify( value));
    name==='initiate.location' && localStorage.setItem('location', JSON.stringify( value));
    name==='initiate.documents' && localStorage.setItem('documents', JSON.stringify( value));
    name==='initiate.location' && updateMontana(value)
  }


  return (
    <FormizStep name="initiateInterview">
      <SectionWrapper>
        <SectionHeader
          header={"Let's get started. Tell us about yourself:"}
        />
        <FieldRadio
          name="initiate.relationship"
          required="Required"
          updateState={updateState}
          options={[
            { value: 'mother', label: 'I am the mother' },
            { value: 'father', label: 'I am the father' },
          ]}
        />
      </SectionWrapper>

      {relationship &&
      <SectionWrapper>
        <SectionHeader
          header={"Which documents would you like to produce?"}
          helpLinks={[
            { value: 'http://google.com', label: 'Some official law' },
            { value: 'http://bing.com', label: 'Some other law' },
          ]}
          helpText={{text: "Looks like you can use some guidance, my friend."}}
        />
        <FieldRadio
          name="initiate.documents"
          required="Required"
          updateState={updateState}
          options={[
            { value: 'both', label: 'Both documents' },
            { value: 'worksheets', label: 'Child Support Worksheets' },
            { value: 'affadavit', label: 'Financial Affadavit' },
          ]}
        />
      </SectionWrapper>
      }

      {(documents === 'worksheets' || documents === 'both') && (
        <>
          <SectionWrapper>
            <SectionHeader
              header={" Will this calculation be used to establish a new child support order OR to modify the amount of an existing support order?"}
            />
            <FieldRadio
              name="initiate.action"
              required="Required"
              updateState={updateState}
              options={[
                { value: 'establish', label: 'Establish a new child support order' },
                { value: 'modify', label: 'Modify the amount of an existing support order' },
              ]}
            />
          </SectionWrapper>

          {action === 'establish' ? (
            <SectionWrapper>
              <SectionHeader
                header={"Enter the District Court Case number or CSED Case number for the case in which you are seeking child support."}
              />
              <FieldInput
                name="initiate.csed"
                label="District Court Case Number (CSED)"
                required="Required"
              />
            </SectionWrapper>
          ) : action === 'modify' &&
            <>
              <SectionHeader
                header={"Was the child support order issued in Montana?"}
              />
              <FieldRadio
                name="initiate.location"
                required="Required"
                updateState={updateState}
                options={[
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ]}
              />

              {location === 'yes' &&
              <SectionWrapper>
                <SectionHeader
                  header={"Enter the District Court Case number or CSED Case number for the case in which you are seeking child support."}
                />
                <FieldInput
                  name="initiate.csed"
                  label="District Court Case Number (CSED)"
                  required="Required"
                />
              </SectionWrapper>
              }


            </>
          }

        </>
      )}
    </FormizStep>
  );
};
