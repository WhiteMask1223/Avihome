import LogEntrieModel from "@/models/LogEntrie.model";


/**************************{ Read }**************************/

export const getLogEntries_Service = async () => {
    try {
        const entries = await LogEntrieModel.find().sort({ createdAt: -1 }).populate({ path: 'user', select: 'name' }).lean();

        return entries;
    } catch (error) {
        throw new Error('Error getLogEntrys_Service: ' + error.message);
    }
};


/**************************{ Create }**************************/

export const saveLogEntrie_Service = async (data) => {
    try {
        const newEntrie = new LogEntrieModel(data);
        const savedEntrie = await newEntrie.save();

        return savedEntrie;
    } catch (error) {
        throw new Error('Error saveLogEntrie_Service: ' + error.message);
    };
};