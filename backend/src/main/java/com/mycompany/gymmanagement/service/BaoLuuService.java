package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.BaoLuu;
import com.mycompany.gymmanagement.repository.BaoLuuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BaoLuuService {
    private final BaoLuuRepository baoLuuRepository;

    public List<BaoLuu> layDanhSachBaoLuu() { return baoLuuRepository.findAll(); }

    @Transactional
    public void themBaoLuu(BaoLuu bl) {
        baoLuuRepository.themBaoLuu(bl.getMaDK(), bl.getNgayBatDauNghi(), bl.getNgayKetThucNghi(), bl.getLyDo());
    }

    @Transactional
    public void suaBaoLuu(String maBaoLuu, BaoLuu bl) {
        baoLuuRepository.suaBaoLuu(maBaoLuu, bl.getMaDK(), bl.getNgayBatDauNghi(), bl.getNgayKetThucNghi(), bl.getLyDo());
    }

    @Transactional
    public void xoaBaoLuu(String maBaoLuu) {
        baoLuuRepository.xoaBaoLuu(maBaoLuu);
    }
}