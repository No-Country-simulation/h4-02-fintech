package com.fintech.h4_02.service;

import com.fintech.h4_02.entity.UserFeedback;
import com.fintech.h4_02.exception.EntityNotFoundException;
import com.fintech.h4_02.repository.UserFeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFeedbackService {
    private final UserFeedbackRepository feedbackRepository;

    public List<UserFeedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public UserFeedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Feedback not found with id: " + id));
    }

    public UserFeedback createFeedback(UserFeedback feedback) {
        return feedbackRepository.save(feedback);
    }

}
