# iPDF Scroll

**iPDF Scroll**
A very small JavaScript library for loading and displaying inline PDF documents on HTML pages natively.
It relies on the great library [pdf.js](https://github.com/mozilla/pdf.js) from Mozilla.

This library and the sample code is Open Source under the [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.html).

**Usage**
Basic usage is just one line of code:

$// Must specify the PDF url and the parent id/element where the PDF should be rendered
$iPDFScroll.showPDF(pdfUrl,'pdfScroller');

It will first try to load Mozilla's [pdf.js](https://github.com/mozilla/pdf.js) - which is not distribution ready (not compressed) -
, calculate the total dimensions of the PDF and create the <object> with the PDF's dimension for correct rendering.

I also didn't bother to optimize the code or create unit test. Too simple.

Enjoy!

PS: If you find any bugs or want more features, please contribute with your skills!

**Author(s):**

* [William R. J. Ribeiro](https://github.com/williamrjribeiro) [@bill_bsb](http://twitter.com/bill_bsb), will at williamrjribeiro dot com)

## Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

