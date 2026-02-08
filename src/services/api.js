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





