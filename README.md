# analog-testing

## Update 

Since the issue is OS related I decided to try running the app in github codespaces
on the first `npm i` i got: 

```
npm ERR! Error: Cannot find module '@nx/nx-linux-x64-gnu'
npm ERR! Require stack:
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/native/index.js
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/hasher/node-task-hasher-impl.js
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/hasher/task-hasher.js
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/hasher/hash-task.js
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/tasks-runner/run-command.js
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/nx-cloud/utilities/get-cloud-options.js
npm ERR! - /workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/bin/post-install.js
npm ERR!     at Module._resolveFilename (node:internal/modules/cjs/loader:1144:15)
npm ERR!     at Module._load (node:internal/modules/cjs/loader:985:27)
npm ERR!     at Module.require (node:internal/modules/cjs/loader:1235:19)
npm ERR!     at require (node:internal/modules/helpers:176:18)
npm ERR!     at Object.<anonymous> (/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/native/index.js:184:31)
npm ERR!     at Module._compile (node:internal/modules/cjs/loader:1376:14)
npm ERR!     at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
npm ERR!     at Module.load (node:internal/modules/cjs/loader:1207:32)
npm ERR!     at Module._load (node:internal/modules/cjs/loader:1023:12)
npm ERR!     at Module.require (node:internal/modules/cjs/loader:1235:19) {
npm ERR!   code: 'MODULE_NOT_FOUND',
npm ERR!   requireStack: [
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/native/index.js',
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/hasher/node-task-hasher-impl.js',
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/hasher/task-hasher.js',
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/hasher/hash-task.js',
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/tasks-runner/run-command.js',
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/src/nx-cloud/utilities/get-cloud-options.js',
npm ERR!     '/workspaces/analog-testing/analog-pure-vscode-npm/node_modules/nx/bin/post-install.js'
npm ERR!   ]
npm ERR! }
npm ERR! 
npm ERR! Node.js v20.11.1

npm ERR! A complete log of this run can be found in: /home/codespace/.npm/_logs/2024-03-18T17_00_27_210Z-debug-0.log
```

so I added to `package.json` the following 

```
  "optionalDependencies": {
    "@nx/nx-darwin-arm64": "18.0.0",
    "@nx/nx-darwin-x64": "18.0.0",
    "@nx/nx-linux-x64-gnu": "18.0.0",
    "@nx/nx-win32-x64-msvc": "18.0.0"
  }

```
deleted the `node_modules` folder and the `package-lock.json` and ran `npm i` again

# and then `npm run start` and it runs 
in codespaces, but still that works for me for now :) 

### current issue that is preventing me from running those apps 

(it is present on Windows only)

```
[worker reload] Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'D:\D:\Estee\Programming\My-Projects\analog-testing\analog-pure-vscode-npm\node_modules\@analogjs\vite-plugin-nitro\src\lib\runtime\api-middleware' imported from D:\Estee\Programming\My-Projects\analog-testing\analog-pure-vscode-npm\dist\.nitro\dev\index.mjs
    at new NodeError (node:internal/errors:399:5)
    at finalizeResolution (node:internal/modules/esm/resolve:326:11)        
    at moduleResolve (node:internal/modules/esm/resolve:945:10)
    at defaultResolve (node:internal/modules/esm/resolve:1153:11)
    at nextResolve (node:internal/modules/esm/loader:163:28)
    at ESMLoader.resolve (node:internal/modules/esm/loader:838:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:424:18)     
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:77:40)  
    at link (node:internal/modules/esm/module_job:76:36)
```

when the app is served using any of the following commands

`ng serve`
`npm run start`
`npm start`

a `dist` folder is supposed to be created and regenerated containing the `.nitro` folder and needed contents

However in the newer version, this is not happening

## The dist folders that I have here are copied from my previous app - for testing

### the previous app, which runs fine with `npm start` is giving me an error during build

```
An unhandled exception occurred: Could not load file://D:/Estee/Programming/My-Open-Source/AnguHashBlog/analog-spartan/analog-spartan-app/dist/ssr/main.server (imported by node_modules/@analogjs/vite-plugin-nitro/src/lib/runtime/renderer.js): ENOENT: no such file or directory, open 'D:\Estee\Programming\My-Open-Source\AnguHashBlog\analog-spartan\analog-spartan-app\file:\D:\Estee\Programming\My-Open-Source\AnguHashBlog\analog-spartan\analog-spartan-app\dist\ssr\main.server'
See "C:\Users\estee\AppData\Local\Temp\ng-rRvNIG\angular-errors.log" for further details.
```

I feel like there is something related to the file path here also


### the apps here throw this error during build 

```
An unhandled exception occurred: Cannot find module 'D:\D:\Estee\Programming\My-Projects\analog-testing\analog-pure-vscode-npm\node_modules\@analogjs\vite-plugin-nitro\src\lib\runtime\api-middleware' imported from D:\Estee\Programming\My-Projects\analog-testing\analog-pure-vscode-npm\dist\.nitro\prerender\index.mjs
See "C:\Users\estee\AppData\Local\Temp\ng-Zi1GUH\angular-errors.log" for further details.
```

I just noticed `D:\D:\` ;)

as much as I like the thought of double `D`s I rather not have them in this context 

