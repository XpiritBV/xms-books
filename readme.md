# The Xpirit book catalog

A useful list of books we, as Xpirit, think are interesting to others. 

## Customize

There are a couple of places where you can make changes to suit it to your needs. First is to look at the `_config.yml` file. This is where you can change the site's title, description, and other things that are used in the header and footer of the site. As well as specifing the analytics code and the comments configuration. At the moment, we only have Giscus, but other can be added as well by adding them to the `_includes/comments.html` file.

Each book is placed under the `_books` folder and contains some metadata. A title, author, imageUrl are the minimal fields. You can also use the `titleShort` to render a shortened version of the title. Tags, pillar, audience etc are all fields you can configure yourself. If you want a different facet, feel free to extend/change. 

However, you do need to adjust the `search.js` file as well. It needs to output the field into the array and you will need to add the facet to the configuration object.

```yaml
var documents = [
    {% for book in site.books %}
    {
    "title": "{{ book.title | escape }}",
    "titleShort": "{{ book.titleShort | escape }}",
    "author": "{{ book.author | escape }}",
    "url": "{{ book.url | relative_url }}",
    "pillars": {{ book.pillars | jsonify }},
    "topics": {{ book.topics | jsonify}},
    "tags": {{ book.tags | jsonify }},
    "audiences": {{ book.audiences | jsonify }},
    "date": "{{ book.date }}",
    "imageUrl": "{{ book.imageUrl | relative_url }}",
    "excerpt": "{{ book.excerpt | strip | strip_newlines | strip_html }}"
} {% unless forloop.last %}, {% endunless %}
 {% endfor %}
];
```

and the corresponding config:

```js
var configuration = {
    sortings: {
        title_asc: {
            // field name in data
            field: 'title',
            // possible values asc or desc
            order: 'asc'
        }
    },
    aggregations: {
        pillars: {
            title: 'Engineering Pillar',
            // conjunctive facet (AND)
            conjunction: true,
            // the default is 10
            size: 8
        },
        audiences: {
            title: 'Audience',
            // conjunctive facet (AND)
            conjunction: true
        },
        topics: {
            title: 'Topic',
            // conjunctive facet (AND)
            conjunction: true
        },
        tags: {
            title: 'Tag',
            // conjunctive facet (AND)
            conjunction: true,
            // the default is 10
            size: 20
        }
    },
    searchableFields: ['title', 'pillars','audiences', 'excerpt', 'author'],
};
```

## Running locally

You can run this locally when you have Jekyll installed. 

```bash
jekyll serve
```

or 

```bash
JEKYLL_ENV=production jekyll serve
```

to also enable the comments and analytics which are normally only available in production mode.

## Publishing

You can push this repository to a GitHub repo and enable the Pages option. This will automatically build the site and publish it.

## Contributing

If you have any suggestions or improvements, feel free to open an issue or a pull request.
