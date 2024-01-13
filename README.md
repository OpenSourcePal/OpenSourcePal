# 🚀Open Source Pal
## Open Source Pal is a web extension built to help beginners in tech get into open source.

## ⚒️ Languages / Tools
1. TypeScript
2. React
3. Tailwind
4. Webextension-polyfill

## 👇🏽 Prerequisites

Before installation, please make sure you have already installed the following tools:

1. [Git](https://git-scm.com/downloads)
2. [NodeJs](https://nodejs.org/en/download/)

## How to Use
1. install it
  [Chrome Link](https://chromewebstore.google.com/detail/open-source-pal/piplcgelcmkbfjinnbgnkeebenabcjjj), other browsers coming soon
2. click on the icon in your extension list
  ![image](https://github.com/OpenSourcePal/OpenSourcePal/assets/78784850/cdea7705-e152-499c-ace4-ce4724b2f046)
3. sign in to github
4. it will ask for an access code, ask on the [discord](https://discord.gg/ufcysW9q23) server in #-coding-talk channel
5. go to github and go to any project you want to contribute to
6. check for an open icon close to your profile picture for github(if you can't see it, refresh the page)
  ![image](https://github.com/OpenSourcePal/OpenSourcePal/assets/78784850/226c8f1a-e1de-4912-b74d-94c4e5098a78)

## Contribute
### 🛠️ Installation Steps
1. Fork the repo
2. Clone the repository
    ```bash
    git clone https://github.com/<your-username>/OpenSourcePal.git
    ```
3. Run
    ```bash
    npm install
    ```
    ```bash
    npm install -g commitizen
    ```
4. Fill in the .env with the .env_sample
   1. [learn how to get a github id & secret](https://www.youtube.com/watch?v=R9lxXQcy-nM) in the field of *Authorization callback URL* use the video below to know how
      https://github.com/OpenSourcePal/OpenSourcePal/assets/78784850/a7f5f28f-59df-4b51-a05a-0264d8a817cd
   2. [Get the api key](https://makersuite.google.com/app/apikey)
   3. For the server url run [the backend code](https://github.com/OpenSourcePal/OSP-backend)
5. Run `npm run dev:{the browser you use}` EX: `npm run dev:chrome`
    ```bash
    npm run dev:{the browser you use}
    ```
6. Use `devmode` for the accesskey
  
### 🥂 After making a change

1. Create a new branch

```bash
git checkout -b YourBranchName
```

2. Add it to staging area

> NOTE: don't commit the package.json

```bash
git add <path to the file you worked on>
```

3. Commit your changes with

```bash
git cz
```

4. Push your changes

```bash
git push
```

>### Load the extension in Chrome & Opera
>
  1. Open Chrome/Opera browser and navigate to chrome://extensions
  2. Select "Developer Mode" and then click "Load unpacked extension..."
  3. From the file browser, choose to `OpenSourcePal/dev/chrome`
  or > (`OpenSourcePal/dev/opera`)
>
>### Load the extension in Firefox
>
 1. Open Firefox browser and navigate to about:debugging
 2. Click "Load Temporary Add-on" and from the file browser, choose  `OpenSourcePal/dev/firefox`
>
>### Load the extension in Edge
>
 <https://docs.microsoft.com/en-us/microsoft-edge/extensions/guides/>adding-and-removing-extensions>

## Available Target Browsers

> `chrome` `firefox` `opera` `edge`

### 👨‍👩‍👦 Community

If you have any questions or comments, I'd be happy to hear your thoughts. on our discord community - [Join us](https://discord.com/invite/ufcysW9q23)

### 👩🏽‍💻 Contributing

- Contributions make the open source community such an amazing place to learn, inspire, and create.
- Any contributions you make are greatly appreciated.
- Check out our [contribution guidelines](/CONTRIBUTING.md) for more information.

### 🛡️ License

Code-Magic is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 💪🏽 Thanks to all Contributors
Thanks a lot for spending your time helping Code-Magic grow. Thanks a lot! Keep rocking🍻
[![Contributors](https://contrib.rocks/image?repo=OpenSourcePal/OpenSourcePal)](https://github.com/OpenSourcePal/OpenSourcePal/graphs/contributors)

### 🙏🏽 Support
This project needs a star️ from you. Don't forget to leave a star✨
