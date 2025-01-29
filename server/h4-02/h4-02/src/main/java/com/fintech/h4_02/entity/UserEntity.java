package com.fintech.h4_02.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fintech.h4_02.dto.user.CreateUserRequestDto;
import com.fintech.h4_02.entity.goal.Goal;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "UserEntity")
@Table(name = "user_entity")
@EqualsAndHashCode(of = "id")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "name")
    private String name;

    @Column(name = "dni", unique = true)
    private String dni;

    @Column(name = "picture_url")
    private String pictureUrl;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "notify_milestone_achieved")
    @ColumnDefault("false")
    private Boolean notifyMilestoneAchieved = false;

    @Column(name = "notify_savings_goal_met")
    @ColumnDefault("false")
    private Boolean notifySavingsGoalMet = false;

    @Column(name = "notify_investment_opportunities")
    @ColumnDefault("false")
    private Boolean notifyInvestmentOpportunities = false;

    @Column(name = "notify_investment_expirations")
    @ColumnDefault("false")
    private Boolean notifyInvestmentExpirations = false;

    @Column(name = "daily_notifications")
    @ColumnDefault("false")
    private Boolean dailyNotifications = false;

    @Column(name = "weekly_notifications")
    @ColumnDefault("false")
    private Boolean weeklyNotifications = false;

    @Column(name = "monthly_notifications")
    @ColumnDefault("false")
    private Boolean monthlyNotifications = false;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "reset_password_token_expiry")
    private LocalDateTime tokenExpirationDate;

    @Getter(AccessLevel.NONE)
    @Column(name = "is_email_confirmed")
    private Boolean isEmailConfirmed;

    @Column(name = "oauth_provider")
    @Enumerated(EnumType.STRING)
    private OAuthProvider provider;

    @Column(name = "goals_completed")
    @ColumnDefault("0")
    private Integer goalsCompleted = 0;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "unlocked_avatars", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "avatar")
    private Set<String> unlockedAvatars = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "onboarding_entity_id", referencedColumnName = "id")
    @JsonManagedReference
    private OnboardingEntity onboarding;

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore
    private List<WalletEntity> wallets = new ArrayList<>();

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Goal> goals = new ArrayList<>();

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Post> posts;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ExchangeEntity> exchangeList;

    public UserEntity(CreateUserRequestDto user) {
        this.email = user.email();
        this.name = user.name();
        this.password = user.password();
        this.dni = user.dni();
    }

    public void addGoal(Goal goal) {
        goals.add(goal);
        goal.setUser(this);
    }

    public void addPost(Post post) {
        posts.add(post);
        post.setUser(this);
    }

    public boolean isEmailConfirmed() {
        return Objects.requireNonNullElse(isEmailConfirmed, false);
    }

    public OAuthProvider getProvider() {
        if (provider == null) {
            return OAuthProvider.SYSTEM;
        }
        return provider;
    }

    public void incrementUserCompletedGoalCount() {
        if (goalsCompleted == null) {
            goalsCompleted = 0;
        }
        goalsCompleted++;
        for (AvatarRule rule : AvatarRule.values()) {
            if (goalsCompleted.equals(rule.goalsToComplete)) {
                unlockedAvatars.add(rule.avatarUrl);
            }
        }
    }

    public enum OAuthProvider {
        GOOGLE,
        APPLE,
        SYSTEM;

        public static OAuthProvider fromString(String value) {
            for (OAuthProvider provider : OAuthProvider.values()) {
                if (provider.name().equalsIgnoreCase(value)) {
                    return provider;
                }
            }
            throw new IllegalArgumentException("No enum constant for value: " + value);
        }

    }

    @RequiredArgsConstructor
    @Getter
    public enum AvatarRule {
        ONE_GOAL_COMPLETED(1, "https://res.cloudinary.com/dzmzrbuta/image/upload/v1737650410/iupi-fintech/static/avatars/argentina_kd3tgq.png"),
        FIVE_GOALS_COMPLETED(5, "https://res.cloudinary.com/dzmzrbuta/image/upload/v1737650410/iupi-fintech/static/avatars/xqc_eovnrj.jpg"),
        TEN_GOALS_COMPLETED(10, "https://res.cloudinary.com/dzmzrbuta/image/upload/v1737650410/iupi-fintech/static/avatars/monkey_wgpb83.jpg"),
        THIRTY_GOALS_COMPLETED(30, "https://res.cloudinary.com/dzmzrbuta/image/upload/v1737650410/iupi-fintech/static/avatars/cat_gw8gwe.jpg"),
        FIFTY_GOALS_COMPLETED(50, "https://res.cloudinary.com/dzmzrbuta/image/upload/v1737650410/iupi-fintech/static/avatars/gigachad_rg4grx.png");

        private final int goalsToComplete;
        private final String avatarUrl;
    }

}
