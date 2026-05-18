package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.HoaDon;
import com.mycompany.gymmanagement.repository.HoaDonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HoaDonService {

    private final HoaDonRepository hoaDonRepository;

    public List<HoaDon> layTatCaHoaDon() {
        return hoaDonRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Double thongKeDoanhThu(Integer thang, Integer nam) {
        return hoaDonRepository.thongKeDoanhThuThang(thang, nam);
    }

    public HoaDon luuHoaDon(HoaDon hd) {
        return hoaDonRepository.save(hd);
    }
}