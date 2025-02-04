package com.fintech.h4_02.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fintech.h4_02.enums.QueriesState;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "QueryEntity")
@Table(name = "query_entity")
@EqualsAndHashCode(of = "id")
public class QueryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_entity_id", referencedColumnName = "id")
    @JsonIgnore
    private UserEntity user;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "date")
    private LocalDate date = LocalDate.now();
    @Column(name = "description",columnDefinition = "TEXT")
    private String description;
    @Enumerated(EnumType.STRING)
    private QueriesState state;
    /* @Builder.Default
    @OneToMany(mappedBy = "query",fetch = FetchType.LAZY,cascade = CascadeType.ALL,orphanRemoval = true)
    @JsonIgnore
    private List<CommentEntity> comments = new ArrayList<>();*/
}
