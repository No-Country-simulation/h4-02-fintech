package com.fintech.h4_02.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fintech.h4_02.enums.QueriesState;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
    private Long id;

    @Column(name = "date")
    private LocalDateTime date = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "user_entity_id", referencedColumnName = "id")
    private UserEntity user;

    @Column(name = "affected_area")
    private String affectedArea;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "last_update")
    private String lastUpdate;

    @ElementCollection
    @CollectionTable(name = "queries_taken_actions", joinColumns = @JoinColumn(name = "query_id"))
    @Column(name = "action_taken")
    private Set<String> takenActions;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "estimated")
    private String estimated;

    @Enumerated(EnumType.STRING)
    private QueriesState state;

    @Builder.Default
    @OneToMany(mappedBy = "query", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CommentEntity> comments = new ArrayList<>();
}
