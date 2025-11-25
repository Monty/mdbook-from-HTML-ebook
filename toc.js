// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Introduction</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="CONTENTS.html">Table of Contents</a></li><li class="chapter-item expanded affix "><li class="part-title">The Adventures of Sherlock Holmes</li><li class="chapter-item expanded "><a href="chapter-01.html"><strong aria-hidden="true">1.</strong> A SCANDAL IN BOHEMIA</a></li><li class="chapter-item expanded "><a href="chapter-02.html"><strong aria-hidden="true">2.</strong> THE RED-HEADED LEAGUE</a></li><li class="chapter-item expanded "><a href="chapter-03.html"><strong aria-hidden="true">3.</strong> A CASE OF IDENTITY</a></li><li class="chapter-item expanded "><a href="chapter-04.html"><strong aria-hidden="true">4.</strong> THE BOSCOMBE VALLEY MYSTERY</a></li><li class="chapter-item expanded "><a href="chapter-05.html"><strong aria-hidden="true">5.</strong> THE FIVE ORANGE PIPS</a></li><li class="chapter-item expanded "><a href="chapter-06.html"><strong aria-hidden="true">6.</strong> THE MAN WITH THE TWISTED LIP</a></li><li class="chapter-item expanded "><a href="chapter-07.html"><strong aria-hidden="true">7.</strong> THE ADVENTURE OF THE BLUE CARBUNCLE</a></li><li class="chapter-item expanded "><a href="chapter-08.html"><strong aria-hidden="true">8.</strong> THE ADVENTURE OF THE SPECKLED BAND</a></li><li class="chapter-item expanded "><a href="chapter-09.html"><strong aria-hidden="true">9.</strong> THE ADVENTURE OF THE ENGINEER’S THUMB</a></li><li class="chapter-item expanded "><a href="chapter-10.html"><strong aria-hidden="true">10.</strong> THE ADVENTURE OF THE NOBLE BACHELOR</a></li><li class="chapter-item expanded "><a href="chapter-11.html"><strong aria-hidden="true">11.</strong> THE ADVENTURE OF THE BERYL CORONET</a></li><li class="chapter-item expanded "><a href="chapter-12.html"><strong aria-hidden="true">12.</strong> THE ADVENTURE OF THE COPPER BEECHES</a></li><li class="chapter-item expanded affix "><a href="notes.html">Transcriber’s Note:</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="about.html">About This Book</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0].split("?")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
