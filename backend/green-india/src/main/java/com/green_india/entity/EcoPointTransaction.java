package com.green_india.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EcoPointTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private User user;

    private String actionType;
    private int points;

    private LocalDateTime createdAt;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id;}

    public User getUser() { return user;}
    public void setUser(User user) { this.user = user;}

    public String getActionType() { return actionType;}
    public void setActionType(String actionType) { this.actionType = actionType; }

    public int getPoints() { return points; }
    public void setPoints(int points) { this.points = points; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}