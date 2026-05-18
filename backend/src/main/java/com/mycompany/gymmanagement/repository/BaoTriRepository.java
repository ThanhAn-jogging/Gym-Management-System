package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.BaoTri;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface BaoTriRepository extends JpaRepository<BaoTri, String> {

    @Procedure(procedureName = "SP_THEM_BAOTRI")
    void themBaoTriPro(String p_MaTB, LocalDate p_NgayBaoTri, String p_NoiDung, Double p_ChiPhi);

    @Procedure(procedureName = "SP_CAPNHAT_BAOTRI")
    void capNhatBaoTriPro(String p_MaPhieuBT, String p_MaTB, LocalDate p_NgayBaoTri, String p_NoiDung, Double p_ChiPhi, String p_TinhTrangMay);

    @Procedure(procedureName = "SP_XOA_BAOTRI")
    void xoaBaoTriPro(String p_MaPhieuBT);
}