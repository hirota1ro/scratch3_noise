# Perlin Noise Extension for Scratch 3.0

<img width="323" alt="screenshot" src="https://user-images.githubusercontent.com/45020018/82853148-dd227380-9f3f-11ea-8e74-4664a80656cd.png">

## Screenshots







## Getting Started

### Required Tools

The following tools are required.
* git
* node.js

### Prepareing Server

Create working directory (e.g. `scratch3`).
```
mkdir scratch3; cd scratch3
```

Obtain Scratch 3.0 source code into `scratch3` directory.
```
git clone --depth 1 https://github.com/llk/scratch-vm.git
git clone --depth 1 https://github.com/llk/scratch-gui.git
```
Execute the following command.
```
cd scratch-vm
npm install
npm link
cd ..
```
When `npm link`, you may need `sudo`.

Execute the following command.
```
cd scratch-gui
npm install
npm link scratch-vm
```

### Installing Extension

Obtain extension source code.
```
git clone https://github.com/hirota1ro/scratch3_noise
```
Copy extension files into `scratch-gui` and `scratch-vm`.

The directory tree after the copy is as follows.
```
scartch3
├scratch-gui
│└src
│　└lib
│　　└libraries
│　　　└extensions
│　　　　└noise
│　　　　　├noise-small.svg
│　　　　　└noise.svg
└scratch-vm
　└src
　　└extensions
　　　└scratch3_noise
　　　　├index.js
　　　　└PerlinNoise.js
```
Edit `scratch-vm/src/extension-support/extension-manager.js`.
```
diff --git a/src/extension-support/extension-manager.js b/src/extension-support/extension-manager.js
index 7cb556c..cd8990f 100644
--- a/src/extension-support/extension-manager.js
+++ b/src/extension-support/extension-manager.js
@@ -23,7 +23,8 @@ const builtinExtensions = {
     ev3: () => require('../extensions/scratch3_ev3'),
     makeymakey: () => require('../extensions/scratch3_makeymakey'),
     boost: () => require('../extensions/scratch3_boost'),
-    gdxfor: () => require('../extensions/scratch3_gdx_for')
+    gdxfor: () => require('../extensions/scratch3_gdx_for'),
+    noise: () => require('../extensions/scratch3_noise')
 };
 
 /**
```
Edit `scratch-gui/src/lib/libraries/extensions/index.jsx`.
```
diff --git a/src/lib/libraries/extensions/index.jsx b/src/lib/libraries/extensions/index.jsx
index ba18b91..6541520 100644
--- a/src/lib/libraries/extensions/index.jsx
+++ b/src/lib/libraries/extensions/index.jsx
@@ -46,6 +46,9 @@ import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
 import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
 import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';
 
+import noiseIconURL from './noise/noise.svg';
+import noiseInsetIconURL from './noise/noise-small.svg';
+
 export default [
     {
         name: (
@@ -317,5 +320,13 @@ export default [
             />
         ),
         helpLink: 'https://scratch.mit.edu/vernier'
+    },
+    {
+        name: "Noise",
+        extensionId: 'noise',
+        iconURL: noiseIconURL,
+        insetIconURL: noiseInsetIconURL,
+        description: "Perlin Noise generator",
+        featured: true
     }
 ];
```

### Executing program

To start the node.js, make `scratch-gui` the current directory and run the following command.
```
npm start
```

Access `http://localhost:8601` from your web browser.

To stop the node.js, press the `Control+C` key.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* [Scratch 3.0 Extensions](https://github.com/LLK/scratch-vm/blob/develop/docs/extensions.md)
* [Scratch 3.0の拡張機能を作ってみよう](https://ja.scratch-wiki.info/wiki/Scratch_3.0の拡張機能を作ってみよう)
* [Scratch 3.0 の Extension(拡張機能) を試してみた](https://blog.champierre.com/1133)
* [Scratch 3.0でオリジナルブロックをつくろう](https://qiita.com/Hiroyuki_OSAKI/items/a46e1c881d3aed4661f7)
