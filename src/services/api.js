import { getJourneyGroup, getJourneySummary, saveGroupDraft } from "./mockApi"





export const getSummary = async (appid) => {
    return await getJourneySummary(appid);
}


export const getGroup = async (appId, groupNo) => {
    return await getJourneyGroup(appId, groupNo);
}

export const saveDraft = async (appid, groupNo, data) => {
    return await saveGroupDraft(appid, groupNo, data);
}





export const updateAppStatus = async (appid, status) => {
    // Mock implementation of status update
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Application ${appid} status updated to ${status}`);
            resolve({ success: true });
        }, 500);
    });
}