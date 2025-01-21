package com.fintech.h4_02.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fintech.h4_02.enums.KnowledgeLevel;
import com.fintech.h4_02.enums.RiskPreference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "OnboardingEntity")
@Table(name = "onboarding_entity")
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
    private BigDecimal monthlyIncome;

    @Column(name = "monthlyExpenses")
    private BigDecimal monthlyExpenses;

    @Column(name = "savingsPercentage")
    private BigDecimal savingsPercentage;

    @OneToOne(mappedBy = "onboarding")
    @JsonBackReference
    private UserEntity user;

    public boolean isCompleted() {
        if (goals == null || goals.isEmpty()) {
            return false;
        }
        return KnowledgeLevel != null && riskPreference != null && monthlyIncome != null && monthlyExpenses != null && savingsPercentage != null;
    }

}
