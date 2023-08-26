import storage from './storage';

export const retrieveAccessToken = async (): Promise<string> => {
    try {
        const result = await storage.get('accessToken');
        const accessToken = result.accessToken || '';
        return accessToken;
    } catch (error) {
        // Handle any errors here
        console.error('Error retrieving access token:', error);
        return '';
    }
};

export const info = (task: string, data?: any) => {
    if (data === undefined) {
        console.log(`======== SINGLE INFO ${task} ========`);
        return;
    }
    console.log(`======== INFO FROM ${task} START ========`);
    console.log(`${data}`);
    console.log(`======== INFO FROM ${task} END ========`);
};

export const error = (task: string, error: any) => {
    console.log(`======== ERROR IN ${task} START ========`);
    console.error(`${error}`);
    console.log(`======== ERROR IN ${task} END ========`);
};
