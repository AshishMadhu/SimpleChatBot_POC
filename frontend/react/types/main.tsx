export type Choice = {
    text: string;
    id: number
};

export type Message = {
    chat: string;
    choices: Array<Choice>;
    text: string;
};

export type ResponseData = {
    chat?: string;
    choices?: Array<Choice>;
    message?: number;
    choice?: number;
    message_details?: Message;
    choice_text?: string;
    text?: string;
};

export type Messages = {
    user_text: string;
    response: ResponseData;
};
