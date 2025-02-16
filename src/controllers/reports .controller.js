import { 
    getReports_Service,
    saveReport_Service,
    deleteReportById_Service
 } from "@/services/reports.service";

/**************************{ Read }**************************/

export const getReports_Controller = async () => {
    const reports = await getReports_Service();

    return reports;
};


/**************************{ Create }**************************/

export const saveReport_Controller = async (data) => {
    const res = await saveReport_Service(data);

    return res;
};


/**************************{ Delete }**************************/

export const deleteReportById_Controller = async (id) => {
    const res = await deleteReportById_Service(id);

    return res;
};

