package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.CheckIn;
import com.mycompany.gymmanagement.repository.CheckInRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CheckInService {

    private final CheckInRepository checkInRepository;

    public List<CheckIn> layLichSuCheckIn() {
        return checkInRepository.findAll();
    }

    @Transactional
    public void thucHienCheckIn(String maCheckIn, String maHV, String maDK) {
        checkInRepository.thucHienCheckIn(maCheckIn, maHV, maDK);
    }

    @Transactional
    public void thucHienCheckOut(String maCheckIn) {
        checkInRepository.thucHienCheckOut(maCheckIn);
    }
}