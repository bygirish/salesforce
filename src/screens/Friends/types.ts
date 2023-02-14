
export type UserType = {
    attributes: {
        type: string;
        url: string;
    },
    Id: string;
    Name: string;
    First_Name__c: string;
    Last_Name__c: string;
    Age__c: number;
    isUserSynced?: boolean;
};
