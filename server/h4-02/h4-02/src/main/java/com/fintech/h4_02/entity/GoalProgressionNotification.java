package com.fintech.h4_02.entity;

import com.fintech.h4_02.entity.goal.Goal;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Table(name = "goal_progression_notifications")
@Entity(name = "GoalProgressionNotification")
@EqualsAndHashCode(of = "id")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GoalProgressionNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "lower_bound_percentage")
    private Integer lowerBoundPercentage;

    @Column(name = "message")
    private String message;

    @Column(name = "is_read")
    @ColumnDefault("false")
    private Boolean isRead = false;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Goal goal;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Getter
    @RequiredArgsConstructor
    public enum ProgressionMapping {
        NO_PROGRESSION(0, ""),
        TEN_PERCENT_PROGRESSION(10, "¡Has comenzado! Ya alcanzaste el 10% de tu meta. ¡Sigue así, los pequeños pasos cuentan!"),
        TWENTY_PERCENT_PROGRESSION(20, "¡Vas bien! Alcanzaste el 20% de tu objetivo. ¡Tu constancia está dando resultados!"),
        THIRTY_PERCENT_PROGRESSION(30, "¡Gran avance! Ya tienes el 30% de tu meta cumplida. ¡Estás cada vez más cerca!"),
        FORTY_PERCENT_PROGRESSION(40, "¡Impresionante! Has llegado al 40%. ¡Solo un poco más para la mitad!"),
        FIFTY_PERCENT_PROGRESSION(50, "¡Mitad de camino lograda! Alcanzaste el 50% de tu objetivo. ¡Estás haciendo un gran trabajo!"),
        SIXTY_PERCENT_PROGRESSION(60, "¡Increíble! Ya completaste el 60% de tu meta. ¡El esfuerzo está valiendo la pena!"),
        SEVENTY_PERCENT_PROGRESSION(70, "¡Estás en la recta final! Alcanzaste el 70%. ¡No te detengas ahora!"),
        EIGHTY_PERCENT_PROGRESSION(80, "¡Casi lo logras! Ya tienes el 80% de tu meta cumplida. ¡Un último empujón!"),
        NINETY_PERCENT_PROGRESSION(90, "¡Estás a punto de hacerlo! Alcanzaste el 90%. ¡Solo un pequeño esfuerzo más!"),
        ONE_HUNDRED_PERCENT_PROGRESSION(100, "¡Lo lograste! Alcanzaste el 100% de tu meta. ¡Es momento de celebrarlo y pensar en tu próximo objetivo!");

        private final int lowerBoundPercentage;
        private final String message;

        public static ProgressionMapping progressionFrom(double progress) {
            ProgressionMapping closest = ProgressionMapping.NO_PROGRESSION;
            for (ProgressionMapping progression : ProgressionMapping.values()) {
                if (progress >= progression.lowerBoundPercentage) {
                    closest = progression;
                } else {
                    break;
                }
            }
            return closest;
        }
    }
}
