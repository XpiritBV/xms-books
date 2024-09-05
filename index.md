---
layout: default
title: "Search and Browse"
---
 
<div class="container-fluid" style="margin-top: 50px;" id="el">
{% raw %}
   
    <div class="row">
        <div class="col-md-2 col-xs-2">

<section class="facet" v-for="facet in searchResult.data.aggregations">
  <div class="facet-header">
    <strong class="facet-title">{{ facet.title }}</strong>
  </div>
  <div class="facet-body" id="facetCheckboxes">
    <ul class="facet-group">
      <li class="facet-group-item"  v-for="bucket in facet.buckets">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" v-model="filters[facet.name]" v-bind:value="bucket.key">
          {{ bucket.key }} ({{ bucket.doc_count }})
        </label>
      </li>
    </ul>
  </div>
</section>

        </div>

        <div class="col-md-10 col-xs-10">
                     <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" v-model="query" class="form-control form-control-lg bg-white" placeholder="Type to search">
            <div class="search-feedback">Found {{ searchResult.pagination.total }} books in {{ searchResult.timings.search }} ms. </div>
          </div>
        </form>

<div class="breadcrumbs" style="margin: 0 0 10px 0; " v-if="selected_filters.length">

        <span v-for="filter in selected_filters" class="badge rounded-pill bg-primary" v-on:click="remove_filter(filter.facet, filter.name)" style="margin-right: 5px; cursor: pointer;">{{ filter.name }}
          <span class="glyphicon glyphicon-remove"></span>
        </span>

        <span class="badge rounded-pill bg-danger float-end" v-on:click="reset()" style="cursor: pointer; margin-right: 0;">Clear filters
          <span class="glyphicon glyphicon-remove"></span>
        </span>

      </div>
         
        
            <ul class="align">
            
                <li v-for="item of searchResult.data.items" >
                    <figure class="book">

                        <!-- Front -->

                        <ul class="hardcover_front">
                            <li>
                                <img v-bind:src="item.imageUrl" alt="" style="width: 100%; height: 100%;" width="100%" height="100%" />
                            </li>
                            <li></li>
                        </ul>

                        <!-- Pages -->

                        <ul class="page">
                            <li></li>
                            <li>
                                <a class="btn" v-bind:href="item.url">see details</a>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>

                        <!-- Back -->

                        <ul class="hardcover_back">
                            <li></li>
                            <li></li>
                        </ul>
                        <ul class="book_spine">
                            <li></li>
                            <li></li>
                        </ul>
                        <figcaption>
                            <h1><a v-bind:href="item.url" class="text-decoration-none text-black">{{ item.titleShort || item.title }}</a></h1>
                            <span>By {{ item.author }}</span>
                            <p>{{ item.excerpt }}</p>
                        </figcaption>
                    </figure>
                </li>

            </ul>
           
        </div>

        <div class="clearfix" style="margin-bottom: 100px;"></div>
  
    </div>
    {% endraw %}
</div>

  <script src="search.js"></script>
