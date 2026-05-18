package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.HoiVien;
import com.mycompany.gymmanagement.repository.HoiVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HoiVienService {

    private final HoiVienRepository hoiVienRepository;

    public List<HoiVien> layTatCaHoiVien() {
        return hoiVienRepository.findAll();
    }

    @Transactional
    public void themHoiVienMoi(String maHV, String hoTen, String gioiTinh, LocalDate ngaySinh, 
                               String sdt, String diaChi, String email, String tinhTrangSK) {
        hoiVienRepository.themHoiVienMoi(maHV, hoTen, gioiTinh, ngaySinh, sdt, diaChi, email, tinhTrangSK);
    }

    @Transactional
    public void capNhatHoiVien(String maHV, HoiVien hvUpdate) {
    HoiVien hv = hoiVienRepository.findById(maHV).orElseThrow(() -> new RuntimeException("Không tìm thấy hội viên"));
    hv.setHoTen(hvUpdate.getHoTen());
    hv.setEmail(hvUpdate.getEmail());
    hv.setSdt(hvUpdate.getSdt());
    hv.setGioiTinh(hvUpdate.getGioiTinh());
    hv.setNgaySinh(hvUpdate.getNgaySinh());
    hv.setDiaChi(hvUpdate.getDiaChi());
    hv.setTinhTrangSK(hvUpdate.getTinhTrangSK());
    
    hoiVienRepository.save(hv); 
}

    @Transactional
    public void xoaHoiVien(String maHV) {
        hoiVienRepository.xoaHoiVienPro(maHV);
    }
}