package com.mohit.socialmediabackend.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
    private String email;
    private String firstName;
    private String lastName;
    private String mobile;
    private String website;
    private String bio;
    private String gender;
    private String image;

    @JsonIgnore
    @ManyToMany
    private Set<User> follower = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "follower", fetch = FetchType.LAZY)
    private Set<User> following = new HashSet<User>();
}
