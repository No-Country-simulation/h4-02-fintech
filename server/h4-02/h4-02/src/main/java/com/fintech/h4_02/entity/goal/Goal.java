package com.fintech.h4_02.entity.goal;

import com.fintech.h4_02.entity.UserEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Table(name = "goals")
@Entity(name = "Goals")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "desired_amount")
    @ColumnDefault("0")
    private BigDecimal desiredAmount = BigDecimal.ZERO;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "progress")
    @ColumnDefault("0")
    private Double progress = 0.0;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private UserEntity user;

    @OneToMany(mappedBy = "goal", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<GoalContribution> goalContributions = new ArrayList<>();

    public Goal(String name) {
        this.name = String.valueOf(name);
    }

    public void addGoalContribution(GoalContribution goalContribution) {
        goalContributions.add(goalContribution);
        goalContribution.setGoal(this);
    }

    public Double getProgress() {
        if (progress == null) {
            return 0.0;
        }
        return progress;
    }

    public void setProgress(BigDecimal depositedAmount) {
        if (desiredAmount.compareTo(BigDecimal.ZERO) == 0) {
            throw new IllegalArgumentException("Desired amount cannot be zero");
        }
        BigDecimal progressBigDecimal = depositedAmount
                .multiply(BigDecimal.valueOf(100))
                .divide(desiredAmount, 2, RoundingMode.HALF_UP);
        this.progress = progressBigDecimal.doubleValue();
    }

    public boolean isCompleted() {
        return progress >= 100;
    }

}
