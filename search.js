---
layout: null
---
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
var itemsjs = itemsjs(documents, configuration);
// add vue component for pagination
const { createApp } = Vue

createApp({
    data: function () {

        // making it more generic
        var filters = {};
        Object.keys(configuration.aggregations).map(function (v) {
            filters[v] = [];
        })

        // adding pagination variables
        var page = this.page || 1;
        var per_page = this.per_page || 50;

        return {
            query: '',
            // initializing filters with empty arrays
            filters: filters,
            selected_filters: [],
            sort_keys: Object.keys(configuration.sortings),
            sort: '',
            // setting pagination variables
            page: page,
            per_page: per_page
        }
    },

    methods: {
        reset: function () {
            var filters = {};
            Object.keys(configuration.aggregations).map(function (v) {
                filters[v] = [];
            })

            this.filters = filters;
            this.query = '';
            this.page = 1;
        },
        goToPage: function (page) {
            this.page = page;
            return page;
        },
        remove_filter: function (facet, name) {
            this.filters[facet] = this.filters[facet].filter(v => {
            return v !== name;
            });
        }    
          
    },
    watch: {
        query: function () {
         this.page = 1;
       }
    },
    computed: {
        searchResult: function () {

            var result = itemsjs.search({
                query: this.query,
                filters: this.filters,
                page: this.page,
                per_page: 50,
                sort: this.sort
              })
        
              // creating selected filters flat array
              this.selected_filters = [];
              for (const [key, value] of Object.entries(this.filters)) {
        
                for (const name in value) {
                  this.selected_filters.push({
                    name: value[name],
                    facet: key
                  })
                }
              }
        
              return result
        }
    }
}).mount('#el')