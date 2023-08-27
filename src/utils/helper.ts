import storage from './storage';
import { getUserInfo } from './api';

export const retrieveAccessToken = async (): Promise<string> => {
    try {
        const result = await storage.get('accessToken');
        const accessToken = result.accessToken || '';
        return accessToken;
    } catch (error) {
        // Handle any errors here
        error('Error retrieving access token:', error);
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

export function gettingUserInfo(
    token: string,
    setUserInfo: React.Dispatch<React.SetStateAction<UserInfoType>>,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
) {
    getUserInfo(token)
        .then((data) => {
            setUserInfo({
                name: data.name,
                avatar: data.avatar_url,
                url: data.hrml_url,
            });
            if (setLoading !== undefined) {
                setLoading(false);
            }
        })
        .catch((error) => error('Get User', error));
}

export function extractRepoNameFromUrl(url: string): string | null {
    const matches = url.match(/\/([^/]+)\/?$/);
    if (matches && matches[1]) {
        return matches[1];
    } else {
        return null;
    }
}
