package com.citizen.complaint.dto;

import com.citizen.complaint.entity.Category;
import com.citizen.complaint.entity.Complaint;

public class ComplaintResponse {

    private Long id;
    private String title;
    private String description;
    private Category category;
    private String status;
    private String citizenName;
    private String citizenEmail;

    public ComplaintResponse() {}

    public static ComplaintResponse fromEntity(Complaint c) {
        ComplaintResponse res = new ComplaintResponse();
        res.setId(c.getId());
        res.setTitle(c.getTitle());
        res.setDescription(c.getDescription());
        res.setCategory(c.getCategory());
        res.setStatus(c.getStatus());
        res.setCitizenName(c.getUser().getName());
        res.setCitizenEmail(c.getUser().getEmail());
        return res;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCitizenName() { return citizenName; }
    public void setCitizenName(String citizenName) { this.citizenName = citizenName; }

    public String getCitizenEmail() { return citizenEmail; }
    public void setCitizenEmail(String citizenEmail) { this.citizenEmail = citizenEmail; }
}
