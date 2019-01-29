// Original by Tanguy Krotoff <https://github.com/tkrotoff>
// Updated by Andrew Potter <https://github.com/GolaWaya>

import * as CleanCSS from 'clean-css';

let source = 'a{font-weight:bold;}';
console.log(new CleanCSS().minify(source).styles);

source = '@import url(http://path/to/remote/styles);';
new CleanCSS().minify(source, (error: any, minified: CleanCSS.Output): void => {
  console.log(minified.styles);
});

const pathToOutputDirectory = 'path';

new CleanCSS({ sourceMap: true, rebaseTo: pathToOutputDirectory })
  .minify(source, (error: any, minified: CleanCSS.Output): void => {
    // access minified.sourceMap for SourceMapGenerator object
    // see https://github.com/mozilla/source-map/#sourcemapgenerator for more details
    // see https://github.com/jakubpawlowicz/clean-css/blob/master/bin/cleancss#L114 on how it's used in clean-css' CLI
    console.log(minified.sourceMap);
});

const inputSourceMapAsString = 'input';
new CleanCSS({ sourceMap: true, rebaseTo: pathToOutputDirectory })
  .minify(source, inputSourceMapAsString, (error: any, minified: CleanCSS.Output): void => {
    // access minified.sourceMap to access SourceMapGenerator object
    // see https://github.com/mozilla/source-map/#sourcemapgenerator for more details
    // see https://github.com/jakubpawlowicz/clean-css/blob/master/bin/cleancss#L114 on how it's used in clean-css' CLI
    console.log(minified.sourceMap);
});

new CleanCSS({ sourceMap: true, rebaseTo: pathToOutputDirectory }).minify({
  'path/to/source/1': {
    styles: '...styles...',
    sourceMap: '...source-map...'
  },
  'path/to/source/2': {
    styles: '...styles...',
    sourceMap: '...source-map...'
  }
}, (error: any, minified: CleanCSS.Output): void => {
  // access minified.sourceMap as above
  console.log(minified.sourceMap);
});

new CleanCSS().minify(['path/to/file/one', 'path/to/file/two']);

new CleanCSS().minify({
  'path/to/file/one': {
    styles: 'contents of file one'
  },
  'path/to/file/two': {
    styles: 'contents of file two'
  }
});

// new tests - promise resolution
new CleanCSS({ returnPromise: true, rebaseTo: pathToOutputDirectory }).minify(source)
    .then((minified: CleanCSS.Output): void => {
        console.log(minified.styles);
    }).catch((error: any): void => {
        console.log(error);
    }
);

new CleanCSS({ returnPromise: true, sourceMap: true }).minify(source)
    .then((minified: CleanCSS.Output): void => {
        // access minified.sourceMap as above
        console.log(minified.sourceMap);
    }).catch((error: any): void => {
        console.log(error);
    }
);

new CleanCSS({ returnPromise: true, sourceMap: true }).minify(source, inputSourceMapAsString)
    .then((minified: CleanCSS.Output): void => {
        // access minified.sourceMap as above
        console.log(minified.sourceMap);
    }).catch((error: any): void => {
        console.log(error);
    }
);

// test object return when passing options as object
let CleanCssOptions: CleanCSS.Options = { returnPromise: true };
new CleanCSS(CleanCssOptions).minify(source)
    .then((minified: CleanCSS.Output): void => {
        console.log(minified.styles);
    }).catch((error: any): void => {
        console.log(error);
    }
);

CleanCssOptions = { returnPromise: false };
new CleanCSS(CleanCssOptions).minify(source, (error: any, minified: CleanCSS.Output): void => {
    console.log(minified.styles);
});


// type conversion
CleanCssOptions = {};
// in this case, the compiler will think its an OptionsOutput
//  so if we want to make it a promise, we will need to cast it specifically its a promise type return
(CleanCssOptions = CleanCssOptions as CleanCSS.OptionsPromise).returnPromise = true;
new CleanCSS(CleanCssOptions).minify(source)
    .then((minified: CleanCSS.Output): void => {
        console.log(minified.styles);
    }).catch((error: any): void => {
        console.log(error);
    }
);