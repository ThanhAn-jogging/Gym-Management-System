package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.BaoTri;
import com.mycompany.gymmanagement.repository.BaoTriRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BaoTriService {
    private final BaoTriRepository baoTriRepository;

    public List<BaoTri> layDanhSachBaoTri() {
        return baoTriRepository.findAll();
    }

    @Transactional
    public void themBaoTriMoi(BaoTri bt) {
        baoTriRepository.themBaoTriPro(bt.getMaTB(), bt.getNgayBaoTri(), bt.getNoiDung(), bt.getChiPhi());
    }

    @Transactional
    public void capNhatBaoTri(String id, BaoTri bt, String tinhTrangMay) {
        baoTriRepository.capNhatBaoTriPro(id, bt.getMaTB(), bt.getNgayBaoTri(), bt.getNoiDung(), bt.getChiPhi(), tinhTrangMay);
    }

    @Transactional
    public void xoaBaoTri(String id) {
        baoTriRepository.xoaBaoTriPro(id);
    }
}