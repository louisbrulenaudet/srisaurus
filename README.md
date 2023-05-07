# srisaurus

<img align="right" src="https://deno.land/logo.svg" height="150px" alt="the deno mascot dinosaur standing in the rain">

Ultralight, non-dependent and minimalist open-source package to recursively generate **sha-256**, **sha-384** or **sha-512** subresource integrity hashes to authenticate **.js** and **.css** files.

```js
import { Srisaurus } from "https://deno.land/x/srisaurus/mod.ts"

let hash = new Srisaurus("SHA-256")
await hash.get("./public/css");
```

[Subresource Integrity](https://developer.mozilla.org/fr/docs/Web/Security/Subresource_Integrity) or SRI is a [W3C recommendation](https://www.w3.org/TR/SRI/) to provide a method to protect website delivery from CDN-served malicious code.

To use SRI, a website author wishing to include a static resource can specify a cryptographic hash of the resource in addition to the location of the resource. Browsers fetching the resource can then compare the hash provided by the website author with the hash computed from the resource. If the hashes don't match, the resource is discarded.

```html
<script src="https://cdn.example.com/app.js"
        integrity="sha384-+/M6kredJcxdsqkczBUjMLvqyHb1K/JThDXWsBVxMEeZHEaMKEOEct339VItX1zB"
></script>
```

This package aims at automating the process of generating cryptographic hashes in order to facilitate their access, by parsing directories and subdirectories to extract static files.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/louisbrulenaudet/open-sri/issues)
[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-blue.svg?logo=deno)](https://deno.land/x/cli_badges)  

## Features

- Low memory usage
- Executable for generating applications quickly
- High availability for synchronization with CDN systems
- Simple deployment with one-line integration

## Installation

This is a [Deno third party module](https://deno.land/x) module available through the [Deno.land registry]https://deno.land/x).

Before installing, download and install [Deno.land](https://deno.com/manual@v1.33.2/getting_started/installation). Deno works on macOS, Linux, and Windows as a single binary executable. It has no external dependencies.

## Importing

```js
// Using es6 syntax.
import { Srisaurus } from "https://deno.land/x/srisaurus/mod.ts"
```

## Usage/Examples

```js
import { Srisaurus } from "https://deno.land/x/srisaurus/mod.ts"

let hash = new Srisaurus("SHA-256")
await hash.get("./public/css");
```

```javascript
[
  {
    filepath: 'public/css/index.css',
    hash: 'sha384-yTRuc6ItZNScTYLXkpwURSAsaZLKgfoWi69Nku5bK2/1HW2O8OOgcli2jdgvIJnE'
  }
]
```
Then, we can observe the creation of a JSON element, containing each filepath contained in the directory and its subdirectories, as well as the assignment of a unique hash preceded by the mention `"sha256-"`, `"sha384-"` or `"sha512-"` directly exploitable in your routes configuration file.

## License

Copyright (c) 2022 Louis Brulé Naudet <contact@louisbrulenaudet.com>.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Feedback

If you have any feedback, please reach out to us at contact@louisbrulenaudet.com.
