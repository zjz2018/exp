package com.example.action.vo;

public class UserNode {
    private Long id;
    private String name;
    private Long pId;
    private Boolean nocheck;
    private Boolean checked;

    public UserNode(Long id, String name, Long pId, Boolean nocheck, Boolean checked) {
        this.id = id;
        this.name = name;
        this.pId = pId;
        this.nocheck = nocheck;
        this.checked = checked;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Long getpId() {
        return pId;
    }

    public Boolean getNocheck() {
        return nocheck;
    }

    public Boolean getChecked() {
        return checked;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setpId(Long pId) {
        this.pId = pId;
    }

    public void setNocheck(Boolean nocheck) {
        this.nocheck = nocheck;
    }

    public void setChecked(Boolean checked) {
        this.checked = checked;
    }

}
