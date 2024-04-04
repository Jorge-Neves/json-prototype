export interface FlashcardModel {
    id: string;
    Question: string;
    Answer: string;
    TypeOfQuestion: string;
    Source: string;
    Chapter: string;
    Bonus:string;
    Context?: string;
    Status?: string;
    AnswerImageSource?: string;
    QuestionImageSource?: string;
    AnswerCodeBlock?: string;
    QuestionCodeBlock?: string;
    
}