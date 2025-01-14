package com.fintech.h4_02.entity;


import com.fintech.h4_02.enums.KnowledgeLevel;
import com.fintech.h4_02.enums.RiskPreference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "OnboardingEntity")
@Table(name = "onboardingEntity")
@EqualsAndHashCode(of = "id")
public class OnboardingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;


    @Column(name = "knowledgeLevel")
    @Enumerated(EnumType.STRING)
    private KnowledgeLevel KnowledgeLevel;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "onboardingEntity_goals",
            joinColumns = @JoinColumn(name = "onboardingEntity_id"),
            inverseJoinColumns = @JoinColumn(name = "goals_id")
    )
    private List<Goals> goals;


    @Column(name = "riskPreference")
    @Enumerated(EnumType.STRING)
    private RiskPreference riskPreference;

    @Column(name = "monthlyIncome")
    private Integer monthlyIncome;

    @Column(name = "monthlyExpenses")
    private Integer monthlyExpenses;

    @Column(name = "savingsPercentage")
    private Integer savingsPercentage;
}
