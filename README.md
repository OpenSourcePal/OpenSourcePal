# Open Source Pal
### Run 
- Fork the repo
- Clone the repository
  ```bash
  git clone https://github.com/<your-username>/OpenSourcePal.git
  ```
- Run
  ```bash
  npm install
  ```
- Fill in the env sample
- Run `npm run dev:{the browser you use}` EX: `yarn dev:chrome`
  ```bash
  npm run dev:{the browser you use}
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

## Developing

>The following tasks can be used when you want to start developing the extension
>and want to enable live reload -
>`npm run dev:{target browser}` or `yarn dev:{target browser}`

## Profiling

> Run `npm run profile:{target browser}` or `yarn profile:{target browser}`

## Packaging

>Run `npm run build:{target browser}` or `yarn build:{target browser}` to create a zipped,
production-ready extension for each browser.
You can then upload that to the app store.

## Available Target Browsers

> `chrome` `firefox` `opera` `edge`

---

This project is licensed under the MIT license.

If you have any questions or comments, please create a new issue.
I'd be happy to hear your thoughts.
