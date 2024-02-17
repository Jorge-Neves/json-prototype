import React, { useState, useEffect } from 'react';
import { useForm, Controller, useWatch } from 'react-hook-form';
import styled, { css } from 'styled-components';

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;

  color: black;
`;

const FileNameSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;

  padding: 5vh;

  color: black;
`;

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: auto;
  width: 50vw;
  padding: 10vh;

  color: black;
`;
const DownloadButton = styled.button`
  margin: 1rem;
  padding: 1rem;
  color: black;
  border-radius: 0.5em;
`;

const ParallelSections = styled.div`
  display: flex;
  flex-direction: row;
`;

const JSONPreview = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: auto;
  width: 50vw;
  padding: 10vh;
  color: black;
  text-align: left;
`;

const JSONmock = styled.div`
  text-align: left;
  width: 100%;
`;

const JSONmockContent = styled.div`
  text-align: left;
  padding-left: 1.5rem;
`;

const JSONmocKeys = styled.div`
  text-align: left;
  padding-left: 3rem;
`;

const BodySection = styled.div`
  z-index: -1;
`;

const JSONOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-items: center;
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BlobCreator = () => {
  const [fileNameState, setFileNameState] = useState('');
  const [counter, setCounter] = useState<number>(0);
  const [jsonData, setJsonData] = useState<any>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: '',
      Question: '',
      Answer: '',
      TypeOfQuestion: 'Short-Answer',
      Source: '',
      Chapter: '',
      Bonus: '',
    },
  });

  const { control } = useForm({
    defaultValues: { JSONNumber: '' },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    jsonData.push(data);
    console.log(jsonData);
    const increaseCounter = counter + 1;
    setCounter(increaseCounter);
  };

  const watchFile = useWatch({ control, name: 'JSONNumber' });

  useEffect(() => {
    setFileNameState(watchFile);
    console.log(fileNameState);
    setValue('id', `Question-${counter}`);
  });

  const removeLastItemHandler = () => {
    const processedData = jsonData.slice(0, -1);
    setJsonData(processedData);
    const decreaseCounter = counter - 1;
    setCounter(decreaseCounter);
  };

  const removeAllItemsHandler = () => {
    setJsonData([]);
    setCounter(0);
  };

  const downloadJSON = async () => {
    const fileName = fileNameState;
    const json = JSON.stringify(jsonData);
    let blob: any = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    const href = await window.URL.createObjectURL(blob);
    link.href = href;
    link.download = fileName;
    link.click();
  };

  return (
    <BodySection>
      <NavBar>
        <h1 className="Input-spacing">JSON Maker</h1>
      </NavBar>
      <form>
        <FileNameSection>
          <Controller
            control={control}
            name="JSONNumber"
            render={({ field: { onChange, value, name } }) => (
              <>
                <h2 className="Input-spacing">JSON File Name</h2>
                <input
                  className="Input-spacing"
                  onChange={onChange}
                  name={name}
                  value={value}
                  placeholder="JSONNumber"
                />
              </>
            )}
          />
        </FileNameSection>
      </form>
      <ParallelSections>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HeroSection>
            <h2 className="Input-spacing">Form</h2>
            <FormRow>
              <FormColumn>
                <label className="Input-spacing">Question</label>
                <textarea
                  className="Input-spacing"
                  placeholder="Question"
                  rows={9}
                  {...register('Question', { required: true })}
                />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <label className="Input-spacing">Answer</label>
                <textarea
                  className="Input-spacing"
                  placeholder="Answer"
                  rows={9}
                  {...register('Answer', { required: true })}
                />
              </FormColumn>
            </FormRow>
            <FormRow>
              <FormColumn>
                <label className="Input-spacing">Source</label>
                <input
                  className="Input-spacing"
                  type="text"
                  placeholder="Source"
                  {...register('Source', { required: true })}
                />
                <label className="Input-spacing">Type of Question</label>
                <select
                  className="Input-spacing"
                  {...register('TypeOfQuestion', { required: true })}
                >
                  <option value="Short-Answer">Short-Answer</option>
                  <option value="True/False">True/False</option>
                  <option value="Multi-Choice">Multi-Choice</option>
                  <option value="Cloze-Deletions">Cloze-Deletions</option>
                </select>
              </FormColumn>
              <FormColumn>
                <label className="Input-spacing">Chapter</label>
                <input
                  className="Input-spacing"
                  type="text"
                  placeholder="Chapter"
                  {...register('Chapter', { required: true })}
                />
                <label className="Input-spacing">Bonus</label>
                <input
                  className="Input-spacing"
                  type="text"
                  placeholder="Bonus"
                  {...register('Bonus')}
                />
              </FormColumn>
            </FormRow>

            <label className="Input-spacing">Options</label>
            <JSONOptions>
              <input className="Input-spacing" type="submit" />
              <button type="button" onClick={removeLastItemHandler}>
                Remove
              </button>
              <button type="button" onClick={removeAllItemsHandler}>
                Remove All
              </button>
            </JSONOptions>
            <DownloadButton
              className="Input-spacing"
              type="button"
              onClick={downloadJSON}
            >
              Download
            </DownloadButton>
          </HeroSection>
        </form>
        <JSONPreview>
          <h1>Preview</h1>
          <JSONmock>{'['}</JSONmock>
          {jsonData.map((flashcard: any) => {
            return (
              <JSONmockContent>
                <br />
                {'{'}
                <br />
                <JSONmocKeys>
                  <br /> "id" : "{flashcard?.id}" , <br />
                  <br /> "Question" : "{flashcard.Question}" , <br />
                  <br /> "Answer" : "{flashcard.Answer}", <br />
                  <br /> "TypeOfQuestion" : "{flashcard?.TypeOfQuestion}" <br />
                  <br /> "Source" : "{flashcard?.Source}", <br />
                  <br /> "Chapter" : "{flashcard?.Chapter}", <br />
                  <br /> "Bonus" : "{flashcard?.Bonus}", <br />
                  <br />
                </JSONmocKeys>
                {'},'}
                <br />
              </JSONmockContent>
            );
          })}
          <JSONmock>{']'}</JSONmock>
        </JSONPreview>
      </ParallelSections>
    </BodySection>
  );
};

export default BlobCreator;
