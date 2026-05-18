package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.DangKyGoiTap;
import com.mycompany.gymmanagement.repository.DangKyGoiTapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DangKyGoiTapService {
    private final DangKyGoiTapRepository dangKyGoiTapRepository;

    public List<DangKyGoiTap> layDanhSachDangKy() {
        return dangKyGoiTapRepository.findAll();
    }

    @Transactional
    public void dangKyGoiTap(String maHV, String maGoi, LocalDate ngayBatDau, String maVoucher, String maNV, String phuongThucTT) {
        dangKyGoiTapRepository.themDangKyPro(maHV, maGoi, ngayBatDau, maVoucher, maNV, phuongThucTT);
    }

    @Transactional
    public void capNhat(String id, DangKyGoiTap dk, String maVoucher) {
        dangKyGoiTapRepository.capNhatDangKyPro(id, dk.getMaHV(), dk.getMaGoi(), dk.getNgayBatDau(), maVoucher);
    }

    @Transactional
    public void xoa(String id) {
        dangKyGoiTapRepository.xoaDangKyPro(id);
    }
}