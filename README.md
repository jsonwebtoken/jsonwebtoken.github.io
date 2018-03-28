## JWT.io

<img src="https://cdn.auth0.com/blog/jwtio/jwtio.png"/>

[![Build Status](https://travis-ci.org/jsonwebtoken/jsonwebtoken.github.io.png?branch=master)](https://travis-ci.org/jsonwebtoken/jsonwebtoken.github.io)

### How to add a library
To add a library, simply edit the `data.json` file located at `views/website/libraries`.

If you add a new language, you will need to provide a proper icon for it and place it in the `img` folder.

Here's a commented example of a language + library definition. All fields must have valid values unless noted:

```javascript
// Language name (unique)
".NET": {

  // Unique identifier that will be used as a CSS class
  // for this language (only valid CSS class names).
  "uniqueClass": "net",
  
  // The language icon, SVG format preferred, should be placed
  // in /img directory.
  "image": "/img/1.svg",
  
  // The color of header that displays the name of the language
  // and the icon. This is a valid CSS color definition.
  "bgColor": "rgb(42, 168, 229)",
  
  // An array of libraries for this language.
  "libs": [
    {
      // In case the library suffered from a vulnerability, the
      // minimum version in which the vuln was fixed must be
      // listed here. Optional (can be null).
      "minimumVersion": "1.0.1", // or null
      
      // Supported features, true for supported,
      // false for not supported.
      "support": {
        "sign": true,
        "verify": true,
        "iss": true,
        "sub": true,
        "aud": true,
        "exp": true,
        "nbf": true,
        "iat": true,
        "jti": true,
        "hs256": true,
        "hs384": true,
        "hs512": true,
        "rs256": true,
        "rs384": true,
        "rs512": true,
        "es256": true,
        "es384": true,
        "es512": true
      },
      
      // Author URL, can be GitHub profile, personal page
      // company page, etc. Can be null.
      "authorUrl": "https://www.microsoft.com", // or null
      
      // Author name.
      "authorName": "Microsoft",
      
      // For the star count, this is the GitHub repository path,
      // (usually user/repo). Can be null (no star count shown).
      "gitHubRepoPath": "AzureAD/azure-activedirectory-identitymodel-extensions-for-dotnet", // or null
      
      // URL for source code.
      "repoUrl": "https://github.com/MSOpenTech/azure-activedirectory-identitymodel-extensions-for-dotnet",
      
      // Install command, can be HTML or plain text.
      "installCommandHtml": "Install-Package<br><a href=\"https://www.nuget.org/packages/System.IdentityModel.Tokens.Jwt/\">System.IdentityModel.Tokens.Jwt</a>"
    }
  ]
}
```

### How to build

First, install the required dependencies:

```sh
npm install
```

In order to build (and run) the project execute:

```sh
grunt
```

You will find the generated files in the `dist` directory. For the website, you can run a server at its root. For example: `http-server dist/website`. The default `grunt` task runs a server
at [https://127.0.0.1:8000](https://127.0.0.1:8000) and watches
for changes.

To run tests, execute:

```
grunt test
```

Look at the end of the `Gruntfile` for other common tasks.

### Happy hacking!
