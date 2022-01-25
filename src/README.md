I wanted to experiment with using [mdbook](https://github.com/rust-lang/mdBook)
to add Table of Contents, search, and theme functionality to an HTML book. Since
Markdown allows embedded HTML I figured it might be a simple task -- and it was.

I used the HTML format of a 
[Project Gutenberg eBook](https://www.gutenberg.org/ebooks/48320)
for sample content. I extracted its css and chapters into individual files as
follows:

```
1,152w! src/Gutenberg.css
153,204w! src/about.md
205,410w! src/CONTENTS.md
411,1510w! src/chapter-01.md
1511,2582w! src/chapter-02.md
2583,3352w! src/chapter-03.md
3353,4435w! src/chapter-04.md
4436,5286w! src/chapter-05.md
5287,6346w! src/chapter-06.md
6347,7289w! src/chapter-07.md
7290,8451w! src/chapter-08.md
8452,9371w! src/chapter-09.md
9378,10376w! src/chapter-10.md
10377,11458w! src/chapter-11.md
11459,12567w! src/chapter-12.md
12789,12878w! src/notes.md
```
I then moved the images directory from the ebook to the src directory so
image links would work correctly.

Links that used to refer to page numbers in the single file won't work
since there are now multiple files. This would be simple to fix.

Other than the standard creation of a SUMMARY.md file, and adding the two
additional-css files (font-family.css, Gutenberg.css) to book.toml
I only made one functional change:
To prevent text flowing around right justified paragraphs (class="right nomt")
I added following horizontal lines (--- in chapters 1, 10, 11, and 12.)

You can change the book to any "Web-safe" font by modifying font-family.css
appropriately.
