
const DRAFT_DB = {
    "APP-123": {
        1: { nik: "1234567890", full_name: "John Doe" }
    }
};


export const SCHEMAS = {
    1: {
        meta: { title: "Introduction", groupNo: 1, status: "COMPLETED" },
        forms: [
            {
                formId: "section_ktp",
                // title: "KTP Information",
                fields: [
                    { id: "full_name", type: "text", label: "Nama Applicant", required: true },
                    {
                        id: "verification", type: "radio", label: "Hasil verifikasi", required: true, options: [
                            { value: "verified", label: "Verified" },
                            { value: "not_verified", label: "Not Verified" }
                        ]
                    }
                ]
            },
            {
                formId: "section_ktp",
                // title: "KTP Information",
                fields: [
                    { id: "mother_name", type: "text", label: "Nama Ibu Kandung", required: true },
                    {
                        id: "verification", type: "radio", label: "Hasil verifikasi", required: true, options: [
                            { value: "verified", label: "Verified" },
                            { value: "not_verified", label: "Not Verified" }
                        ]
                    }
                ]
            }
        ]
    },
    2: {
        meta: { title: "Detail Pengajuan", groupNo: 2, status: "IN_PROGRESS" },
        forms: [
            {
                formId: "data_nasabah",
                title: "Data Nasabah",
                fields: [
                    { id: "nomorIdentitas", type: "number", label: "Nomor Identitas", required: true },
                    { id: "fullName", type: "text", label: "Nama Lengkap", required: true },
                    { id: "birthDate", type: "date", label: "Tanggal Lahir", required: true },
                    {
                        id: "gender", type: "radio", label: "Jenis Kelamin", required: true, options: [
                            { value: "male", label: "Laki-laki" },
                            { value: "female", label: "Perempuan" }
                        ]
                    },
                    { id: "motherName", type: "text", label: "Nama Ibu Kandung", required: true },
                    {
                        id: "religion", type: "select", label: "Agama", required: true, options: [
                            { value: "islam", label: "Islam" },
                            { value: "christian", label: "Kristen" },
                            { value: "catholic", label: "Katolik" },
                            { value: "hindu", label: "Hindu" },
                            { value: "buddhist", label: "Budha" },
                            { value: "confucianism", label: "Konghucu" }
                        ]
                    },
                    { id: "lastEducation", type: "text", label: "Pendidikan Terakhir", required: true },
                    {
                        id: "marriageStatus", type: "select", label: "Status Perkawinan", required: true, options: [
                            { value: "single", label: "Single" },
                            { value: "married", label: "Married" },
                            { value: "divorced", label: "Divorced" },
                            { value: "widowed", label: "Widowed" }
                        ]
                    },
                    { id: "phoneNumber", type: "number", label: "Nomor Telepon", required: true },
                    { id: "emailAddress", type: "email", label: "Alamat Email", required: true }
                ]
            },
            {
                formId: "dataPekerjaan",
                title: "Data Pekerjaan",
                fields: [
                    {
                        id: "pekerjaan", type: "select", label: "Pekerjaan", required: false, options: [
                            { value: "karyawan", label: "Karyawan" },
                            { value: "wiraswasta", label: "Wiraswasta" }]
                    },
                    {
                        id: "jabatan", type: "select", label: "Jabatan", required: false, options: [
                            { value: "staff", label: "Staff" },
                            { value: "manager", label: "Manager" },
                            { value: "director", label: "Director" }]
                    },
                    { id: "namaPerusahaan", type: "text", label: "Nama Perusahaan", required: true },
                    {
                        id: "tujuanPembukaanRekening", type: "select", label: "Tujuan Pembukaan Rekening", required: true, options: [

                        ]
                    }
                ]
            }
        ]
    },
    3: {
        meta: { title: "Review", groupNo: 3, status: "LOCKED" },
        forms: []
    }
};

export const getJourneySummary = async (appId) => {
    await new Promise(r => setTimeout(r, 300));


    const groups = Object.keys(SCHEMAS).map(key => ({
        id: SCHEMAS[key].meta.groupNo,
        label: SCHEMAS[key].meta.title,

        status: SCHEMAS[key].meta.status
    }));

    return {
        applicationId: appId,
        applicantName: "Simulated User",
        groups: groups
    };
};

// GET /applications/{appId}/groups/{groupNo}
export const getJourneyGroup = async (appId, groupNo) => {
    console.log(`[MockAPI] Fetching group ${groupNo} for App ${appId}`);
    await new Promise(r => setTimeout(r, 300));

    // 1. Get Schema
    const schema = SCHEMAS[groupNo];

    if (!schema) {
        throw new Error(`Group ${groupNo} configuration not found`);
    }

    // 2. Get Draft Data (Safe access: DB[appId] -> [groupNo])
    const appData = DRAFT_DB[appId] || {};
    const groupData = appData[groupNo] || {};

    // 3. Merge and Return (The "Composite" Response)
    return {
        ...schema, // Returns 'meta' and 'forms'
        values: groupData // The saved answers specific to this App ID
    };
};

// POST /applications/{appId}/groups/{groupNo}/draft
export const saveGroupDraft = async (appId, groupNo, data) => {
    await new Promise(r => setTimeout(r, 300)); // Simulate network

    console.log(`[MockDB] Saving for App ${appId}, Group ${groupNo}:`, data);

    // 1. Initialize App entry if not exists
    if (!DRAFT_DB[appId]) {
        DRAFT_DB[appId] = {};
    }

    // 2. Save the data for this specific group
    DRAFT_DB[appId][groupNo] = data;

    return {
        success: true,
        lastSaved: new Date().toISOString()
    };
};