# analog-testing

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

```