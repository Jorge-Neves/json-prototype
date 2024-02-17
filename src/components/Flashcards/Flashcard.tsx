import React, {
  FC,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from 'react';

const Flashcard: FC<{ flashcard: any }> = (props) => {
  console.log(props.flashcard);
  const { Question, Answer } = props.flashcard;
  const [flip, setFlip] = useState<boolean>(false);
  const [height, setHeight] = useState<number | string>('initial');
  const frontEl = useRef() as MutableRefObject<HTMLDivElement>;
  const backEl = useRef() as MutableRefObject<HTMLDivElement>;
  const setMaxHeight = () => {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  };
  useEffect(setMaxHeight, [Question, Answer]);
  const cardFlip = () => {
    setFlip(!flip);
    setTimeout(() => {
      setFlip(false);
    }, 60000);
  };
  let userInput: ReturnType<typeof setTimeout> | undefined;
  const cardFlipHandler = () => {
    if (!!userInput) {
      clearTimeout(userInput);
    }
    userInput = setTimeout(() => {
      cardFlip();
      userInput = undefined;
    }, 100);
  };
  return (
    <div
      className={`card ${flip ? 'flip' : ''}`}
      style={{ height: height }}
      onClick={cardFlipHandler}
    >
      <div className="front" ref={frontEl}>
        {Question} {props.flashcard.question}
        <br />
        <br />
        <p className="label">{props.flashcard.id}</p>
      </div>
      <div className="back" ref={backEl}>
        <p>
          {Answer} {props.flashcard.answer}
          <br />
          <p className="label">{props.flashcard.id}</p>
        </p>
      </div>
    </div>
  );
};

export default Flashcard;
