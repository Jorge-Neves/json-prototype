import { useStateMachine } from 'little-state-machine';
import React, { FC } from 'react';

import Flashcard from './Flashcard';

const FlashcardCollection: FC = () => {
  const { state } = useStateMachine();
  return (
    <div className="card-grid">
      <p>FlashcardCollection</p>
      {state.JSONData.parsed.map((flashcard: any) => {
        return <Flashcard flashcard={flashcard} />;
      })}
    </div>
  );
};

export default FlashcardCollection;
