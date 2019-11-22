import * as mongoose from 'mongoose';
export namespace DataBaseController {
    export const connect = async (db_name: string) => {
        try {
            const uri = `mongodb+srv://WithoutHands:Sasha080701@mycluster-qntjt.azure.mongodb.net/${db_name}?retryWrites=true&w=majority`;
            await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        } catch (error) {
            throw error;
        }
    };

    export const disconnect = async() => {
        try {
            await mongoose.disconnect();
            console.log('disconnect');
        } catch (error) {
            throw error;
        }
    };
}
