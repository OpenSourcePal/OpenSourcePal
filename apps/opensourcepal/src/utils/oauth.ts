const BASE_URL = 'https://github.com/login';

const USER_CODE_ENDPOINT = '/device/code';
const USER_AUTH_ENDPOINT = '/oauth/access_token';

const CLIENT_ID = process.env.GITHUB_ID;

export const getVerificationCode = async () => {
    console.log(CLIENT_ID);

    const response = await fetch(BASE_URL + USER_CODE_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            client_id: CLIENT_ID,
            scope: 'gist',
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });

    const data = await response.json();
    return data;
};

export const pollAuthorization = async (deviceCode: string, interval: number) => {
    let data;

    while (!data?.access_token) {
        const response = await fetch(BASE_URL + USER_AUTH_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                client_id: CLIENT_ID,
                device_code: deviceCode,
                grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        data = await response.json();
        await new Promise((resolve) => setTimeout(resolve, interval * 1000));
    }

    return data.access_token;
};
