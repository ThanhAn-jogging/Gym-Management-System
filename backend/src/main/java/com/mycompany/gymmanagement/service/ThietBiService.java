package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.ThietBi;
import com.mycompany.gymmanagement.repository.ThietBiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ThietBiService {
    private final ThietBiRepository thietBiRepository;

    public List<ThietBi> layTatCaThietBi() {
        return thietBiRepository.findAll();
    }

    @Transactional
    public void themThietBi(ThietBi tb) {
        thietBiRepository.themThietBiPro(
            tb.getTenTB(), tb.getLoaiMay(), tb.getNgayMua(), tb.getViTri(), tb.getTinhTrang()
        );
    }

    @Transactional
    public void capNhatThietBi(String id, ThietBi tb) {
        thietBiRepository.capNhatThietBiPro(
            id, tb.getTenTB(), tb.getLoaiMay(), tb.getNgayMua(), tb.getViTri(), tb.getTinhTrang()
        );
    }

    @Transactional
    public void xoaThietBi(String id) {
        thietBiRepository.xoaThietBiPro(id);
    }
}