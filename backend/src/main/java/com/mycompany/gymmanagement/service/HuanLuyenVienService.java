package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.HuanLuyenVien;
import com.mycompany.gymmanagement.repository.HuanLuyenVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HuanLuyenVienService {
    private final HuanLuyenVienRepository huanLuyenVienRepository;

    public List<HuanLuyenVien> layTatCaHLV() {
        return huanLuyenVienRepository.findAll();
    }

    @Transactional
    public void themHLVMoi(HuanLuyenVien hlv) {
        huanLuyenVienRepository.themHLVMoi(
            hlv.getMaPT(), hlv.getMaNV(), hlv.getChuyenMon(), 
            hlv.getBangCap(), hlv.getKinhNghiem(), hlv.getRating()
        );
    }

    @Transactional
    public void capNhatHLV(HuanLuyenVien hlv) {
        huanLuyenVienRepository.capNhatHLVPro(
            hlv.getMaPT(), hlv.getMaNV(), hlv.getChuyenMon(), 
            hlv.getBangCap(), hlv.getKinhNghiem(), hlv.getRating()
        );
    }

    @Transactional
    public void xoaHuanLuyenVien(String maPT) {
        huanLuyenVienRepository.xoaHLVPro(maPT);
    }
}