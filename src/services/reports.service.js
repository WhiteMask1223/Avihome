import ReportModel from "@/models/Report.Model";



/**************************{ Read }**************************/

export const getReports_Service = async () => {
    try {
        const reports = await ReportModel.find()
        .populate('userId', 'name')
        .populate('reportedUserId', 'name')
        .populate('offertId', 'title')
        .lean();
        
        return reports;
    } catch (error) {
        throw new Error('Error getReports_Service: ' + error.message);
    }
};


/**************************{ Create }**************************/

export const saveReport_Service = async (data) => {
    try {
        const newReport = new ReportModel(data);
        const savedReport = await newReport.save();

        return savedReport;
    } catch (error) {
        throw new Error('Error savereport_Service: ' + error.message);
    };
};


/**************************{ Delete }**************************/

export const deleteReportById_Service = async (reportId) => {
    try {
        const result = await ReportModel.deleteOne({ _id: reportId });

        if (!result.acknowledged) {
            return { error: true, status: 404, message: "Reporte no Encontrado" }
        };

        return result
    } catch (error) {
        throw new Error('Error deleteReportById_Service: ' + error.message);
    };
};

