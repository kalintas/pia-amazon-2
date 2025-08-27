package com.example.pia_internship.entities;

import java.util.List;

public class ProductQueryResult {
    private List<Product> products;
    private int currentPage;
    private int queryResultCount;

    public ProductQueryResult(List<Product> products, int queryResultCount, int currentPage) {
        this.products = products;
        this.queryResultCount = queryResultCount;
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

    public int getQueryResultCount() {
        return queryResultCount;
    }

    public void setQueryResultCount(int queryResultCount) {
        this.queryResultCount = queryResultCount;
    }
}
