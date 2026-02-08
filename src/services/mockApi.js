
const DRAFT_DB = {
    "APP-123": {
        1: { nik: "1234567890", full_name: "John Doe" }
    }
};


export const SCHEMAS = {
    1: {
        status: "SUCCESS",
        message: "success",
        data: {
            items: [
                {
                    form_key: "section_ktp",
                    title: "KTP Information",
                    group: 1,
                    order: 1,
                    is_submitted: false,
                    fields: [
                        {
                            field_key: "full_name",
                            type: "FREE_TEXT",
                            label: "Nama Applicant",
                            order: 1,
                            rules: [{ type: "REQUIRED" }],
                            validations: []
                        },
                        {
                            field_key: "verification",
                            type: "RADIO_BUTTON",
                            label: "Hasil verifikasi",
                            order: 2,
                            rules: [{ type: "REQUIRED" }],
                            validations: [
                                { type: "SELECTION", parameter: { minimum_selection: 1 } }
                            ],
                            options: [
                                { code: "verified", title: "Verified", order: 1 },
                                { code: "not_verified", title: "Not Verified", order: 2 }
                            ]
                        }
                    ]
                },
                {
                    form_key: "section_mother",
                    title: "Mother Information",
                    group: 1,
                    order: 2,
                    is_submitted: false,
                    fields: [
                        {
                            field_key: "mother_name",
                            type: "FREE_TEXT",
                            label: "Nama Ibu Kandung",
                            order: 1,
                            rules: [{ type: "REQUIRED" }]
                        },
                        {
                            field_key: "mother_verification",
                            type: "RADIO_BUTTON",
                            label: "Hasil verifikasi",
                            order: 2,
                            rules: [{ type: "REQUIRED" }],
                            options: [
                                { code: "verified", title: "Verified", order: 1 },
                                { code: "not_verified", title: "Not Verified", order: 2 }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    2: {
        status: "SUCCESS",
        message: "success",
        data: {
            items: [
                {
                    form_key: "data_nasabah",
                    title: "Data Nasabah",
                    group: 2,
                    order: 1,
                    is_submitted: false,
                    fields: [
                        {
                            field_key: "nomorIdentitas",
                            type: "FREE_TEXT", // Assuming number input is text-based
                            label: "Nomor Identitas",
                            order: 1,
                            rules: [{ type: "REQUIRED" }]
                        },
                        {
                            field_key: "fullName",
                            type: "FREE_TEXT",
                            label: "Nama Lengkap",
                            order: 2,
                            rules: [{ type: "REQUIRED" }]
                        },
                        // Note: Standard API usually sends Date as FREE_TEXT with validation
                        // or a specific DATE_PICKER type if available. 
                        // I'll keep it simple for now.
                        {
                            field_key: "birthDate",
                            type: "FREE_TEXT",
                            label: "Tanggal Lahir",
                            order: 3,
                            rules: [{ type: "REQUIRED" }]
                        },
                        {
                            field_key: "gender",
                            type: "RADIO_BUTTON",
                            label: "Jenis Kelamin",
                            order: 4,
                            rules: [{ type: "REQUIRED" }],
                            options: [
                                { code: "male", title: "Laki-laki" },
                                { code: "female", title: "Perempuan" }
                            ]
                        },
                        {
                            field_key: "motherName",
                            type: "FREE_TEXT",
                            label: "Nama Ibu",
                            order: 5,
                            rules: [{ type: "REQUIRED" }],

                        },
                        {
                            field_key: "religion",
                            type: "DROP_DOWN_BASIC",
                            label: "Agama",
                            order: 6,
                            rules: [{ type: "REQUIRED" }],
                            options: [
                                { code: "islam", title: "Islam" },
                                { code: "christian", title: "Kristen" },
                                { code: "catholic", title: "Katolik" },
                                { code: "hindu", title: "Hindu" },
                                { code: "buddhist", title: "Budha" },
                                { code: "confucianism", title: "Konghucu" }
                            ]
                        },
                        {
                            field_key: "lastEducation",
                            type: "DROP_DOWN_BASIC",
                            label: "Pendidikan Terakhir",
                            order: 7,
                            rules: [{ type: "REQUIRED" }],
                            options: [
                                { code: "high_school", title: "High School" },
                                { code: "bachelor", title: "Bachelor's Degree" },
                                { code: "master", title: "Master's Degree" },
                                { code: "doctorate", title: "Doctorate" }
                            ]
                        },
                        {
                            field_key: "marriageStatus",
                            type: "DROP_DOWN_BASIC",
                            label: "Status Perkawinan",
                            order: 8,
                            rules: [{ type: "REQUIRED" }],
                            options: [
                                { code: "single", title: "Single" },
                                { code: "married", title: "Married" },
                                { code: "divorced", title: "Divorced" },
                                { code: "widowed", title: "Widowed" }
                            ]
                        },
                        {
                            field_key: "phoneNumber",
                            type: "FREE_TEXT",
                            label: "Nomor Telepon",
                            order: 9,
                            rules: [{ type: "REQUIRED" }]
                        },
                        {
                            field_key: "emailAddress",
                            type: "FREE_TEXT",
                            label: "Alamat Email",
                            order: 10,
                            rules: [{ type: "REQUIRED" }]
                        }
                    ]
                },
                {
                    form_key: "dataPekerjaan",
                    title: "Data Pekerjaan",
                    group: 2,
                    order: 2,
                    is_submitted: false,
                    fields: [
                        {
                            field_key: "pekerjaan",
                            type: "DROP_DOWN_BASIC",
                            label: "Pekerjaan",
                            order: 1,
                            rules: [], // Not Required
                            options: [
                                { code: "karyawan", title: "Karyawan" },
                                { code: "wiraswasta", title: "Wiraswasta" }
                            ]
                        },
                        {
                            field_key: "jabatan",
                            type: "DROP_DOWN_BASIC",
                            label: "Jabatan",
                            order: 2,
                            rules: [], // Not Required
                            options: [
                                { code: "staff", title: "Staff" },
                                { code: "manager", title: "Manager" },
                                { code: "director", title: "Director" }
                            ]
                        },
                        {
                            field_key: "namaPerusahaan",
                            type: "FREE_TEXT",
                            label: "Nama Perusahaan",
                            order: 3,
                            rules: [{ type: "REQUIRED" }]
                        },
                        {
                            field_key: "tujuanPembukaanRekening",
                            type: "DROP_DOWN_BASIC",
                            label: "Tujuan Pembukaan Rekening",
                            order: 4,
                            rules: [{ type: "REQUIRED" }],
                            options: [] // Empty as per request
                        }
                    ]
                }
            ]
        }
    },
    3: {
        status: "SUCCESS",
        message: "success",
        data: {
            items: []
        }
    }
};

// ... (SCHEMAS definition remains as you provided) ...

// ==========================================
// MOCK API FUNCTIONS
// ==========================================

export const getJourneySummary = async (appId) => {
    await new Promise(r => setTimeout(r, 300));

    // Map over the SCHEMAS keys (1, 2, 3) to create the tab list
    const groups = Object.keys(SCHEMAS).map(key => {
        const schemaGroup = SCHEMAS[key];

        // FAIL-SAFE: If data or items are missing (like in Group 3), provide defaults
        const firstItem = schemaGroup.data?.items?.[0] || {};

        // Logic: Use the title from the first form in the group as the Tab Label
        // Or fallback to "Group X" if empty
        const title = firstItem.title || `Group ${key}`;

        // Logic: Infer status. In a real app, this comes from a separate 'status' field.
        // For now, let's just hardcode "IN_PROGRESS" or derive it.
        const status = schemaGroup.status === "SUCCESS" ? "IN_PROGRESS" : "LOCKED";

        return {
            id: parseInt(key),
            label: title,
            status: status
        };
    });

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

    // 2. Get Draft Data
    const appData = DRAFT_DB[appId] || {};
    const savedValues = appData[groupNo] || {};

    // 3. Return the exact structure your DynamicGroup expects
    // We return the WHOLE schema object, plus a 'values' key at the root
    return {
        ...schema,
        values: savedValues
    };
};

// POST /applications/{appId}/groups/{groupNo}/draft
export const saveGroupDraft = async (appId, groupNo, data) => {
    await new Promise(r => setTimeout(r, 300));

    console.log(`[MockDB] Saving for App ${appId}, Group ${groupNo}:`, data);

    if (!DRAFT_DB[appId]) {
        DRAFT_DB[appId] = {};
    }

    DRAFT_DB[appId][groupNo] = data;

    return {
        success: true,
        lastSaved: new Date().toISOString()
    };
};