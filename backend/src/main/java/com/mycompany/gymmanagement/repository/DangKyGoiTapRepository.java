package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.DangKyGoiTap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface DangKyGoiTapRepository extends JpaRepository<DangKyGoiTap, String> {

    @Procedure(procedureName = "SP_THEM_DANGKY_GOITAP")
    void themDangKyPro(String p_MaHV, String p_MaGoi, LocalDate p_NgayBatDau, String p_MaVoucher, String p_MaNV, String p_PhuongThucTT);

    @Procedure(procedureName = "SP_CAPNHAT_DANGKY_GOITAP")
    void capNhatDangKyPro(String p_MaDK, String p_MaHV_Moi, String p_MaGoi_Moi, LocalDate p_NgayBatDau_Moi, String p_MaVoucher_Moi);

    @Procedure(procedureName = "SP_XOA_DANGKY_GOITAP")
    void xoaDangKyPro(String p_MaDK);
}