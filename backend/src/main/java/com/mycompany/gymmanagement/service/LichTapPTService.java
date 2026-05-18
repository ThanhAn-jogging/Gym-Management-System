package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.LichTapPT;
import com.mycompany.gymmanagement.repository.LichTapPTRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LichTapPTService {
    private final LichTapPTRepository lichTapPTRepository;

    public List<LichTapPT> layLichTap() {
        return lichTapPTRepository.findAll();
    }

    @Transactional
    public void dangKyLichTap(String maHV, String maPT, LocalDate ngayTap, String khungGio) {
        lichTapPTRepository.dangKyLichTap(maHV, maPT, ngayTap, khungGio);
    }

    @Transactional
    public void huyLichTap(String maLich) {
        lichTapPTRepository.huyLichTap(maLich);
    }
}