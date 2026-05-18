package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.GoiTap;
import com.mycompany.gymmanagement.repository.GoiTapRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GoiTapService {
    private final GoiTapRepository goiTapRepository;

    public List<GoiTap> layTatCaGoiTap() {
        return goiTapRepository.findAll();
    }

    @Transactional
    public void themGoiTap(GoiTap gt) {
        goiTapRepository.themGoiTapPro(gt.getTenGoi(), gt.getDonGia(), gt.getThoiGianHieuLuc(), gt.getMoTa(), gt.getQuyenGoiTap());
    }

    @Transactional
    public void capNhatGoiTap(String maGoi, GoiTap gt) {
        goiTapRepository.capNhatGoiTapPro(maGoi, gt.getTenGoi(), gt.getDonGia(), gt.getThoiGianHieuLuc(), gt.getMoTa(), gt.getQuyenGoiTap());
    }

    @Transactional
    public void xoaGoiTap(String maGoi) {
        goiTapRepository.xoaGoiTapPro(maGoi);
    }
}