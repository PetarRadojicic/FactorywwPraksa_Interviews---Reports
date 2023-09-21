export const userBuilder = (candidateId, candidateName, companyId, companyName,interviewDate,phase,status,note ) => {
    return {
        id: Math.floor(Math.random() * 1000000),
        candidateId: candidateId,
        candidateName: candidateName,
        companyId: companyId,
        companyName: companyName,
        interviewDate: interviewDate?.toString(),
        phase: phase,
        status: status,
        note: note
    };
};