/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */
/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";
var iPDFScroll = {
    /**
     * The URL for the NOT OPTIMIZED version of Mozilla's pdf.js
     * @const
     * @type {string}
     */
    PDFJS_URL: 'https://raw.github.com/mozilla/pdf.js/gh-pages/build/pdf.js',

    /**
     * The grey border when PDF is displayed natively on iOS.
     * @const
     * @type {number}
     */
    PDF_BORDER: 16,

    /**
     * Main function of this module. It does everything you need.
     * @param {string} pdfUrl the location of the PDF file to be displayed.
     * @param {string|element} el the id/element on which the PDF will be displayed.
     * @param {string=} pdfjsUrl an optional URL pointing to the pdf.js file. Defaults to iPDFScroll.PDFJS_URL.
     */
    showPDF: function(pdfUrl, el, pdfjsUrl) {
        console.log("[iPDFScroll.showPDF] pdfUrl: "+pdfUrl+", el: "+el+", pdfjsUrl: "+pdfjsUrl);
        var viewPort = null,
            frag = null,
            fit = '#view=FitH', // Currently not supported...
            pdfObject = null,
            wrapper = typeof el == 'object' ? el : document.getElementById(el),
            onPDFDocLoaded =  function (pdfDoc){
                console.log("[iPDFScroll.showPDF.onPDFDocLoaded] pdfDoc: "+typeof pdfDoc);

                // Get the view port of the first page so can get width and height values of the PDF
                pdfDoc.getPage(1).then(function(page) {
                    viewPort = page.getViewport(1.0);
                });

                // Create a <object> element to display the PDF natively
                pdfObject = document.createElement('object');
                pdfObject.width = viewPort.width + iPDFScroll.PDF_BORDER + 'px';
                //pdfObject.width = '100%';

                // Calculate the total height of the <object> to completely show the PDF (numPages x 1st page Height)
                pdfObject.height = (viewPort.height * pdfDoc.numPages) + 'px';
                pdfObject.data = pdfUrl + fit;

                console.log("[iPDFScroll.showPDF.onPDFDocLoaded] pdfObject.height: "+pdfObject.height+", pdfObject.width: "+pdfObject.width);

                // Create a document fragment to insert the <object> (fast DOM manipulations)
                frag = document.createDocumentFragment();
                frag.appendChild(pdfObject);

                // Make the wrapper element scrollable (native implementation)
                wrapper.style.overflowY = 'scroll';
                wrapper.style.webkitOverflowScrolling = 'touch';

                // add the fragment with the <object> to the DOM.
                wrapper.appendChild(frag);
            },
            onPDFJSLoad = function (){
                console.log("[iPDFScroll.showPDF.onPDFJSLoad] PDFJS: "+typeof PDFJS);

                // Disable workers to avoid yet another cross-origin issue (workers need the URL of
                // the script to be loaded, and currently do not allow cross-origin scripts)
                PDFJS.disableWorker = true;

                // Asynchronously download PDF as an ArrayBuffer
                PDFJS.getDocument(pdfUrl + fit).then(onPDFDocLoaded);

            };

        pdfjsUrl = (pdfjsUrl ? pdfjsUrl : this.PDFJS_URL);
        this.loadPDFJS(onPDFJSLoad,pdfjsUrl);
    },

    /**
     * Loads the Mozilla's PDFJS module if not loaded yet.
     * @param {function=} onLoad an optional function that's executed once the module is loaded.
     * @param {string=} pdfjsUrl an optional URL pointing to the pdf.js file. If none is provided,
     * it defaults to the NON OPTIMIZED version from Github.
     */
    loadPDFJS: function(onLoad, pdfjsUrl){
        console.log("[iPDFScroll.loadPDFJS] onLoad: "+typeof onLoad+", pdfjsUrl: "+pdfjsUrl);
        if(typeof loadPDFJS === 'object'){
            onLoad();
        }
        else{
            var d=document,
                h=d.getElementsByTagName('head')[0],
                s=d.createElement('script');
            s.type='text/javascript';
            s.async=true;
            s.src= this.PDFJS_URL;
            if(typeof onLoad === 'function'){
                s.onload = onLoad;
            }
            h.appendChild(s);
        }
    }
};