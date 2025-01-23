package com.fintech.h4_02.entity;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class GoalProgressionMappingTest {

    @Test
    public void testGetMessageForProgress_BelowTenPercent() {
        double progress = 5.6;
        var expected = GoalProgressionNotification.ProgressionMapping.NO_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

    @Test
    public void testGetMessageForProgress_ExactTenPercent() {
        double progress = 10.0;
        var expected = GoalProgressionNotification.ProgressionMapping.TEN_PERCENT_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

    @Test
    public void testGetMessageForProgress_BetweenTenAndTwentyPercent() {
        double progress = 12.4;
        var expected = GoalProgressionNotification.ProgressionMapping.TEN_PERCENT_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

    @Test
    public void testGetMessageForProgress_ExactTwentyPercent() {
        double progress = 20.0;
        var expected = GoalProgressionNotification.ProgressionMapping.TWENTY_PERCENT_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

    @Test
    public void testGetMessageForProgress_BetweenNinetyAndHundredPercent() {
        double progress = 92.4;
        var expected = GoalProgressionNotification.ProgressionMapping.NINETY_PERCENT_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

    @Test
    public void testGetMessageForProgress_ExactHundredPercent() {
        double progress = 100.0;
        var expected = GoalProgressionNotification.ProgressionMapping.ONE_HUNDRED_PERCENT_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

    @Test
    public void testGetMessageForProgress_AboveHundredPercent() {
        double progress = 110.0;
        var expected = GoalProgressionNotification.ProgressionMapping.ONE_HUNDRED_PERCENT_PROGRESSION;
        assertEquals(expected, GoalProgressionNotification.ProgressionMapping.progressionFrom(progress));
    }

}