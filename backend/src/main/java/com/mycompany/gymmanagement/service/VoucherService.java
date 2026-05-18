package com.mycompany.gymmanagement.service;

import com.mycompany.gymmanagement.entity.Voucher;
import com.mycompany.gymmanagement.repository.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VoucherService {
    private final VoucherRepository voucherRepository;

    public List<Voucher> layTatCaVoucher() {
        return voucherRepository.findAll();
    }

    @Transactional
    public void themVoucherMoi(Voucher v) {
        voucherRepository.themVoucherPro(v.getTenVoucher(), v.getLoaiVoucher(), v.getPhanTramGiam(), v.getGiaTriToiThieu(), v.getNgayHetHan());
    }

    @Transactional
    public void capNhatVoucher(String id, Voucher v) {
        voucherRepository.capNhatVoucherPro(id, v.getTenVoucher(), v.getLoaiVoucher(), v.getPhanTramGiam(), v.getGiaTriToiThieu(), v.getNgayHetHan());
    }

    @Transactional
    public void xoaVoucher(String id) {
        voucherRepository.xoaVoucherPro(id);
    }
}