import { IMessage } from '../@types/@types';
import Message from '../db/models/message-model';


export const messageService = {
    // יצירת הודעה חדשה
    createMessage: async (data: IMessage) => {
        console.log('Creating a new message with data:', data);
        const message = new Message(data);
        console.log('Message created:', message);
        return message.save();
    },

    // קבלת כל ההודעות
    getAllMessages: async () => {
        console.log('Fetching all messages');
        const messages = await Message.find({}).sort({ createdAt: -1 });
        console.log('Messages fetched:', messages);
        return messages;
    },
};