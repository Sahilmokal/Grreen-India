package com.green_india.service;

import com.green_india.entity.EcoBadge;
import com.green_india.entity.EcoPointTransaction;
import com.green_india.entity.User;
import com.green_india.repository.EcoPointTransactionRepository;
import com.green_india.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EcoPointsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EcoPointTransactionRepository transcationRepository;

    public void awardPoints(Integer userId, String actionType, int points){
        User user = userRepository.findById(userId).orElseThrow(() ->  new RuntimeException("User not found"));

        if(actionType.equals("Daily Challenge")){
            boolean alreadyOne = transcationRepository.
                    existsByUserIdAndActionTypeAndCreatedAtBetween(userId, actionType, LocalDateTime.now());

            if(alreadyOne) return;
        }

        user.setTotalPoints(user.getTotalPoints() + points);

        EcoBadge newBadge = EcoBadge.fromPoints(user.getTotalPoints());
        user.setBadge(newBadge);

        userRepository.save(user);

        EcoPointTransaction txn = new EcoPointTransaction();
        txn.setUser(user);
        txn.setActionType(actionType);
        txn.setPoints(points);
        txn.setCreatedAt(LocalDateTime.now());

        transcationRepository.save(txn);
    }
}
