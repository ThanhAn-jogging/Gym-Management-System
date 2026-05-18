package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, String> {

    @Procedure(procedureName = "SP_THEM_VOUCHER")
    void themVoucherPro(String p_TenVoucher, String p_LoaiVoucher, Double p_PhanTramGiam, Double p_GiaTriToiThieu, LocalDate p_NgayHetHan);

    @Procedure(procedureName = "SP_CAPNHAT_VOUCHER")
    void capNhatVoucherPro(String p_MaVoucher, String p_TenVoucher, String p_LoaiVoucher, Double p_PhanTramGiam, Double p_GiaTriToiThieu, LocalDate p_NgayHetHan);

    @Procedure(procedureName = "SP_XOA_VOUCHER")
    void xoaVoucherPro(String p_MaVoucher);
}