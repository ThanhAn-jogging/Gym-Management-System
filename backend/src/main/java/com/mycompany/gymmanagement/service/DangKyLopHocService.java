package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.DangKyLopHoc;
import com.mycompany.gymmanagement.repository.DangKyLopHocRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DangKyLopHocService {
    private final DangKyLopHocRepository repository;

    public List<DangKyLopHoc> layDanhSach() {
        return repository.findAll();
    }

    @Transactional
    public void dangKy(String maHV, String maLop) {
        repository.dangKyLop(maHV, maLop);
    }

    @Transactional
    public void huy(String maHV, String maLop) {
        repository.huyDangKyLop(maHV, maLop);
    }
}