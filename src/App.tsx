import React, { FC, useState } from 'react';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { Window } from 'react-windows-xp';
import BlobCreator from './components/Blob/BlobCreator';
import Form from './components/Upload/Form';
import FlashcardCollection from './components/Flashcards/FlashcardCollection';
import './App.css';

createStore({
  JSONData: null,
});

enum NavbarOptions {
  CREATE = 'create',
  UPLOAD = 'upload',
  REVIEW = 'review',
}

const App: FC = () => {
  const [shouldDisplayCards, setShouldDipslayCards] = useState<boolean>(false);
  const [navbar, setNavbar] = useState<string>();

  const flashcardHandler = () => {
    setShouldDipslayCards(true);
  };
  return (
    <StateMachineProvider>
      <div className="App">
        <Window
          showClose
          showMaximize
          showHelp
          showMinimize
          title="create flashcards"
        >
          <BlobCreator />
        </Window>
        <Window
          showClose
          showMaximize
          showHelp
          showMinimize
          title="Upload flashcards"
        >
          <Form flashcardHandler={flashcardHandler} />
        </Window>
        <Window
          showClose
          showMaximize
          showHelp
          showMinimize
          title="Study flashcards!"
        >
          {shouldDisplayCards && <FlashcardCollection />}
        </Window>
      </div>
    </StateMachineProvider>
  );
};

export default App;
