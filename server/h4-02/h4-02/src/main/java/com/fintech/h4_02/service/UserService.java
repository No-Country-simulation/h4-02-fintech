package com.fintech.h4_02.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fintech.h4_02.dto.coin.CoinPrice;
import com.fintech.h4_02.dto.exchange.ExchangeSimple;
import com.fintech.h4_02.dto.user.UpdateUserProfileDto;
import com.fintech.h4_02.dto.user.UserFinancialRadiography;
import com.fintech.h4_02.entity.UserEntity;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.UserRepository;
import com.fintech.h4_02.repository.goal.GoalContributionRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static com.fintech.h4_02.util.ForeignExchangeConverter.convertToArs;
import static com.fintech.h4_02.util.ForeignExchangeConverter.convertToUsd;
import static com.fintech.h4_02.util.PercentageUtils.calculatePercentage;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final GoalContributionRepository goalContributionRepository;
    private final ExchangeService exchangeService;

    public UserEntity getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User not found with email: " + email));
    }

    public UserEntity getUserById(@Valid @NotNull Long id) {
        return userRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));
    }

    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public UserEntity updateUserProfile(Long userId, UpdateUserProfileDto dto) {
        UserEntity user = getUserById(userId);

        user.setName(dto.name());
        user.setDni(dto.dni());
        user.setPhone(dto.phone());
        user.setAddress(dto.address());
        user.setPictureUrl(dto.picture());
        user.setNotifyMilestoneAchieved(dto.milestoneAchieved());
        user.setNotifySavingsGoalMet(dto.savingsGoalMet());
        user.setNotifyInvestmentOpportunities(dto.investmentOpportunities());
        user.setNotifyInvestmentExpirations(dto.investmentExpirations());
        user.setDailyNotifications(dto.dailyNotifications());
        user.setWeeklyNotifications(dto.weeklyNotifications());
        user.setMonthlyNotifications(dto.monthlyNotifications());

        return userRepository.save(user);
    }

    public UserFinancialRadiography calculateUserFinancialXRay(Long userId) throws JSONException, JsonProcessingException {
        UserEntity user = getUserById(userId);

        // IncomePlusProfit = Income + Profit
        BigDecimal income = userRepository.findIngresosByUser(user).orElse(BigDecimal.ZERO);
        BigDecimal expenses = userRepository.findEgresosByUser(user).orElse(BigDecimal.ZERO);
        BigDecimal profit = convertToArs(calculateProfitInUsd(user));
        BigDecimal incomePlusProfit = income.add(profit);

        // Savings = Sum all values accumulated for each goal
        BigDecimal savings = goalContributionRepository.sumTotalContributionsByUserId(user.getId());

        // FixedExpenses = Expenses
        BigDecimal fixedExpenses = expenses;

        // Balance = income - expenses + profit (Income + Savings + FixedExpenses != Balance)
        BigDecimal balance = income.subtract(expenses).add(profit);

        // Total used by each financial item to calculate its corresponding percentage for the radiography
        BigDecimal total = incomePlusProfit.add(savings).add(fixedExpenses);

        return UserFinancialRadiography.builder()
                .income(UserFinancialRadiography.FinancialRadiographyItem.builder()
                        .percentage(calculatePercentage(incomePlusProfit, total))
                        .values(new UserFinancialRadiography.ForeignExchangeValue(convertToUsd(incomePlusProfit), incomePlusProfit))
                        .build())
                .savings(UserFinancialRadiography.FinancialRadiographyItem.builder()
                        .percentage(calculatePercentage(savings, total))
                        .values(new UserFinancialRadiography.ForeignExchangeValue(convertToUsd(savings), savings))
                        .build())
                .fixedExpenses(UserFinancialRadiography.FinancialRadiographyItem.builder()
                        .percentage(calculatePercentage(fixedExpenses, total))
                        .values(new UserFinancialRadiography.ForeignExchangeValue(convertToUsd(fixedExpenses), fixedExpenses))
                        .build())
                .balance(UserFinancialRadiography.FinancialRadiographyItem.builder()
                        .values(new UserFinancialRadiography.ForeignExchangeValue(convertToUsd(balance), balance))
                        .build())
                .build();
    }

    private BigDecimal calculateProfitInUsd(UserEntity user) throws JSONException, JsonProcessingException {
        List<ExchangeSimple> coins = exchangeService.getTotalCoinByUser(user.getId());
        List<CoinPrice> priceBuyCoins = exchangeService.findPriceCoins(user);
        List<CoinPrice> priceSellCoins = exchangeService.findPriceSellCoins(user, coins);
        BigDecimal total = BigDecimal.valueOf(0);
        if (priceBuyCoins != null && priceSellCoins != null) {
            total = calculateProfitCoins(coins, priceBuyCoins, priceSellCoins);
        }
        return total;
    }

    private BigDecimal calculateProfitCoins(
            List<ExchangeSimple> coins,
            List<CoinPrice> priceBuyCoins,
            List<CoinPrice> priceSellCoins
    ) {
        BigDecimal total = new BigDecimal(0);
        for (ExchangeSimple e : coins) {
            Optional<CoinPrice> priceBuy = priceBuyCoins.stream().filter(coin -> coin.Name().equals(e.coin())).findFirst();
            BigDecimal buy = priceBuy.get().price();

            Optional<CoinPrice> priceSell = priceSellCoins.stream().filter(coin -> coin.Name().equals(e.coin())).findFirst();
            BigDecimal sell = priceSell.get().price();

            total = total.add(sell.subtract(buy).multiply(new BigDecimal(e.total())));
        }
        return total;
    }

}
