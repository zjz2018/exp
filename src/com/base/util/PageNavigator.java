package com.base.util;

import java.io.Serializable;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class PageNavigator implements Serializable {

    private static final long serialVersionUID = 8699104395880006391L;

    protected final Log logger = LogFactory.getLog(getClass().getName());

    public static final int DEFAULT_PAGE_SIZE = 10;
    public static final String FIRST_PAGE = "FIRST_PAGE";
    public static final String LAST_PAGE = "LAST_PAGE";
    public static final String PRECEDE_PAGE = "PRECEDE_PAGE";
    public static final String NEXT_PAGE = "NEXT_PAGE";
    public static final String TO_PAGE = "TO_PAGE";

    private int currentPage = 1;
    private int pageSize = DEFAULT_PAGE_SIZE;
    private int recordNumber;
    private int toPage = 1;
    private String navigateAction;

    /**
     * Get current page number. The returned valud will be adjusted according setted currentPage and recordNumber. If recordNumber is setted, the
     * return value will in scope [1,pageNumber]. Otherwise return 0.
     * 
     * @return
     */
    public int getCurrentPage() {
        if (recordNumber <= 0)
            return 0;
        if (currentPage <= 0)
            return 1;
        else if (currentPage > getPageNumber())
            return getPageNumber();
        else
            return currentPage;
    }

    /**
     * @return
     */
    public int getPageSize() {
        return pageSize;
    }

    /**
     * @return
     */
    public int getRecordNumber() {
        return recordNumber;
    }

    /**
     * @param i
     */
    public void setCurrentPage(int i) {
        currentPage = i;
    }

    /**
     * @param i
     *            Record number in every page. It must be greater than 0. If i is invalid, pageSize won't be changed.
     */
    public void setPageSize(int i) {
        if (i <= 0) {
            if (logger.isWarnEnabled())
                logger.warn("argument '" + i + "' is invalid, pageSize won't be changed.");
            return;
        }
        pageSize = i;
    }

    /**
     * @param i
     *            record number of query results.
     * @throws IllegalArgumentException
     *             if record number is less than 0.
     */
    public void setRecordNumber(int i) throws IllegalArgumentException {
        if (i < 0)
            throw new IllegalArgumentException("record number can't be negtive.");
        recordNumber = i;
    }

    /**
     * Get total number of pages.
     * 
     * @return
     */
    public int getPageNumber() {
        if (recordNumber == 0)
            return 0;
        int result = recordNumber / pageSize;
        if (recordNumber % pageSize > 0)
            ++result;
        return result;
    }

    /**
     * @return true if current page is the first page.
     */
    public boolean isFirst() {
        return getCurrentPage() <= 1;
    }

    /**
     * @return true if current page is the last page.
     */
    public boolean isLast() {
        return getCurrentPage() == getPageNumber();
    }

    public String toString() {
        return "Total " + recordNumber + " records, " + getPageNumber() + " pages, current " + currentPage + " page";
    }

    /**
     * Get record No of the last record of current page. Start from 1.
     * 
     * @return
     */
    public int getEndRecordNoOfCurrentPage() {
        int result = getStartRecordNoOfCurrentPage() + pageSize - 1;
        return result > recordNumber ? recordNumber : result;
    }

    /**
     * Get record No of the first record of current page. The No. of first reocrd of first page is 1.
     * 
     * @return
     */
    public int getStartRecordNoOfCurrentPage() {
        return (getCurrentPage() - 1) * pageSize + 1;
    }

    /**
     * @return true if has next page, otherwise, return false.
     */
    public boolean hasNext() {
        return !isLast();
    }

    /**
     * @return true if has preceding page, false otherwise.
     */
    public boolean hasPrecede() {
        return !isFirst();
    }

    public int getPrecedePage() {
        if (hasPrecede())
            return currentPage - 1;
        else
            return currentPage;
    }

    public int getNextPage() {
        if (hasNext())
            return currentPage + 1;
        else
            return currentPage;
    }

    public int getToPage() {
        return toPage;
    }

    public void setToPage(int toPage) {
        this.toPage = toPage;
    }

    public String getNavigateAction() {
        return navigateAction;
    }

    public void setNavigateAction(String navigateAction) {
        this.navigateAction = navigateAction;
    }

    public void action() {
        if (FIRST_PAGE.equals(this.navigateAction)) {
            this.currentPage = 1;
        }
        if (LAST_PAGE.equals(this.navigateAction)) {
            this.currentPage = this.getPageNumber();
        }
        if (PRECEDE_PAGE.equals(this.navigateAction)) {
            this.currentPage = this.getPrecedePage();
        }
        if (NEXT_PAGE.equals(this.navigateAction)) {
            this.currentPage = this.getNextPage();
        }
        if (TO_PAGE.equals(this.navigateAction)) {
            if (this.toPage > this.getPageNumber()) {
                this.currentPage = this.getPageNumber();
            } else {
                this.currentPage = this.toPage;
            }
        }
    }

}
