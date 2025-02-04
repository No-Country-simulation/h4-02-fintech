package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fintech.h4_02.enums.QueriesState;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "CommentEntity")
@Table(name = "comment_entity")
@EqualsAndHashCode(of = "id")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;
    @ManyToOne
    @JoinColumn(name = "query_entity_id", referencedColumnName = "id")
    @JsonIgnore
    private QueryEntity query;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;
    @ManyToOne
    @JoinColumn(name = "user_entity_id", referencedColumnName = "id")
    @JsonIgnore
    private UserEntity user;
}

