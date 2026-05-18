package com.mycompany.gymmanagement.repository;

import com.mycompany.gymmanagement.entity.ThietBi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;

@Repository
public interface ThietBiRepository extends JpaRepository<ThietBi, String> {

    @Procedure(procedureName = "SP_THEM_THIETBI")
    void themThietBiPro(String p_TenTB, String p_LoaiMay, LocalDate p_NgayMua, String p_ViTri, String p_TinhTrang);

    @Procedure(procedureName = "SP_CAPNHAT_THIETBI")
    void capNhatThietBiPro(String p_MaTB, String p_TenTB, String p_LoaiMay, LocalDate p_NgayMua, String p_ViTri, String p_TinhTrang);

    @Procedure(procedureName = "SP_XOA_THIETBI")
    void xoaThietBiPro(String p_MaTB);
}