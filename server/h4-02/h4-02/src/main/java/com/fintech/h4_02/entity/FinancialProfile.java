package com.fintech.h4_02.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_financial_profile")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Getter
@Setter
public class FinancialProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "age_range")
    private String ageRange;

    @Column(name = "evolution_tool")
    private String evolutionTool;

    @Column(name = "insurance")
    private String insurance;

    @OneToOne(mappedBy = "financialProfile")
    private UserEntity user;
}
