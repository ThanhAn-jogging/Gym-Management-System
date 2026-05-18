package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.NhanVien;
import com.mycompany.gymmanagement.repository.NhanVienRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NhanVienService {

    private final NhanVienRepository nhanVienRepository;

    public List<NhanVien> layTatCaNhanVien() {
        return nhanVienRepository.findAll();
    }

    public List<NhanVien> layNhanVienTheoChucVu(String chucVu) {
        return nhanVienRepository.findByChucVu(chucVu);
    }

    @Transactional
    public void themNhanVien(NhanVien nv) {
        nhanVienRepository.themNhanVienMoi(
            nv.getHoTen(), 
            nv.getChucVu(), 
            nv.getSdt(), 
            nv.getLuongCB(), 
            nv.getNgayVaoLam()
        );
    }

    @Transactional
    public void capNhatNhanVien(String maNV, NhanVien nv) {
        nhanVienRepository.capNhatNhanVienPro(
            maNV, 
            nv.getHoTen(), 
            nv.getChucVu(), 
            nv.getSdt(), 
            nv.getLuongCB(), 
            nv.getNgayVaoLam()
        );
    }

    @Transactional
    public void xoaNhanVien(String maNV) {
        nhanVienRepository.xoaNhanVienPro(maNV);
    }
}