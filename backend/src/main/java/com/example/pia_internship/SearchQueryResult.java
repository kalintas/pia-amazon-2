package com.example.pia_internship;

import java.util.List;

public class SearchQueryResult {
    private List<Product> products;
    private int currentPage;
    private int searchResultCount;

    public SearchQueryResult(List<Product> products, int searchResultCount, int currentPage) {
        this.products = products;
        this.searchResultCount = searchResultCount;
        this.currentPage = currentPage;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getSearchResultCount() {
        return searchResultCount;
    }

    public void setSearchResultCount(int searchResultCount) {
        this.searchResultCount = searchResultCount;
    }
}
