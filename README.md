# Advice for Students

Source for https://merylye.github.io/student-advice/

## Editing

- **Add or change a link:** edit `_data/resources.yml`. Each entry shows up in the Library and on every topic page listed under `topics`.
- **Edit a topic page:** edit the Markdown file in `topics/`.
- **Edit other pages:** `index.html` (home), `_includes/thoughts.md` and `_includes/sources.md` (both shown on the home page), `library.html`.
- **Change topic names or blurbs:** `_data/topics.yml`.
- **Styles:** `assets/css/style.css`.

GitHub Pages rebuilds the site automatically after each push.

## Preview locally

```
gem install jekyll
jekyll serve
```
Then open http://localhost:4000/student-advice/
