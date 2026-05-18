package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.LopHoc;
import com.mycompany.gymmanagement.repository.LopHocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LopHocService {
    private final LopHocRepository lopHocRepository;

    public List<LopHoc> layTatCaLopHoc() {
        return lopHocRepository.findAll();
    }

    @Transactional
    public void themLopHoc(LopHoc lop) {
        lopHocRepository.themLopHocPro(
            lop.getTenLop(), lop.getMaPT(), lop.getMoTa(), 
            lop.getSoLuongToiDa(), lop.getNgayTap(), lop.getKhungGio(), lop.getLoaiLop()
        );
    }

    @Transactional
    public void capNhatLopHoc(String maLop, LopHoc lop) {
        lopHocRepository.capNhatLopHocPro(
            maLop, lop.getTenLop(), lop.getMaPT(), lop.getMoTa(), 
            lop.getSoLuongToiDa(), lop.getNgayTap(), lop.getKhungGio(), lop.getLoaiLop()
        );
    }

    @Transactional
    public void xoaLopHoc(String id) {
        lopHocRepository.xoaLopHocPro(id);
    }
}